# Transfer Action

The `transfer` action type sends native tokens, ERC20/SPL tokens, or NFTs to an address.

## Basic Structure

```json
{
  "type": "transfer",
  "label": "Send Funds",
  "address": "0xRecipientAddress...",
  "value": "1000000000000000000"
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"transfer"` |
| `label` | WarpText | ✅ | Button text |
| `description` | WarpText | ❌ | Additional context |
| `address` | string | ❌ | Recipient address (can use input) |
| `value` | string | ❌ | Native token amount in smallest unit |
| `transfers` | string[] | ❌ | Token transfers (format: `token\|amount`) |
| `data` | string | ❌ | Additional transaction data |
| `inputs` | WarpActionInput[] | ❌ | User inputs |
| `primary` | boolean | ❌ | Mark as primary action |
| `auto` | boolean | ❌ | Auto-execute without user click |
| `next` | string | ❌ | Next Warp ID after execution |
| `when` | string | ❌ | Conditional expression |

## Input Positions for Transfer

- `receiver` - Recipient address
- `value` - Native token amount
- `transfer` - Token/asset to send
- `chain` - Target blockchain
- `data` - Transaction data

## Examples

### Send Native Currency

```json
{
  "type": "transfer",
  "label": "Send 1 ETH",
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0Ab18",
  "value": "1000000000000000000"
}
```

### Send with User Input

```json
{
  "type": "transfer",
  "label": "Send Payment",
  "inputs": [
    {
      "name": "Recipient",
      "type": "address",
      "position": "receiver",
      "source": "field",
      "required": true
    },
    {
      "name": "Amount",
      "type": "biguint",
      "position": "value",
      "source": "field",
      "required": true,
      "modifier": "scale:18"
    }
  ]
}
```

### Send Token (ERC20/ESDT)

```json
{
  "type": "transfer",
  "label": "Send USDC",
  "address": "0xRecipient...",
  "transfers": ["USDC-c76f1f|1000000"]
}
```

### Dynamic Token Transfer

```json
{
  "type": "transfer",
  "label": "Send Token",
  "inputs": [
    {
      "name": "Recipient",
      "type": "address",
      "position": "receiver",
      "source": "field",
      "required": true
    },
    {
      "name": "Token & Amount",
      "type": "asset",
      "position": "transfer",
      "source": "field",
      "required": true
    }
  ]
}
```

### MultiversX ESDT Transfer

```json
{
  "type": "transfer",
  "label": "Send EGLD",
  "chain": "multiversx",
  "inputs": [
    {
      "name": "To",
      "type": "address",
      "position": "receiver",
      "source": "field",
      "required": true
    },
    {
      "name": "EGLD Amount",
      "type": "biguint",
      "position": "value",
      "source": "field",
      "required": true,
      "modifier": "scale:18"
    }
  ]
}
```

### NFT Transfer (MultiversX)

```json
{
  "type": "transfer",
  "label": "Send NFT",
  "chain": "multiversx",
  "inputs": [
    {
      "name": "Recipient",
      "type": "address",
      "position": "receiver",
      "source": "field",
      "required": true
    },
    {
      "name": "NFT",
      "type": "nft",
      "position": "transfer",
      "source": "field",
      "required": true
    }
  ]
}
```

## Chain-Specific Notes

### EVM Chains (Ethereum, Base, Arbitrum, Polygon)
- `value` is in wei (18 decimals for ETH)
- Token transfers require `contract` action with ERC20 `transfer` function

### MultiversX
- `value` is in wei (18 decimals for EGLD)
- `transfers` use format: `TOKEN-identifier|nonce|amount`
- ESDT/SFT/NFT transfers are native

### Solana
- Native SOL transfers use lamports (9 decimals)
- SPL tokens handled automatically

### Sui
- Native SUI uses MIST (9 decimals)
