import { Transaction, TransactionType } from "../../../../transaction/types";
import { Hints } from "../../../types";
import { fetchAllTransactions } from "./api";
import { CosmosTransaction } from "./types";

type AttributeKey = "recipient" | "amount" | "sender" | "validator";
type Messages = Record<string, any>;

interface CosmosAttribute {
  key: string;
  value: string;
}

export function getAttribute(attributes: CosmosAttribute[], key: AttributeKey) {
  return attributes.find((it) => it.key === key)?.value ?? "";
}

export function toCurrencyAmount(
  amount: string,
  currencyDenominator: number = 1_000_000
): number {
  return Number.parseFloat(amount) / currencyDenominator;
}

// Converts to the Unit symbol for this currency.
// Eg. uakt to AKT
export function toSymbolPropper(symbol: string): string {
  return symbol.replace(/\d+/g, "").substring(1).toUpperCase();
}

// Staking rewards can happen automatically - even if you don't press the "claim" button.
// See https://github.com/cosmos/cosmos-sdk/blob/main/x/distribution/README.md#events
function getStakingRewards(
  txn: CosmosTransaction,
  address: string
): Transaction[] {
  return txn.logs
    .map((i) => i.events)
    .flat()
    .filter((i) => i.type === "withdraw_rewards")
    .map((event) => {
      const t: Transaction = {
        timestamp: txn.block.timestamp,
        fromAddress: getAttribute(event.attributes, "validator"),
        toAddress: address,
        type: TransactionType.Reward,
        amount: toCurrencyAmount(getAttribute(event.attributes, "amount")),
        amountCurrency: toSymbolPropper(
          getAttribute(event.attributes, "amount")
        ),
        feeAmount: 0, // Fixed later during "cost" transaction rollup
        feeCurrency: toSymbolPropper(txn.fee.amount[0].denom),
        txHash: txn.hash,
        memo: txn.memo,
      };
      return t;
    });
}

// Validator rewards in the same transaction can be combined together in order to reduce
// the total number of transactions. TAX tools frequently charge you by the number of
// transactions so this helps reduce cost.
function rollupStakingRewards(stakingRewards: Transaction[]): Transaction[] {
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

  return rewards;
}

// Every transaction has a corresponding cost.
// These costs are rolled up into the corresponding taxable event where possible later.
export function getCost(it: CosmosTransaction): Transaction {
  const fee = it.fee.amount[0].amount;
  const feeCurrency = it.fee.amount[0].denom;
  const cost: Transaction = {
    timestamp: it.block.timestamp,
    fromAddress: "",
    toAddress: "",
    type: TransactionType.Cost,
    amount: 0,
    amountCurrency: toSymbolPropper(feeCurrency),
    feeAmount: toCurrencyAmount(fee),
    feeCurrency: toSymbolPropper(feeCurrency),
    txHash: it.hash,
    memo: it.memo,
  };
  return cost;
}

// This will attempt to merge the "cost" transaction with the related taxable event. Thus reducing
// the total number of transactions.
export function rollupCostTxns(txns: Transaction[]): Transaction[] {
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

  // "Receive" Transactions should not include a fee for TAX purposes because it's paid by the sender not the receiver
  Object.values(rollupTxns).forEach((it) => {
    if (it.type === TransactionType.Receive) {
      it.feeAmount = 0;
    }
  });

  return Object.values(rollupTxns);
}

export function getTransfers(
  it: CosmosTransaction,
  address: string,
  messages: Messages
) {
  const transfers: Transaction[] = it.logs
    .map((i) => i.events)
    .filter(
      (_, index) =>
        !messages[index]["@type"].endsWith("MsgWithdrawDelegatorReward") &&
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
        amount: toCurrencyAmount(getAttribute(event.attributes, "amount")),
        amountCurrency: toSymbolPropper(
          getAttribute(event.attributes, "amount")
        ),
        feeAmount: 0, // Fixed later during "cost" transaction rollup
        feeCurrency: toSymbolPropper(it.fee.amount[0].denom),
        txHash: it.hash,
        memo: it.memo,
        description: "",
      };
      return txn;
    });
  return transfers;
}

export const getTransactions =
  (chainId: string, currencySymbol: string, currencyDenominator: number) =>
  async (address: string, hints: Hints): Promise<Transaction[]> => {
    const response = await fetchAllTransactions(hints, chainId, address, 0);
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

        const cost = getCost(it);
        const transfers = getTransfers(it, address, messages);
        const stakingRewards = getStakingRewards(it, address);
        const rewards = rollupStakingRewards(stakingRewards);

        return [cost, ...transfers, ...rewards];
      })
      .flat()
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));

    const rollupTxns = rollupCostTxns(txns);

    console.debug("Message Types:", messageMap);
    console.debug("Pre-Rollup Transactions:", txns);
    console.debug("Rollup Transactions:", rollupTxns);

    return rollupTxns;
  };
