import { TransactionType } from "../../transaction/types";
import { Serializer, Serialize } from "../types";
import { KoinlyLabel, KoinlyTransaction } from "./types";

function mapType(type: TransactionType): KoinlyLabel {
  switch (type) {
    case TransactionType.Reward:
      return "reward";
    case TransactionType.Mining:
      return "mining";
    case TransactionType.Airdrop:
      return "airdrop";
    case TransactionType.Cost:
      return "cost";
    default:
      return "";
  }
}

const toCSV: Serialize = (transactions) => {
  const headers = [
    "Date",
    "Sent Amount",
    "Sent Currency",
    "Received Amount",
    "Received Currency",
    "Fee Amount",
    "Fee Currency",
    "Label",
    "TxHash",
    "Description",
  ];

  const txns: KoinlyTransaction[] = transactions.map((it) => {
    const receivedAmount =
      it.type === TransactionType.Receive || it.type === TransactionType.Reward
        ? it.amount
        : 0;
    return {
      date: it.timestamp,
      sentAmount: it.type === TransactionType.Send ? it.amount : 0,
      sentCurrency: it.amountCurrency,
      receivedAmount: receivedAmount,
      receivedCurrency: it.amountCurrency,
      feeAmount: it.feeAmount,
      feeCurrency: it.feeCurrency,
      label: mapType(it.type),
      txHash: it.txHash,
      description: it.description ?? "",
    };
  });

  const rows = txns.map((it) => Object.values(it));
  return [headers, ...rows];
};

const serializer: Serializer = {
  id: "koinly",
  displayName: "koinly.io",
  serialize: toCSV,
};

export default serializer;
