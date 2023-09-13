import { Transaction, TransactionType } from "../../../../transaction/types";
import { Hints, Provider } from "../../../types";
import { CosmosTransaction } from "./types";
import Bottleneck from "bottleneck";

type AttributeKey = "recipient" | "amount" | "sender" | "validator";

interface CosmosAttribute {
  key: string;
  value: string;
}

const getTransactions =
  (chainId: string, currencySymbol: string, currencyDenominator: number) =>
  async (address: string, hints: Hints): Promise<Transaction[]> => {
    const getAttribute = (attributes: CosmosAttribute[], key: AttributeKey) =>
      attributes.find((it) => it.key === key)?.value ?? "";
    const toSymbolCurrency = (amount: string): number =>
      Number.parseFloat(amount) / currencyDenominator;

    const response = await fetchTransactions(hints, chainId, address, 0);
    const messageMap: Record<string, boolean> = {};

    const txns = response
      .filter((it) => it.success)
      .map((it) => {
        const messages = it.messages;
        if (!messages) {
          return [];
        }

        // For debugging purposes
        messages.forEach((it) => {
          messageMap[it["@type"]] = true;
        });

        // Every transaction has a corresponding cost.
        // These costs are rolled up into the corresponding taxable event where possible later.
        const fees = it.fee.amount[0].amount;
        const cost = {
          timestamp: it.block.timestamp,
          fromAddress: "",
          toAddress: "",
          type: TransactionType.Cost,
          amount: 0,
          amountCurrency: currencySymbol,
          feeAmount: toSymbolCurrency(fees),
          feeCurrency: currencySymbol,
          txHash: it.hash,
          memo: it.memo,
        };

        const transfers: Transaction[] = it.logs
          .map((i) => i.events)
          .filter(
            (_, index) =>
              !messages[index]["@type"].endsWith(
                "MsgWithdrawDelegatorReward"
              ) &&
              !messages[index]["@type"].endsWith("MsgUndelegate") &&
              !messages[index]["@type"].endsWith("MsgDelegate") &&
              !messages[index]["@type"].endsWith("MsgBeginRedelegate")
          )
          .flat()
          .filter((i) => i.type === "transfer")
          .map((event) => {
            const recipient = getAttribute(event.attributes, "recipient");
            const sender = getAttribute(event.attributes, "sender");
            const isReceive = address === recipient;
            const txn: Transaction = {
              timestamp: it.block.timestamp,
              fromAddress: recipient,
              toAddress: sender,
              type: isReceive ? TransactionType.Receive : TransactionType.Send,
              amount: toSymbolCurrency(
                getAttribute(event.attributes, "amount")
              ),
              amountCurrency: currencySymbol,
              feeAmount: 0, // Fixed later during "cost" transaction rollup
              feeCurrency: currencySymbol,
              txHash: it.hash,
              memo: it.memo,
              description: "",
            };
            return txn;
          });

        // Staking rewards can happen automatically - even if you don't press the "claim" button.
        // See https://github.com/cosmos/cosmos-sdk/blob/main/x/distribution/README.md#events
        const stakingRewards: Transaction[] = it.logs
          .map((i) => i.events)
          .flat()
          .filter((i) => i.type === "withdraw_rewards")
          .map((event) => {
            const txn: Transaction = {
              timestamp: it.block.timestamp,
              fromAddress: getAttribute(event.attributes, "validator"),
              toAddress: address,
              type: TransactionType.Reward,
              amount: toSymbolCurrency(
                getAttribute(event.attributes, "amount")
              ),
              amountCurrency: currencySymbol,
              feeAmount: 0, // Fixed later during "cost" transaction rollup
              feeCurrency: currencySymbol,
              txHash: it.hash,
              memo: it.memo,
            };
            return txn;
          });

        // Validator rewards in the same transaction can be combined together in order to reduce
        // the total number of transactions. TAX tools frequently charge you by the number of
        // transactions so this helps reduce cost.
        const rollupStakingRewards = stakingRewards.reduce<
          Record<string, Transaction & { rewardsRollupCount: number }>
        >((accumulator, currentValue) => {
          const existing = accumulator[currentValue.txHash];
          if (existing) {
            const rollupCount = existing.rewardsRollupCount + 1;
            const description = `Rolled up ${rollupCount} validator rewards`;

            return {
              ...accumulator,
              [currentValue.txHash]: {
                ...currentValue,
                amount: existing.amount + currentValue.amount,
                description,
                rewardsRollupCount: rollupCount,
              },
            };
          }
          return {
            ...accumulator,
            [currentValue.txHash]: {
              ...currentValue,
              rewardsRollupCount: 1,
              description: "",
            },
          };
        }, {});

        // Cleanup the object so this value doesn't get exported in the generic serializer
        const rewards = Object.values(rollupStakingRewards).map((it) => ({
          ...it,
          rewardsRollupCount: undefined,
        }));

        return [cost, ...transfers, ...rewards];
      })
      .flat()
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));

    // This will attempt to merge the "cost" transaction with the related taxable event. Thus reducing
    // the total number of transactions.
    const rollupTxns = txns.reduce<Record<string, Transaction>>(
      (accumulator, currentValue) => {
        const existing: Transaction = accumulator[currentValue.txHash];
        if (existing) {
          const [mainTxn, costTxn] =
            existing.type === TransactionType.Cost
              ? [currentValue, existing]
              : [existing, currentValue];
          return {
            ...accumulator,
            [mainTxn.txHash]: {
              ...mainTxn,
              feeAmount: costTxn.feeAmount,
              feeCurrency: costTxn.feeCurrency,
            },
          };
        }
        return {
          ...accumulator,
          [currentValue.txHash]: {
            ...currentValue,
          },
        };
      },
      {}
    );

    const results = Object.values(rollupTxns);

    // "Receive" Transactions should not include a fee for TAX purposes because it's paid by the sender not the receiver
    results.forEach((it) => {
      if (it.type === TransactionType.Receive) {
        it.feeAmount = 0;
      }
    });

    console.debug("Message Types:", messageMap);
    console.debug("Pre-Rollup Transactions:", txns);
    console.debug("Rollup Transactions:", results);

    return results;
  };

