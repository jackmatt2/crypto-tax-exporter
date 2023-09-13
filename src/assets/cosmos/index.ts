import { Asset, Provider } from "../types";
import { bigdipper } from "./provider/bigdipper/api";

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
    providers: [
      bigdipper(
        "cosmos",
        "ATOM",
        1_000_000,
        "cosmos1schyepkmg4p2kyfsd93dhsqp7lukl0vue44dq7"
      ),
    ],
  },
  {
    name: "Osmosis",
    symbol: "OSMO",
    addressPrefix: "osmosis",
    providers: [
      bigdipper(
        "osmosis",
        "OSMO",
        1_000_000,
        "osmo1schyepkmg4p2kyfsd93dhsqp7lukl0vu3wxakv"
      ),
    ],
  },
  {
    name: "Secret Network",
    symbol: "SCRT",
    addressPrefix: "secret",
    providers: [
      bigdipper(
        "secret",
        "SCRT",
        1_000_000,
        "secret1sn4vfqv52cx5c690kvm04y0u0mphc72d09sgkd"
      ),
    ],
  },
  {
    name: "Akash",
    symbol: "AKT",
    addressPrefix: "akash",
    providers: [
      bigdipper(
        "akash",
        "AKT",
        1_000_000,
        "akash1schyepkmg4p2kyfsd93dhsqp7lukl0vu5wc2ey"
      ),
    ],
  },
  {
    name: "Mars Hub",
    symbol: "MARS",
    addressPrefix: "mars",
    providers: [
      bigdipper(
        "mars",
        "MARS",
        1_000_000,
        "mars1schyepkmg4p2kyfsd93dhsqp7lukl0vuygv549"
      ),
    ],
  },
  {
    name: "Crypto.org",
    symbol: "CRO",
    addressPrefix: "cro",
    providers: [
      bigdipper(
        "cronos",
        "CRO",
        1_000_000,
        "cro1nzpflj83fnnnc24w5knsp34lw5rpm8tkuvezu9"
      ),
    ],
  },
  {
    name: "Starname",
    symbol: "IOV",
    addressPrefix: "star",
    providers: [
      bigdipper(
        "starname",
        "IOV",
        1_000_000,
        "star1pyzem9clnsw268xfvujndsauj3nc5ugrsghzkg"
      ),
    ],
  },
  {
    name: "Sifchain",
    symbol: "ROWAN",
    icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/8541.png",
    addressPrefix: "sif",
    providers: [
      bigdipper(
        "sifchain",
        "ROWAN",
        1_000_000,
        "sif1schyepkmg4p2kyfsd93dhsqp7lukl0vuug6m04"
      ),
    ],
  },
  {
    name: "Shentu",
    symbol: "CTK",
    addressPrefix: "certik",
    providers: [
      bigdipper(
        "certik",
        "CTK",
        1_000_000,
        "certik1schyepkmg4p2kyfsd93dhsqp7lukl0vu7af6p4"
      ),
    ],
  },
  {
    name: "IRISnet",
    symbol: "IRIS",
    addressPrefix: "iaa",
    providers: [
      bigdipper(
        "iris",
        "IRIS",
        1_000_000,
        "iaa1schyepkmg4p2kyfsd93dhsqp7lukl0vuvh4uz0"
      ),
    ],
  },
  {
    name: "Regen",
    symbol: "REGEN",
    addressPrefix: "regen",
    providers: [
      bigdipper(
        "regen",
        "REGEN",
        1_000_000,
        "regen1schyepkmg4p2kyfsd93dhsqp7lukl0vuxh73k6"
      ),
    ],
  },
  {
    name: "Persistence",
    symbol: "XPRT",
    addressPrefix: "persistence",
    providers: [
      bigdipper(
        "persistence",
        "XPRT",
        1_000_000,
        "persistence1schyepkmg4p2kyfsd93dhsqp7lukl0vuhen7w6"
      ),
    ],
  },
  {
    name: "Sentinel",
    symbol: "DVPN",
    addressPrefix: "sent",
    providers: [
      bigdipper(
        "sentinel",
        "DVPN",
        1_000_000,
        "sent1schyepkmg4p2kyfsd93dhsqp7lukl0vuzwr5y3"
      ),
    ],
  },
  {
    name: "ixo",
    symbol: "IXO",
    addressPrefix: "ixo",
    providers: [
      bigdipper(
        "ixo",
        "IXO",
        1_000_000,
        "ixo1schyepkmg4p2kyfsd93dhsqp7lukl0vuxqtlyd"
      ),
    ],
  },
  {
    name: "e-Money",
    symbol: "NGM",
    addressPrefix: "emoney",
    providers: [
      bigdipper(
        "emoney",
        "NGM",
        1_000_000,
        "emoney1schyepkmg4p2kyfsd93dhsqp7lukl0vukk0ehr"
      ),
    ],
  },
  // ["Agoric", "BLD", "agoric"], Not supported on mintscan.io
  // ["Bostrom", "BOOT", "bostrom"], Not supported on mintscan.io
  {
    name: "Juno",
    symbol: "JUNO",
    addressPrefix: "juno",
    providers: [
      bigdipper(
        "juno",
        "JUNO",
        1_000_000,
        "juno1schyepkmg4p2kyfsd93dhsqp7lukl0vu08kk8z"
      ),
    ],
  },
  {
    name: "Stargaze",
    symbol: "STARS",
    addressPrefix: "stars",
    providers: [
      bigdipper(
        "stargaze",
        "STARS",
        1_000_000,
        "stars1schyepkmg4p2kyfsd93dhsqp7lukl0vudfzst0"
      ),
    ],
  },
  {
    name: "Axelar",
    symbol: "AXL",
    addressPrefix: "axelar",
    providers: [
      bigdipper(
        "axelar",
        "AXL",
        1_000_000,
        "axelar1schyepkmg4p2kyfsd93dhsqp7lukl0vuamr9tl"
      ),
    ],
  },
  {
    name: "Sommelier",
    symbol: "SOMM",
    addressPrefix: "somm",
    providers: [
      bigdipper(
        "sommelier",
        "SOMM",
        1_000_000,
        "somm1schyepkmg4p2kyfsd93dhsqp7lukl0vu4f6p35"
      ),
    ],
  },
  {
    name: "Umee",
    symbol: "UMEE",
    addressPrefix: "umee",
    providers: [
      bigdipper(
        "umee",
        "UMEE",
        1_000_000,
        "umee1schyepkmg4p2kyfsd93dhsqp7lukl0vutrgjyv"
      ),
    ],
  },
  {
    name: "Gravity Bridge",
    symbol: "GRAV",
    addressPrefix: "gravity",
    providers: [
      bigdipper(
        "gravitybridge",
        "GRAV",
        1_000_000,
        "gravity1schyepkmg4p2kyfsd93dhsqp7lukl0vua9849k"
      ),
    ],
  },
  {
    name: "Tgrade",
    symbol: "TGD",
    addressPrefix: "tgrade",
    providers: [
      bigdipper(
        "tgrade",
        "TGD",
        1_000_000,
        "tgrade1schyepkmg4p2kyfsd93dhsqp7lukl0vuj4anww"
      ),
    ],
  },
  {
    name: "Stride",
    symbol: "STRD",
    addressPrefix: "stride",
    providers: [
      bigdipper(
        "stride",
        "STRD",
        1_000_000,
        "stride1schyepkmg4p2kyfsd93dhsqp7lukl0vu67435j"
      ),
    ],
  },
  {
    name: "Evmos",
    symbol: "EVMOS",
    addressPrefix: "evmos",
    providers: [
      bigdipper(
        "evmos",
        "EVMOS",
        1_000_000,
        "evmos14zqh37h5pe9kwgk6tagav96eeyy9sxklt3v3g2"
      ),
    ],
  },
  {
    name: "Injective",
    symbol: "INJ",
    addressPrefix: "inj",
    providers: [
      bigdipper(
        "injective",
        "INJ",
        1_000_000,
        "inj14zqh37h5pe9kwgk6tagav96eeyy9sxklre2mq6"
      ),
    ],
  },
  {
    name: "Kava",
    symbol: "KAVA",
    addressPrefix: "kava",
    providers: [
      bigdipper(
        "kava",
        "KAVA",
        1_000_000,
        "kava1vv6q7560c7e06ucykt2nt7h0kr98rk6vlfkluk"
      ),
    ],
  },
  {
    name: "Quicksilver",
    symbol: "QCK",
    icon: "https://s2.coinmarketcap.com/static/cloud/img/dex/default-icon-day.svg?_=a2eace7",
    addressPrefix: "quick",
    providers: [
      bigdipper(
        "quicksilver",
        "QCK",
        1_000_000,
        "quick1schyepkmg4p2kyfsd93dhsqp7lukl0vuj39lev"
      ),
    ],
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
