import { TransactionType } from "../../transaction/types";
import { Serializer, Serialize } from "../types";

const toCSV: Serialize = (transactions) => {
  const headers = [
    "Timestamp",
    "From Address",
    "To Address",
    "Type",
    "Fee Amount",
    "Fee Currency",
    "Amount",
    "Amount currency",
    "TX Hash",
    "Memo",
    "Description",
  ];

  const rows = transactions.map((it) => Object.values(it));
  return [headers, ...rows];
};

const serializer: Serializer = {
  id: "generic",
  displayName: "Everything (Let me deal with it)",
  serialize: toCSV,
};

export default serializer;
