export type CosmosTransaction = {
  height: number;
  hash: string;
  success: boolean;
  messages: Array<Record<string, any>>;
  //   [
  //     {
  //         "@type": "/cosmos.bank.v1beta1.MsgSend",
  //         "amount": [
  //             {
  //                 "denom": "uakt",
  //                 "amount": "3009238965"
  //             }
  //         ],
  //         "to_address": "akash18a5pyctvwsvmynr2c5xs3yhwe385p5z4cyaf7x",
  //         "from_address": "akash1cgx5dmdunmw4j25saukfppwzv8l6e9j3wy2upc"
  //     }
  // ]
  logs: Array<Record<string, any>>;
  memo: string;
  fee: {
    payer: string;
    amount: [
      {
        denom: string;
        amount: string;
      }
    ];
    granter: string;
    gas_limit: string;
  };
  // [
  //     {
  //         "events": [
  //             {
  //                 "type": "coin_received",
  //                 "attributes": [
  //                     {
  //                         "key": "receiver",
  //                         "value": "akash18a5pyctvwsvmynr2c5xs3yhwe385p5z4cyaf7x"
  //                     },
  //                     {
  //                         "key": "amount",
  //                         "value": "3009238965uakt"
  //                     }
  //                 ]
  //             },
  //             {
  //                 "type": "coin_spent",
  //                 "attributes": [
  //                     {
  //                         "key": "spender",
  //                         "value": "akash1cgx5dmdunmw4j25saukfppwzv8l6e9j3wy2upc"
  //                     },
  //                     {
  //                         "key": "amount",
  //                         "value": "3009238965uakt"
  //                     }
  //                 ]
  //             },
  //             {
  //                 "type": "message",
  //                 "attributes": [
  //                     {
  //                         "key": "action",
  //                         "value": "/cosmos.bank.v1beta1.MsgSend"
  //                     },
  //                     {
  //                         "key": "sender",
  //                         "value": "akash1cgx5dmdunmw4j25saukfppwzv8l6e9j3wy2upc"
  //                     },
  //                     {
  //                         "key": "module",
  //                         "value": "bank"
  //                     }
  //                 ]
  //             },
  //             {
  //                 "type": "transfer",
  //                 "attributes": [
  //                     {
  //                         "key": "recipient",
  //                         "value": "akash18a5pyctvwsvmynr2c5xs3yhwe385p5z4cyaf7x"
  //                     },
  //                     {
  //                         "key": "sender",
  //                         "value": "akash1cgx5dmdunmw4j25saukfppwzv8l6e9j3wy2upc"
  //                     },
  //                     {
  //                         "key": "amount",
  //                         "value": "3009238965uakt"
  //                     }
  //                 ]
  //             }
  //         ]
  //     }
  // ],
  block: {
    height: number;
    timestamp: string;
  };
};
