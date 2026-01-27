# Core Warp Structure

Every Warp JSON must follow this root structure with required and optional fields.

## Required Fields

```json
{
  "protocol": "warp:3.0.0",
  "name": "Category: Action Name",
  "title": "User-Facing Title",
  "description": "Clear description of what this Warp does.",
  "actions": []
}
```

### Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `protocol` | string | ✅ | Must be `"warp:3.0.0"` |
| `name` | string | ✅ | Internal identifier, format: `Category: Name` |
| `title` | WarpText | ✅ | Displayed to user (keep short, action-oriented) |
| `description` | WarpText \| null | ✅ | Context for the user (1-2 sentences) |
| `actions` | WarpAction[] | ✅ | Array of at least one action |

## Optional Fields

```json
{
  "protocol": "warp:3.0.0",
  "name": "Token: Swap",
  "title": "Swap Tokens",
  "description": "Exchange one token for another.",
  "chain": "ethereum",
  "bot": "Helps users swap tokens on DEXes.",
  "preview": "https://example.com/preview.png",
  "vars": {
    "ROUTER": "0x..."
  },
  "next": "success-warp-id",
  "output": {
    "AMOUNT_OUT": "out.1"
  },
  "messages": {
    "success": "Swapped successfully!"
  },
  "alerts": {},
  "related": ["other-warp-id"],
  "actions": []
}
```

### Optional Field Definitions

| Field | Type | Description |
|-------|------|-------------|
| `chain` | WarpChainName | Default blockchain for actions |
| `bot` | string | AI-only metadata (hidden from users) |
| `preview` | string | URL to preview image |
| `vars` | object | Static or dynamic variables |
| `next` | string | Warp ID or URL for next step |
| `output` | object | Result extraction mappings |
| `messages` | object | Custom success/error messages |
| `alerts` | object | Notification triggers |
| `related` | string[] | Related Warp IDs |
| `ui` | string | Custom UI identifier |

## WarpText Type

Text fields (`title`, `description`, `label`) support internationalization:

```json
// Simple string
"title": "Send Tokens"

// Localized object
"title": {
  "en": "Send Tokens",
  "de": "Token senden",
  "es": "Enviar Tokens"
}
```

## Name Conventions

The `name` field should follow the `Category: Action` format:

- `Token: Transfer` - Token operations
- `Contract: Stake` - Smart contract interactions
- `DeFi: Swap` - DeFi operations
- `NFT: Mint` - NFT operations
- `Data: Collect` - Data collection
- `AI: Generate` - AI operations

## Example: Complete Warp

```json
{
  "protocol": "warp:3.0.0",
  "name": "Payment: Send USDC",
  "title": "Send USDC Payment",
  "description": "Send USDC to any address on Ethereum.",
  "chain": "ethereum",
  "bot": "Help users send USDC payments. Ask for recipient and amount.",
  "preview": "https://example.com/usdc-preview.png",
  "vars": {
    "USDC_ADDRESS": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  },
  "actions": [
    {
      "type": "contract",
      "label": "Send Payment",
      "abi": "function transfer(address to, uint256 amount)",
      "address": "{{USDC_ADDRESS}}",
      "func": "transfer",
      "gasLimit": 60000,
      "inputs": [
        {
          "name": "Recipient",
          "as": "to",
          "type": "address",
          "position": "arg:1",
          "source": "field",
          "required": true
        },
        {
          "name": "Amount",
          "as": "amount",
          "type": "uint256",
          "position": "arg:2",
          "source": "field",
          "required": true,
          "modifier": "scale:6"
        }
      ]
    }
  ],
  "messages": {
    "success": "Payment sent to {{to}}!"
  }
}
```
