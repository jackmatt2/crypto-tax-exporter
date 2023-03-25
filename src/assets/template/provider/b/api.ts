import { Transaction } from "../../../../transaction/types";
import { Hints, Provider } from "../../../types";

/**
 *
 * @param walletAddress the users wallet address
 * @param hints settings the user has requested you use when generating transactions (no guaranteed)
 * @returns all transaction for the wallet
 */
const getTransactions = (
  walletAddress: string,
  hints: Hints
): Promise<Transaction[]> => {
  // This is where the work happens
  // You would normally call some backend endpoint and map the data to a Transaction array.

  return Promise.resolve([]);
};

const B: Provider = {
  id: "SAMPLE_2",
  displayName: "Sample 2",
  maintainer: {
    githubUsername: "YOUR GITHUB USERNAME",
    personalWallet: "YOUR PERSONAL ADDRESS FOR THIS COIN TO RECEIVE TIPS",
  },
  getTransactions,
};

export default B;