const PAGE_SIZE = 50;

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 333,
});

async function fetchTransactions(
  hints: Hints,
  chain: string,
  address: string,
  fromIndex: number,
  txns: CosmosTransaction[] = []
): Promise<CosmosTransaction[]> {
  const response = await fetch(
    hints.proxy(`https://gql.akash.forbole.com/v1/graphql`),
    {
      body: JSON.stringify([
        {
          operationName: "GetMessagesByAddress",
          variables: {
            limit: PAGE_SIZE,
            offset: fromIndex,
            types: "{}",
            address: `{${address}}`,
          },
          query:
            'query GetMessagesByAddress($address: _text, $limit: bigint = 50, $offset: bigint = 0, $types: _text = "{}") {\n  messagesByAddress: messages_by_address(\n    args: {addresses: $address, types: $types, limit: $limit, offset: $offset}\n  ) {\n    transaction {\n      height\n      hash\n      success\n      memo\n      fee\n      messages\n      logs\n      block {\n        height\n        timestamp\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}',
        },
      ]),
      method: "post",
      headers: {
        accept: "application/json",
      },
    }
  );
  const json = await response.json();
  const currentTxns = json[0].data.messagesByAddress.map(
    (it: any) => it.transaction
  );
  txns.push(...currentTxns);
  if (Array.isArray(currentTxns) && currentTxns.length === PAGE_SIZE) {
    const nextIndex = currentTxns.length;
    return limiter.schedule(() =>
      fetchTransactions(hints, chain, address, nextIndex, txns)
    );
  }
  console.log(`Raw Transactions`, txns);
  return txns;
}

export const bigdipper = (
  chainId: string,
  currencySymbol: string,
  currencyDenominator: number,
  maintainerWallet: string
) => {
  const provider: Provider = {
    id: "bigdipper.live",
    displayName: "bigdipper.live",
    maintainer: {
      githubUsername: "jackmatt2",
      personalWallet: maintainerWallet,
    },
    getTransactions: getTransactions(
      chainId,
      currencySymbol,
      currencyDenominator
    ),
  };
  return provider;
};
