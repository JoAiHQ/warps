# Query Action

The `query` action type reads data from smart contracts without creating a transaction. Useful for fetching on-chain state.

## Basic Structure

```json
{
  "type": "query",
  "label": "Check Balance",
  "address": "0xContractAddress...",
  "func": "balanceOf"
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"query"` |
| `label` | WarpText | ✅ | Button text |
| `description` | WarpText | ❌ | Additional context |
| `address` | string | ❌ | Contract address |
| `func` | string | ❌ | View function name |
| `args` | string[] | ❌ | Fixed typed arguments |
| `abi` | string | ❌ | Function ABI or URL to ABI file |
| `inputs` | WarpActionInput[] | ❌ | User inputs |
| `primary` | boolean | ❌ | Mark as primary action |
| `auto` | boolean | ❌ | Auto-execute on load |
| `next` | string | ❌ | Next Warp ID after execution |
| `when` | string | ❌ | Conditional expression |

## Examples

### Check Token Balance

```json
{
  "type": "query",
  "label": "Check Balance",
  "abi": "function balanceOf(address account) view returns (uint256)",
  "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "func": "balanceOf",
  "args": ["address:{{USER_WALLET}}"]
}
```

### Query with User Input

```json
{
  "type": "query",
  "label": "Check Allowance",
  "abi": "function allowance(address owner, address spender) view returns (uint256)",
  "address": "0xTokenAddress...",
  "func": "allowance",
  "inputs": [
    {
      "name": "Owner",
      "type": "address",
      "position": "arg:1",
      "source": "field",
      "required": true
    },
    {
      "name": "Spender",
      "type": "address",
      "position": "arg:2",
      "source": "field",
      "required": true
    }
  ]
}
```

### Auto-Query on Load

```json
{
  "type": "query",
  "label": "Current Price",
  "auto": true,
  "abi": "function getPrice() view returns (uint256)",
  "address": "0xPriceOracle...",
  "func": "getPrice"
}
```

### MultiversX Query

```json
{
  "type": "query",
  "label": "Get Stake",
  "chain": "multiversx",
  "address": "erd1qqqqqqqqqqqqqpgq...",
  "func": "getStake",
  "args": ["address:{{USER_WALLET}}"]
}
```

### Query with ABI URL

```json
{
  "type": "query",
  "label": "Get User Info",
  "address": "0xContract...",
  "func": "getUserInfo",
  "abi": "https://example.com/contract-abi.json",
  "args": ["address:{{USER_WALLET}}"]
}
```

### Chained Query (Use Result in Next Action)

```json
{
  "protocol": "warp:3.0.0",
  "name": "DeFi: Check and Stake",
  "title": "Stake Available Balance",
  "description": "Check your balance and stake it.",
  "output": {
    "BALANCE": "out.1"
  },
  "actions": [
    {
      "type": "query",
      "label": "Check Balance",
      "auto": true,
      "abi": "function balanceOf(address) view returns (uint256)",
      "address": "0xToken...",
      "func": "balanceOf",
      "args": ["address:{{USER_WALLET}}"]
    },
    {
      "type": "contract",
      "label": "Stake All",
      "abi": "function stake(uint256 amount)",
      "address": "0xStaking...",
      "func": "stake",
      "gasLimit": 200000,
      "args": ["uint256:{{BALANCE}}"]
    }
  ]
}
```

## Query vs Contract

| Aspect | Query | Contract |
|--------|-------|----------|
| Creates transaction | ❌ No | ✅ Yes |
| Costs gas | ❌ No | ✅ Yes |
| Modifies state | ❌ No | ✅ Yes |
| Returns data | ✅ Yes | ✅ Yes (via events) |
| Requires signing | ❌ No | ✅ Yes |

## Output Mapping

Query results can be captured using the root-level `output` field:

```json
{
  "output": {
    "TOKEN_BALANCE": "out.1",
    "TOKEN_SYMBOL": "out.2"
  }
}
```

Results are then available as `{{TOKEN_BALANCE}}` in subsequent actions or messages.
