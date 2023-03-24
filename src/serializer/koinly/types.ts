export interface KoinlyTransaction {
  date: string;
  sentAmount: number;
  sentCurrency: string;
  receivedAmount: number;
  receivedCurrency: string;
  feeAmount: number;
  feeCurrency: string;
  label: KoinlyLabel;
  txHash: string;
  description: string;
}

export type KoinlyLabel =
  | KoinlyLabelOutgoing
  | KoinlyLabelIncoming
  | KoinlyLabelTrade
  | "";

export type KoinlyLabelOutgoing =
  | "gift"
  | "lost"
  | "cost"
  | "margin fee"
  | "realized gain"
  | "stake";

export type KoinlyLabelIncoming =
  | "airdrop"
  | "fork"
  | "mining"
  | "reward"
  | "income"
  | "loan interest"
  | "realized gain"
  | "unstake";

export type KoinlyLabelTrade = "swap" | "liquidity in" | "liquidity out";
