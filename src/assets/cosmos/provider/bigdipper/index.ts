import { Provider } from "../../../types";
import { getTransactions } from "./transformer";

export const forbole = (
  chainId: string,
  currencySymbol: string,
  currencyDenominator: number,
  maintainerWallet: string
) => {
  const provider: Provider = {
    id: "forbole.com",
    displayName: "forbole.com",
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
