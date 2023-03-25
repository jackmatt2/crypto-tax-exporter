import { Asset } from "../types";
import providerA from "./provider/a/api";
import providerB from "./provider/a/api";

/**
 * Implement an asset according to the Asset interface
 *
 * You then need to add this to the array in src/assets/index.ts
 */
const asset: Asset = {
  id: "SAMPLE",
  symbol: "SAMPLE",
  icon: "https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/btc.webp",
  displayName: "Template (SAMPLE)",
  providers: [providerA, providerB], // Coins can have multiple providers
};

export default asset;
