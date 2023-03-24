import { Transaction, TransactionType } from "../../transaction/types";
import { Serializer, Serialize } from "../types";
import { CryptoTaxCalculatorRow, CryptoTaxCalculatorType } from "./types";

function mapType(t: Transaction): CryptoTaxCalculatorType {
  switch (t.type) {
    case TransactionType.Reward:
      return "income";
    case TransactionType.Airdrop:
      return "airdrop";
    case TransactionType.Send:
      return "send";
    case TransactionType.Receive:
      return "receive";
    case TransactionType.Mining:
      return "mining";
    case TransactionType.Cost:
      return "expense";
  }
}

const toCSV: Serialize = (transactions) => {
  const headers = [
    "Timestamp (UTC)",
    "Type",
    "Base Currency",
    "Base Amount",
    "Quote Currency (Optional)",
    "Quote Amount (Optional)",
    "Fee Currency (Optional)",
    "Fee Amount (Optional)",
    "From (Optional)",
    "To (Optional)",
    "Blockchain (Optional)",
    "ID (Optional)",
    "Description (Optional)",
    "Reference Price Per Unit (Optional)",
    "Reference Price Currency (Optional)",
  ];

  const txns: CryptoTaxCalculatorRow[] = transactions.map((it) => {
    return {
      timestamp: it.timestamp,
      type: mapType(it),
      baseCurrency: it.amountCurrency,
      baseAmount: it.amount,
      quoteCurrency: "",
      quoteAmount: "",
      feeCurrency: it.feeCurrency,
      feeAmount: it.feeAmount,
      from: it.fromAddress,
      to: it.toAddress,
      blockchain: "",
      id: it.txHash,
      description: it.description ?? "",
      referencePricePerUnit: "",
      referencePriceCurrency: "",
    };
  });

  const rows = txns.map((it) => Object.values(it));
  return [headers, ...rows];
};

const serializer: Serializer = {
  id: "cryptotaxcalculator",
  displayName: "cryptotaxcalculator.io",
  serialize: toCSV,
};

export default serializer;
