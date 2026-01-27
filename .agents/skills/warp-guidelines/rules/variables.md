# Variables

Variables enable dynamic values in Warps through the `vars` field and `{{variable}}` interpolation syntax.

## Defining Variables

```json
{
  "vars": {
    "CONTRACT_ADDRESS": "0x1234...",
    "DEFAULT_AMOUNT": "1000000000000000000",
    "API_URL": "https://api.example.com"
  }
}
```

## Using Variables

Use `{{variableName}}` anywhere in the Warp:

```json
{
  "vars": {
    "TOKEN": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  },
  "actions": [
    {
      "type": "contract",
      "label": "Approve {{TOKEN}}",
      "address": "{{TOKEN}}",
      "func": "approve",
      "args": ["address:{{SPENDER}}", "uint256:{{MAX_AMOUNT}}"]
    }
  ]
}
```

### Valid Interpolation Locations

- `title` and `description`
- Action `label` and `description`
- `address`, `url`, `func`
- `args` values
- `prompt` templates
- `messages` content
- `next` URLs

## Dynamic Variable Sources

### From URL Query Parameters

```json
{
  "vars": {
    "USER_ADDRESS": "query:address",
    "TOKEN_ID": "query:token"
  }
}
```

URL: `?address=0x123&token=USDC` → `USER_ADDRESS = "0x123"`, `TOKEN_ID = "USDC"`

### From Environment Variables

```json
{
  "vars": {
    "API_KEY": "env:API_KEY",
    "API_URL": "env:COLLECT_API_URL"
  }
}
```

⚠️ **Note**: Environment variables are resolved at execution time by the client/server.

### From Input Fields

Inputs with `as` property become available as variables:

```json
{
  "inputs": [
    {
      "name": "Token Address",
      "as": "tokenAddress",
      "type": "address",
      "source": "field"
    }
  ]
}
```

Use as `{{tokenAddress}}` in the same or subsequent actions.

## Global Variables

Pre-defined variables available without declaration:

| Variable | Description |
|----------|-------------|
| `{{USER_WALLET}}` | Connected wallet address |
| `{{CHAIN_API}}` | Current chain's API URL |
| `{{CHAIN_EXPLORER}}` | Current chain's explorer URL |

### Using Globals

```json
{
  "actions": [
    {
      "type": "contract",
      "label": "Register",
      "args": ["address:{{USER_WALLET}}"]
    },
    {
      "type": "link",
      "label": "View on Explorer",
      "url": "{{CHAIN_EXPLORER}}/address/{{USER_WALLET}}"
    }
  ]
}
```

## Variable Scope

### Root-Level Variables

Accessible throughout the entire Warp:

```json
{
  "vars": {
    "GLOBAL_VAR": "value"
  },
  "title": "Using {{GLOBAL_VAR}}",
  "actions": [
    { "label": "Action with {{GLOBAL_VAR}}" }
  ]
}
```

### Input-Based Variables

Available after the input is collected:

```json
{
  "actions": [
    {
      "type": "transfer",
      "label": "Send to {{recipient}}",
      "inputs": [
        { "name": "Recipient", "as": "recipient", "type": "address", "source": "field" }
      ]
    }
  ]
}
```

### Output Variables

Available after action execution (see [Output](./output.md)):

```json
{
  "output": {
    "TX_HASH": "out.hash"
  },
  "messages": {
    "success": "Transaction: {{TX_HASH}}"
  }
}
```

## Examples

### Multi-Chain Configuration

```json
{
  "vars": {
    "USDC_ETH": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "USDC_BASE": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "USDC_ARB": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"
  }
}
```

### Payment Flow

```json
{
  "protocol": "warp:3.0.0",
  "name": "Payment: Invoice",
  "title": "Pay Invoice #{{invoiceId}}",
  "description": "Pay {{amount}} to {{merchant}}",
  "vars": {
    "invoiceId": "query:id",
    "amount": "query:amount",
    "merchant": "query:merchant"
  },
  "actions": [
    {
      "type": "transfer",
      "label": "Pay {{amount}}",
      "address": "{{merchant}}",
      "value": "{{amount}}"
    }
  ],
  "messages": {
    "success": "Invoice #{{invoiceId}} paid successfully!"
  }
}
```

### API Integration

```json
{
  "vars": {
    "API_URL": "env:API_URL",
    "API_KEY": "env:API_KEY"
  },
  "actions": [
    {
      "type": "collect",
      "label": "Submit",
      "destination": {
        "url": "{{API_URL}}/submit",
        "method": "POST",
        "headers": {
          "Authorization": "Bearer {{API_KEY}}"
        }
      }
    }
  ]
}
```

## Best Practices

1. **Use descriptive names**: `CONTRACT_ADDRESS` not `ADDR`
2. **Use UPPERCASE for constants**: `MAX_SUPPLY`, `DEFAULT_FEE`
3. **Use camelCase for dynamic values**: `tokenAmount`, `recipientAddress`
4. **Keep secrets in env vars**: Never hardcode API keys
5. **Document variable requirements**: Use `bot` field to explain expected formats
