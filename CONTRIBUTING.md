# Contributing Guide

Contribution is encouraged - in doing so I have implemented a tipping feature. Users can tip contributors cryptocurrency into their personal wallet after downloading the CSV.

I would suggest creating a separate wallet explicitly for your tips.

## Contributions come with responsibilities:

- You are responsible for maintaining your crypto provider - fixing bugs, adding new features, maintaining the backend (if you need one).
- Maintaining user privacy is paramount and should be front of mind when developing providers.
- Wallet addresses should not be collected and no spamming user wallets.
- Failure to address user issues may result in re-allocating tips to the person that is actually maintaining it, reallocating to myself or disabling the provider completely.
- Breach of user privacy or other malicious activity may result is removal of the provider.

See [this](https://github.com/jackmatt2/crypto-tax-exporter/tree/main/src/assets/template) for a sample implementation.

# Overview

### Asset

An `Asset` is a single token. For example Bitcoin, Etherium, Cosmos Hub are all examples of assets. An `Asset` does not need to be a Layer 1 token. Tokens sitting on top of a Layer 1 can also be considered Assets.

### Provider

An `Asset` can have one or more providers. Providers are where the actual work takes place and is the most challenging part of the implementation. `Providers` transform the the blockchain queries into a common format called a `Transaction`.

### Transaction

The `Transaction` is a common generic interface. This is the core abstraction between the raw `Asset` queries and the `Serializer`. Due to this fact - any `Asset` is automatically compatible with any `Serializer` with no effort.

### Serializer

The `Serializer` converts `Transactions` into a compatible CSV format for a particular TAX reporting tool. Given they're all different, a separate `Serializer` needs to be implemented for every tool.

## Tips

Only `Providers` receive tips. Implementing an `Assset` or `Serializer` does not involve much effort. It's hoped the community or even the TAX tools themselves can implement these vendor specific features.
