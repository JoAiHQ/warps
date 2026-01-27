# Multi-Chain Support

Warp Protocol v3 supports 11 blockchain networks. Use the `chain` parameter to target specific chains.

## Supported Chains

| Chain | Identifier | Type |
|-------|------------|------|
| MultiversX | `multiversx` | Native |
| VibeChain | `vibechain` | MultiversX LightSpeed |
| Sui | `sui` | Native |
| Ethereum | `ethereum` | EVM |
| Base | `base` | EVM (L2) |
| Arbitrum | `arbitrum` | EVM (L2) |
| Polygon | `polygon` | EVM (L2) |
| Somnia | `somnia` | EVM |
| Fastset | `fastset` | Native |
| Solana | `solana` | Native |
| NEAR | `near` | Native |

## Setting Chain

### Root-Level Default

Set chain for the entire Warp:

```json
{
  "protocol": "warp:3.0.0",
  "chain": "ethereum",
  "name": "ETH: Stake",
  "title": "Stake ETH",
  "description": "Stake ETH on Ethereum.",
  "actions": [...]
}
```

### Per-Action Chain

Override for specific actions:

```json
{
  "chain": "ethereum",
  "actions": [
    {
      "type": "query",
      "chain": "base",
      "label": "Check Balance on Base"
    },
    {
      "type": "contract",
      "label": "Stake on Ethereum"
    }
  ]
}
```

### Dynamic Chain Selection

```json
{
  "actions": [
    {
      "type": "transfer",
      "label": "Send",
      "inputs": [
        {
          "name": "Network",
          "as": "network",
          "type": "string",
          "position": "chain",
          "source": "field",
          "options": {
            "ethereum": "Ethereum",
            "base": "Base",
            "arbitrum": "Arbitrum"
          }
        }
      ]
    }
  ]
}
```

## Chain-Specific Considerations

### EVM Chains (Ethereum, Base, Arbitrum, Polygon)

- Native currency in wei (18 decimals)
- Uses `abi` for function signatures
- Standard ERC20/721/1155 support
- `gasLimit` in gas units

```json
{
  "type": "contract",
  "chain": "ethereum",
  "abi": "function transfer(address to, uint256 amount)",
  "address": "0xToken...",
  "func": "transfer",
  "gasLimit": 60000
}
```

### MultiversX

- Native EGLD in wei (18 decimals)
- ESDT, SFT, NFT native token standards
- Address format: `erd1...`
- Higher gas limits (millions)

```json
{
  "type": "contract",
  "chain": "multiversx",
  "address": "erd1qqqqqqqqqqqqqpgq...",
  "func": "stake",
  "gasLimit": 12000000,
  "transfers": ["USDC-c76f1f|0|1000000"]
}
```

### MultiversX LightSpeed Chains

VibeChain and other LightSpeed chains connect to MultiversX:

```json
{
  "type": "contract",
  "chain": "vibechain",
  "address": "erd1...",
  "func": "execute",
  "gasLimit": 10000000
}
```

### Sui

- Native SUI in MIST (9 decimals)
- Object-based model
- Address format: `0x...` (32 bytes hex)

```json
{
  "type": "contract",
  "chain": "sui",
  "address": "0xPackageAddress...",
  "func": "module::function"
}
```

### Solana

- Native SOL in lamports (9 decimals)
- SPL token standard
- Address format: base58

```json
{
  "type": "transfer",
  "chain": "solana",
  "address": "RecipientPubkey..."
}
```

### NEAR

- Native NEAR in yoctoNEAR (24 decimals)
- Account-based model
- Address format: `account.near`

```json
{
  "type": "contract",
  "chain": "near",
  "address": "contract.near",
  "func": "method_name"
}
```

## Cross-Chain Warps

Single Warp, multiple chains:

```json
{
  "protocol": "warp:3.0.0",
  "name": "Multi: Cross-Chain Query",
  "title": "Check Balances",
  "description": "Check your balance across chains.",
  "actions": [
    {
      "type": "query",
      "chain": "ethereum",
      "label": "ETH Balance",
      "auto": true,
      "abi": "function balanceOf(address)",
      "address": "0xToken...",
      "func": "balanceOf",
      "args": ["address:{{USER_WALLET}}"]
    },
    {
      "type": "query",
      "chain": "base",
      "label": "Base Balance",
      "auto": true,
      "abi": "function balanceOf(address)",
      "address": "0xToken...",
      "func": "balanceOf",
      "args": ["address:{{USER_WALLET}}"]
    }
  ]
}
```

## Chain Detection

Use global variables for chain-specific URLs:

```json
{
  "chain": "ethereum",
  "actions": [
    {
      "type": "link",
      "label": "View on Explorer",
      "url": "{{CHAIN_EXPLORER}}/tx/{{TX_HASH}}"
    }
  ]
}
```

| Chain | `CHAIN_EXPLORER` |
|-------|------------------|
| ethereum | https://etherscan.io |
| base | https://basescan.org |
| arbitrum | https://arbiscan.io |
| polygon | https://polygonscan.com |
| multiversx | https://explorer.multiversx.com |
| sui | https://suiscan.xyz |
| solana | https://solscan.io |

## Wallet Compatibility

Ensure wallets support the target chain:

```json
{
  "bot": "This Warp requires a wallet that supports {{chain}}. Guide the user to connect the appropriate wallet."
}
```
