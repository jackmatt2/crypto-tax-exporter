import { Transaction } from "../../../../transaction/types";
import { Provider } from "../../../types";

const getTransactions = (address: string): Promise<Transaction[]> => {
  return undefined as any;
};

const A: Provider = {
  id: "a",
  displayName: "Radix A",
  getTransactions,
};

export default A;
