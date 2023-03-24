import { Asset, Provider } from "../types";
import { mintscan } from "./provider/mintscan/api";

interface CosmosChain {
  name: string;
  symbol: string;
  icon?: string;
  addressPrefix: string;
  providers: Array<Provider>;
}

const chains: Array<CosmosChain> = [
  {
    name: "Cosmos Hub",
    symbol: "ATOM",
    addressPrefix: "cosmos",
    providers: [mintscan("cosmos", "ATOM", 1_000_000)],
  },
  {
    name: "Osmosis",
    symbol: "OSMO",
    addressPrefix: "osmosis",
    providers: [mintscan("osmosis", "OSMO", 1_000_000)],
  },
  {
    name: "Secret Network",
    symbol: "SCRT",
    addressPrefix: "secret",
    providers: [mintscan("secret", "SCRT", 1_000_000)],
  },
  {
    name: "Akash",
    symbol: "AKT",
    addressPrefix: "akash",
    providers: [mintscan("akash", "AKT", 1_000_000)],
  },
  {
    name: "Mars Hub",
    symbol: "MARS",
    addressPrefix: "mars",
    providers: [mintscan("mars", "MARS", 1_000_000)],
  },
  {
    name: "Crypto.org",
    symbol: "CRO",
    addressPrefix: "cro",
    providers: [mintscan("cronos", "CRO", 1_000_000)],
  },
  {
    name: "Starname",
    symbol: "IOV",
    addressPrefix: "star",
    providers: [mintscan("starname", "IOV", 1_000_000)],
  },
  {
    name: "Sifchain",
    symbol: "ROWAN",
    icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/8541.png",
    addressPrefix: "sif",
    providers: [mintscan("sifchain", "ROWAN", 1_000_000)],
  },
  {
    name: "Shentu",
    symbol: "CTK",
    addressPrefix: "certik",
    providers: [mintscan("certik", "CTK", 1_000_000)],
  },
  {
    name: "IRISnet",
    symbol: "IRIS",
    addressPrefix: "iaa",
    providers: [mintscan("iris", "IRIS", 1_000_000)],
  },
  {
    name: "Regen",
    symbol: "REGEN",
    addressPrefix: "regen",
    providers: [mintscan("regen", "REGEN", 1_000_000)],
  },
  {
    name: "Persistence",
    symbol: "XPRT",
    addressPrefix: "persistence",
    providers: [mintscan("persistence", "XPRT", 1_000_000)],
  },
  {
    name: "Sentinel",
    symbol: "DVPN",
    addressPrefix: "sent",
    providers: [mintscan("sentinel", "DVPN", 1_000_000)],
  },
  {
    name: "ixo",
    symbol: "IXO",
    addressPrefix: "ixo",
    providers: [mintscan("ixo", "IXO", 1_000_000)],
  },
  {
    name: "e-Money",
    symbol: "NGM",
    addressPrefix: "emoney",
    providers: [mintscan("emoney", "NGM", 1_000_000)],
  },
  // ["Agoric", "BLD", "agoric"], Not supported on mintscan.io
  // ["Bostrom", "BOOT", "bostrom"], Not supported on mintscan.io
  {
    name: "Juno",
    symbol: "JUNO",
    addressPrefix: "juno",
    providers: [mintscan("juno", "JUNO", 1_000_000)],
  },
  {
    name: "Stargaze",
    symbol: "STARS",
    addressPrefix: "stars",
    providers: [mintscan("stargaze", "STARS", 1_000_000)],
  },
  {
    name: "Axelar",
    symbol: "AXL",
    addressPrefix: "axelar",
    providers: [mintscan("axelar", "AXL", 1_000_000)],
  },
  {
    name: "Sommelier",
    symbol: "SOMM",
    addressPrefix: "somm",
    providers: [mintscan("sommelier", "SOMM", 1_000_000)],
  },
  {
    name: "Umee",
    symbol: "UMEE",
    addressPrefix: "umee",
    providers: [mintscan("umee", "UMEE", 1_000_000)],
  },
  {
    name: "Gravity Bridge",
    symbol: "GRAV",
    addressPrefix: "gravity",
    providers: [mintscan("gravitybridge", "GRAV", 1_000_000)],
  },
  {
    name: "Tgrade",
    symbol: "TGD",
    addressPrefix: "tgrade",
    providers: [mintscan("tgrade", "TGD", 1_000_000)],
  },
  {
    name: "Stride",
    symbol: "STRD",
    addressPrefix: "stride",
    providers: [mintscan("stride", "STRD", 1_000_000)],
  },
  {
    name: "Evmos",
    symbol: "EVMOS",
    addressPrefix: "evmos",
    providers: [mintscan("evmos", "EVMOS", 1_000_000)],
  },
  {
    name: "Injective",
    symbol: "INJ",
    addressPrefix: "inj",
    providers: [mintscan("injective", "INJ", 1_000_000)],
  },
  {
    name: "Kava",
    symbol: "KAVA",
    addressPrefix: "kava",
    providers: [mintscan("kava", "KAVA", 1_000_000)],
  },
  {
    name: "Quicksilver",
    symbol: "QCK",
    icon: "https://s2.coinmarketcap.com/static/cloud/img/dex/default-icon-day.svg?_=a2eace7",
    addressPrefix: "quick",
    providers: [mintscan("quicksilver", "QCK", 1_000_000)],
  },
  // ["Terra", "LUNA", "terra"], Not supported on mintscan.io
  // ["Terra Clasic", "LUNC", "terra"], Not supported on mintscan.io
  // ["Jackal", "JKL", "jkl"], Not supported on mintscan.io
];

const configs: Asset[] = chains.map((it) => {
  return {
    id: it.symbol,
    symbol: it.symbol,
    icon:
      it.icon ??
      `https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/32/${it.symbol.toLowerCase()}.webp`,
    displayName: `${it.name} (${it.symbol})`,
    providers: it.providers,
  };
});

export default configs;
