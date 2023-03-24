export interface CryptoTaxCalculatorRow {
  timestamp: string;
  type: CryptoTaxCalculatorType;
  baseCurrency: string;
  baseAmount: number;
  quoteCurrency: string;
  quoteAmount: number | "";
  feeCurrency: string;
  feeAmount: number;
  from: string;
  to: string;
  blockchain: string;
  id: string;
  description: string;
  referencePricePerUnit: string;
  referencePriceCurrency: string;
}

export type CryptoTaxCalculatorType =
  | "buy" // purchase of cryptocurrency which increases balance remaining and effects cost basis.
  | "sell" // a sale of cryptocurrency which decreases balance remaining and triggers a capital gain event.
  | "fiat-deposit" // a deposit of your local currency into the exchange. Note, if you deposit a currency other then your local currency, you need to have a corresponding buy transaction of that currency.
  | "fiat-withdrawal" // use this if you cashed out from an exchange into your bank account.
  | "receive" // a transfer of cryptocurrency to a wallet or exchange. Increases the balance remaining on the receiving address and decreases the balance remaining on the from address. Does not increase your overall balance remaining. Does not trigger a capital gain event.
  | "send" // a transfer of cryptocurrency from a wallet or exchange. Increases the balance remaining on the receiving address and decreases the balance remaining on the from address. Does not decrease your overall balance remaining. Does not trigger a capital gain event.
  | "chain-split" // use this if you acquired a new cryptocurrency as a result of a chain split (such as Bitcoin Cash being receiving by Bitcoin holders).
  | "expense" // use this if you want to categorize an outgoing transaction as an expense (e.g. business paying out a salary).
  | "stolen" // triggers a capital loss event with the sale price being zero.
  | "lost" // use this if you have lost the crypto, triggers a capital loss event similar to the stolen category.
  | "burn" // use this if you have sent your crypto / NFT to a burner address, triggers a capital loss event similar to the stolen category.
  | "income" // triggers an income tax event based on the market value at the time of receipt. Increase the balance remaining and is used for future cost basis calculations.
  | "interest" // similar to income but used for interest-bearing activities which don't suit other categories.
  | "mining" // use this if you received mining rewards (as a hobby).
  | "airdrop" // use this if you received a free token airdrop.
  | "staking" // use this if you earned interest from staking.
  | "cashback" // use this if you acquired cryptocurrency as a cash-back (e.g credit card payment).
  | "royalty" // use this if you have received payments from secondary sales (e.g. being a NFT creator).
  | "royalties"
  | "personal-use" // use this if you spent crypto on personal use and you want to ignore this transaction for tax purposes. Warning, this is only valid in very specific individual circumstances. Check with your tax professional before using this option.
  | "gift" // use this if you have acquired cryptocurrency as a gift. If you have given a gift to someone else use the sell category.
  | "borrow" // use this if you have received (acquired) a cryptocurrency or cash as a loan.
  | "loan-repayment" // use this if you have repaid a loan.
  | "liquidate" // use this if the lending platform you used has liquidated your collateral.
  | "fee" // use this if you have disposed of cryptocurrency to cover fee transactions generated as a result of other transactions; e.g. gas fees paid during on-chain Ethereum swaps. If using this category, don't include this fee amount in the fee column.
  | "realized-profit" // advanced usage only - use this if you have performed margin, futures, derivates, etc. type trades and realized a profit of your trading activity.
  | "realized-loss" // advanced usage only - use this if you have performed margin, futures, derivates, etc. type trades and realized a loss of your trading activity.
  | "margin-fee"; // advanced usage only - use this if you have paid fees associated with a realized-profit or realized-loss trades.
