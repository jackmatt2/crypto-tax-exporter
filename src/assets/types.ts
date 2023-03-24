import { Transaction } from "../transaction/types";

export interface Asset {
  id: string;
  symbol: string;
  icon: string;
  displayName: string;
  providers: Provider[];
}

export type GetTransactionsRequest = (
  address: string
) => Promise<Transaction[]>;

export interface Provider {
  id: string;
  displayName: string;
  getTransactions: GetTransactionsRequest;
}
