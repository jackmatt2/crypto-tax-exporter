import { Transaction, TransactionType } from "../../../../transaction/types";
import { Hints, Provider } from "../../../types";
import { CosmosTransaction } from "./types";

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
      .map((it) => {
        const messages = it.data.tx.body.messages;
        const transfers: Transaction[] = it.data.logs
          .map((i) => i.events)
          .filter(
            (_, index) =>
              messages[index]["@type"].endsWith("MsgSend") ||
              messages[index]["@type"].endsWith("MsgTransfer")
          )
          .flatMap((i) => i)
          .filter((i) => i.type === "transfer")
          .map((event) => {
            const isReceive =
              address === getAttribute(event.attributes, "recipient");
            const txn: Transaction = {
              timestamp: it.data.timestamp,
              fromAddress: getAttribute(event.attributes, "recipient"),
              toAddress: getAttribute(event.attributes, "sender"),
              type: isReceive ? TransactionType.Receive : TransactionType.Send,
              amount: toSymbolCurrency(
                getAttribute(event.attributes, "amount")
              ),
              amountCurrency: currencySymbol,
              feeAmount: isReceive ? 0 : toSymbolCurrency(it.data.gas_used),
              feeCurrency: currencySymbol,
              txHash: it.data.txhash,
              memo: it.data.tx.body.memo,
              description: "",
            };
            return txn;
          });

        const ibcTransfers: Transaction[] = it.data.logs
          .map((i) => i.events)
          .filter((_, index) =>
            messages[index]["@type"].endsWith("MsgRecvPacket")
          )
          .flatMap((i) => i)
          .filter((i) => i.type === "transfer")
          .map((event) => {
            const isReceive =
              address === getAttribute(event.attributes, "recipient");
            const txn: Transaction = {
              timestamp: it.data.timestamp,
              fromAddress: getAttribute(event.attributes, "recipient"),
              toAddress: getAttribute(event.attributes, "sender"),
              type: isReceive ? TransactionType.Receive : TransactionType.Send,
              amount: toSymbolCurrency(
                getAttribute(event.attributes, "amount")
              ),
              amountCurrency: currencySymbol,
              feeAmount: isReceive ? 0 : toSymbolCurrency(it.data.gas_used),
              feeCurrency: currencySymbol,
              txHash: it.data.txhash,
              memo: it.data.tx.body.memo,
            };
            return txn;
          });

        const rewards: Transaction[] = it.data.logs
          .map((i) => i.events)
          .filter((_, index) => {
            messageMap[messages[index]["@type"]] = true;
            return true;
          })
          .filter((_, index) =>
            messages[index]["@type"].endsWith("MsgWithdrawDelegatorReward")
          )
          .flatMap((i) => i)
          .filter((i) => i.type === "withdraw_rewards")
          .map((event) => {
            const txn: Transaction = {
              timestamp: it.data.timestamp,
              fromAddress: getAttribute(event.attributes, "validator"),
              toAddress: address,
              type: TransactionType.Reward,
              amount: toSymbolCurrency(
                getAttribute(event.attributes, "amount")
              ),
              amountCurrency: currencySymbol,
              feeAmount: toSymbolCurrency(it.data.gas_used),
              feeCurrency: currencySymbol,
              txHash: it.data.txhash,
              memo: it.data.tx.body.memo,
            };
            return txn;
          });

        const rollupRewards = rewards.reduce<
          Record<string, Transaction & { rewardsRollupCount?: number }>
        >((accumulator, currentValue) => {
          const existing = accumulator[currentValue.timestamp];
          if (existing) {
            const rollupCount = existing?.rewardsRollupCount ?? 1 + 1;
            const description = `Rolled up ${rollupCount} validator rewards`;

            return {
              ...accumulator,
              [currentValue.timestamp]: {
                ...currentValue,
                amount: existing.amount + currentValue.amount,
                description,
                rewardsRollupCount: rollupCount,
              },
            };
          }
          return {
            ...accumulator,
            [currentValue.timestamp]: {
              ...currentValue,
              description: "",
            },
          };
        }, {});

        // Cleanup the object so this value doesn't get exported in the serializer
        Object.values(rollupRewards).forEach((it) => {
          delete it.rewardsRollupCount;
        });

        return [...transfers, ...ibcTransfers, ...Object.values(rollupRewards)];
      })
      .flat()
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));

    console.debug("Message Types:", messageMap);
    console.debug("Transactions:", txns);

    return txns;
  };

const PAGE_SIZE = 50;

async function fetchTransactions(
  hints: Hints,
  chain: string,
  address: string,
  fromIndex: number,
  txns: CosmosTransaction[] = []
): Promise<CosmosTransaction[]> {
  const response = await fetch(
    hints.proxy(
      `https://api.mintscan.io/v1/${chain}/account/${address}/txs?limit=${PAGE_SIZE}&from=${fromIndex}`
    )
  );
  const json = await response.json();
  txns.push(...json);
  if (Array.isArray(json) && json.length === PAGE_SIZE) {
    const nextIndex = Number.parseInt(json[PAGE_SIZE - 1].header.id);
    return fetchTransactions(hints, chain, address, nextIndex, txns);
  }
  console.log(`Raw Transactions`, txns);
  return txns;
}

export const mintscan = (
  chainId: string,
  currencySymbol: string,
  currencyDenominator: number,
  maintainerWallet: string
) => {
  const provider: Provider = {
    id: "mintscan.io",
    displayName: "mintscan.io",
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
