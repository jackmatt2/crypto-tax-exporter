export interface Transaction {
  timestamp: string;
  fromAddress: string;
  toAddress: string;
  type: TransactionType;
  feeAmount: number;
  feeCurrency: string;
  amount: number;
  amountCurrency: string;
  txHash: string;
  memo?: string;
  description?: string;
}

export const enum TransactionType {
  Send = "Send",
  Receive = "Receive",
  Reward = "Reward",
  Mining = "Mining",
  Airdrop = "Airdrop",
  Cost = "Cost",
}
