import { Asset } from "../types";
import a from "./provider/a/api";

const asset: Asset = {
  id: "XRD",
  symbol: "XRD",
  displayName: "Radix (XRD)",
  providers: [a],
};

export default asset;
