import cosmos from "./cosmos";
// import sample from "./template";
import { Asset } from "./types";

const assets: Asset[] = [...cosmos] //, sample
  .sort((a, b) => a.displayName.localeCompare(b.displayName));

export default assets;
