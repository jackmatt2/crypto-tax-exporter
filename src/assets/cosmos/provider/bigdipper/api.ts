import { Hints } from "../../../types";

import { CosmosTransaction } from "./types";
import Bottleneck from "bottleneck";

const PAGE_SIZE = 50;

// Prevents us overwhelming the cors proxy
// values may need to be experimented with in order to get good results
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 333,
});

export async function fetchAllTransactions(
  hints: Hints,
  chain: string,
  address: string,
  fromIndex: number,
  txns: CosmosTransaction[] = []
): Promise<CosmosTransaction[]> {
  const response = await fetch(
    hints.proxy(`https://gql.${chain}.forbole.com/v1/graphql`),
    {
      body: JSON.stringify([
        {
          operationName: "GetMessagesByAddress",
          variables: {
            limit: PAGE_SIZE,
            offset: fromIndex,
            types: "{}",
            address: `{${address}}`,
          },
          query:
            'query GetMessagesByAddress($address: _text, $limit: bigint = 50, $offset: bigint = 0, $types: _text = "{}") {\n  messagesByAddress: messages_by_address(\n    args: {addresses: $address, types: $types, limit: $limit, offset: $offset}\n  ) {\n    transaction {\n      height\n      hash\n      success\n      memo\n      fee\n      messages\n      logs\n      block {\n        height\n        timestamp\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}',
        },
      ]),
      method: "post",
      headers: {
        accept: "application/json",
      },
    }
  );
  const json = await response.json();
  const currentTxns = json[0].data.messagesByAddress.map(
    (it: any) => it.transaction
  );
  txns.push(...currentTxns);
  if (Array.isArray(currentTxns) && currentTxns.length === PAGE_SIZE) {
    const nextIndex = currentTxns.length;
    return limiter.schedule(() =>
      fetchAllTransactions(hints, chain, address, nextIndex, txns)
    );
  }
  console.log(`Raw Transactions`, txns);
  return txns;
}
