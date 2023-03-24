import { Transaction } from "../transaction/types";

export interface Serializer {
  id: string;
  displayName: string;
  serialize: Serialize;
}

export type Serialize = (transactions: Transaction[]) => string[][];
