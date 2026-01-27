# Inputs

Inputs define how data is collected from users and where it's used in Warp actions.

## Input Structure

```json
{
  "name": "Amount",
  "as": "amount",
  "label": "Enter Amount",
  "description": "The amount to transfer",
  "bot": "AI-only hint for this input",
  "type": "uint256",
  "position": "arg:1",
  "source": "field",
  "required": true,
  "min": 1,
  "max": 1000000,
  "pattern": "^[0-9]+$",
  "patternDescription": "Must be a positive number",
  "options": ["100", "500", "1000"],
  "modifier": "scale:18",
  "default": "100"
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | ✅ | Display name / query param key |
| `type` | string | ✅ | Data type |
| `source` | string | ✅ | Where value comes from |
| `as` | string | ❌ | Variable name for interpolation |
| `label` | WarpText | ❌ | Localized label |
| `description` | WarpText | ❌ | Help text |
| `bot` | string | ❌ | AI-only context |
| `position` | string | ❌ | Where value is used |
| `required` | boolean | ❌ | Mandatory field |
| `min` | number | ❌ | Minimum value/length |
| `max` | number | ❌ | Maximum value/length |
| `pattern` | string | ❌ | Regex validation |
| `patternDescription` | WarpText | ❌ | Pattern error message |
| `options` | array/object | ❌ | Dropdown options |
| `modifier` | string | ❌ | Value transformation |
| `default` | string/number/boolean | ❌ | Default value |

## Sources

### `field` - User Input Form

```json
{
  "name": "Amount",
  "type": "uint256",
  "source": "field",
  "required": true
}
```

Renders as a form field in the UI.

### `query` - URL Query Parameter

```json
{
  "name": "token",
  "type": "string",
  "source": "query"
}
```

Reads from URL: `?token=USDC-c76f1f`

### `user:wallet` - Connected Wallet

```json
{
  "name": "sender",
  "type": "address",
  "source": "user:wallet"
}
```

Auto-fills with connected wallet address.

### `hidden` - Hardcoded/Internal

```json
{
  "name": "version",
  "type": "string",
  "source": "hidden",
  "default": "1.0.0"
}
```

Not shown to user, uses default value.

## Positions

Positions define where input values are used:

### Transaction Positions

| Position | Usage |
|----------|-------|
| `receiver` | Recipient address for transfers |
| `value` | Native token amount |
| `transfer` | Token/asset object |
| `data` | Transaction data field |
| `chain` | Target blockchain |

### Contract Argument Positions

| Position | Usage |
|----------|-------|
| `arg:1` | First function argument |
| `arg:2` | Second function argument |
| ... | ... |
| `arg:10` | Tenth function argument |

### Other Positions

| Position | Usage |
|----------|-------|
| `destination` | URL/address target |
| `payload:key` | Named payload field |

### Asset Position Object

For complex token transfers:

```json
{
  "position": {
    "token": "arg:1",
    "amount": "arg:2"
  }
}
```

## Input Types

### Base Types

| Type | Description | Example |
|------|-------------|---------|
| `string` | Text | `"hello"` |
| `uint8` - `uint256` | Unsigned integers | `255`, `1000000` |
| `biguint` | Arbitrary precision | `"123456789..."` |
| `bool` | Boolean | `true`, `false` |
| `address` | Blockchain address | `"0x..."`, `"erd1..."` |
| `hex` | Hexadecimal data | `"1234abcd"` |
| `token` | Token identifier | `"USDC-c76f1f"` |

### Special Input Types

| Type | Description |
|------|-------------|
| `nft` | NFT selector (renders picker) |
| `asset` | Generic asset selector |

## Modifiers

Transform input values before use:

### Scale Modifier

Scale by decimals:

```json
{
  "name": "Amount",
  "type": "biguint",
  "modifier": "scale:18"
}
```

User enters `1.5`, value becomes `1500000000000000000`

Dynamic scaling from another input:

```json
{
  "inputs": [
    {
      "name": "Decimals",
      "as": "decimals",
      "type": "uint8",
      "source": "field"
    },
    {
      "name": "Amount",
      "type": "biguint",
      "modifier": "scale:{{decimals}}"
    }
  ]
}
```

### Transform Modifier

Custom transformation:

```json
{
  "modifier": "transform:(value) => value.toUpperCase()"
}
```

## Options

### Array Options

```json
{
  "name": "Duration",
  "type": "string",
  "options": ["1 day", "1 week", "1 month"]
}
```

### Object Options (Labeled)

```json
{
  "name": "Network",
  "type": "string",
  "options": {
    "ethereum": "Ethereum Mainnet",
    "base": "Base",
    "arbitrum": "Arbitrum One"
  }
}
```

## Validation

### Required Field

```json
{
  "required": true
}
```

### Min/Max

```json
{
  "type": "uint256",
  "min": 1,
  "max": 1000000
}
```

For strings, applies to length.

### Pattern (Regex)

```json
{
  "pattern": "^[A-Z]+-[a-f0-9]{6}$",
  "patternDescription": "Must be a valid token ID (e.g., TOKEN-abc123)"
}
```

## Complete Examples

### Token Transfer Input

```json
{
  "inputs": [
    {
      "name": "Recipient",
      "as": "to",
      "type": "address",
      "position": "receiver",
      "source": "field",
      "required": true,
      "description": "Wallet address to send tokens to"
    },
    {
      "name": "Amount",
      "as": "amount",
      "type": "biguint",
      "position": "value",
      "source": "field",
      "required": true,
      "min": 0.001,
      "modifier": "scale:18"
    }
  ]
}
```

### Smart Contract Call Inputs

```json
{
  "inputs": [
    {
      "name": "Pool",
      "type": "address",
      "position": "arg:1",
      "source": "field",
      "required": true
    },
    {
      "name": "Token In",
      "type": "address",
      "position": "arg:2",
      "source": "field",
      "required": true
    },
    {
      "name": "Amount",
      "type": "uint256",
      "position": "arg:3",
      "source": "field",
      "required": true,
      "modifier": "scale:18"
    },
    {
      "name": "Slippage",
      "type": "uint256",
      "position": "arg:4",
      "source": "field",
      "default": "50",
      "options": ["10", "50", "100", "500"]
    }
  ]
}
```

### AI-Enhanced Inputs

```json
{
  "inputs": [
    {
      "name": "Purpose",
      "as": "purpose",
      "bot": "The main reason for this transaction. Help the user articulate their goal.",
      "type": "string",
      "source": "field",
      "required": true
    }
  ]
}
```
