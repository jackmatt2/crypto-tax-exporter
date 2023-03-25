import { Transaction } from "../transaction/types";

/**
 * All assets need to satisfy this interface
 */
export interface Asset {
  id: string;
  symbol: string;
  icon: string;
  displayName: string;
  providers: Provider[];
}

export type GetTransactionsRequest = (
  address: string,
  hints: Hints
) => Promise<Transaction[]>;

/**
 * All provider implementation need to satisfy this interface
 */
export interface Provider {
  id: string;
  displayName: string;
  maintainer: {
    githubUsername: string;
    personalWallet: string;
  };
  getTransactions: GetTransactionsRequest;
}

/**
 * Hints allow the user to request the provider use certains features.
 * There is no requirement or guarantee that the hints will be respected.
 */
export interface Hints {
  // The proxy allows you to overcome CORS related issues
  proxy: (url: string) => string;

  // Operations of the same type should be rolled up into a since transaction whereby the are part of the same transaction.
  // For example, receiving multiple validation rewards from different validators
  rollup: boolean;
}
