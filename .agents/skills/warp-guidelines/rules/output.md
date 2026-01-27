# Output & Results

The `output` field extracts values from Warp execution for use in messages, subsequent actions, and chained Warps.

## Basic Structure

```json
{
  "output": {
    "RESULT_NAME": "resolution.path"
  }
}
```

## Resolution Paths

### Contract/Query Output

Extract function return values:

```json
{
  "output": {
    "BALANCE": "out.1",
    "ALLOWANCE": "out.2"
  }
}
```

- `out.1` - First return value
- `out.2` - Second return value
- etc.

### Event Data

Extract from emitted events:

```json
{
  "output": {
    "TOKEN_ID": "event.Transfer.3",
    "FROM": "event.Transfer.1",
    "TO": "event.Transfer.2"
  }
}
```

Format: `event.{EventName}.{ArgumentIndex}`

### HTTP Response (Collect)

Extract from JSON response:

```json
{
  "output": {
    "USER_ID": "out.data.id",
    "USER_NAME": "out.data.user.name",
    "TOKEN_PRICE": "out.price"
  }
}
```

Use dot notation to traverse nested objects.

## Using Output Values

### In Messages

```json
{
  "output": {
    "TX_HASH": "out.hash",
    "AMOUNT": "out.1"
  },
  "messages": {
    "success": "Sent {{AMOUNT}}! TX: {{TX_HASH}}"
  }
}
```

### In Subsequent Actions

```json
{
  "output": {
    "TOKEN_BALANCE": "out.1"
  },
  "actions": [
    {
      "type": "query",
      "label": "Check Balance",
      "auto": true,
      "func": "balanceOf"
    },
    {
      "type": "contract",
      "label": "Stake All",
      "args": ["uint256:{{TOKEN_BALANCE}}"]
    }
  ]
}
```

### In Next URL

```json
{
  "output": {
    "RAFFLE_ID": "out.1"
  },
  "next": "view-raffle?id={{RAFFLE_ID}}"
}
```

## Transform Results

Compute derived values using JavaScript:

```json
{
  "output": {
    "RAW_BALANCE": "out.1",
    "FORMATTED_BALANCE": "transform:() => { return (result.RAW_BALANCE / 1e18).toFixed(4) }",
    "IS_WHALE": "transform:() => { return result.RAW_BALANCE > 1000000000000000000000 ? 'Yes' : 'No' }"
  }
}
```

### Transform Rules

- Transforms execute in order
- Each transform can access previously computed results via `result` object
- Must be synchronous
- Runs in sandboxed environment
- Returns `null` on error

### Transform Examples

```json
{
  "output": {
    // Basic extraction
    "BASE_VALUE": "out.1",

    // Double the value
    "DOUBLED": "transform:() => { return result.BASE_VALUE * 2 }",

    // Format as percentage
    "PERCENTAGE": "transform:() => { return (result.BASE_VALUE * 100).toFixed(2) + '%' }",

    // Conditional logic
    "STATUS": "transform:() => { return result.BASE_VALUE > 0 ? 'Active' : 'Inactive' }",

    // String formatting
    "DISPLAY": "transform:() => { return `Balance: ${result.BASE_VALUE}` }"
  }
}
```

## Complete Examples

### Token Balance Check

```json
{
  "protocol": "warp:3.0.0",
  "name": "Token: Check Balance",
  "title": "Check Token Balance",
  "description": "See your token balance.",
  "output": {
    "RAW_BALANCE": "out.1",
    "FORMATTED": "transform:() => { return (result.RAW_BALANCE / 1e18).toFixed(4) }"
  },
  "actions": [
    {
      "type": "query",
      "label": "Check",
      "auto": true,
      "abi": "function balanceOf(address) view returns (uint256)",
      "address": "0xToken...",
      "func": "balanceOf",
      "args": ["address:{{USER_WALLET}}"]
    }
  ],
  "messages": {
    "success": "Your balance: {{FORMATTED}} tokens"
  }
}
```

### NFT Mint & Display

```json
{
  "protocol": "warp:3.0.0",
  "name": "NFT: Mint",
  "title": "Mint NFT",
  "description": "Mint a new NFT.",
  "output": {
    "TOKEN_ID": "event.Transfer.3"
  },
  "actions": [
    {
      "type": "contract",
      "label": "Mint",
      "abi": "function mint()",
      "address": "0xNFTContract...",
      "func": "mint",
      "gasLimit": 200000
    }
  ],
  "next": "view-nft?id={{TOKEN_ID}}",
  "messages": {
    "success": "Minted NFT #{{TOKEN_ID}}!"
  }
}
```

### API Response Processing

```json
{
  "protocol": "warp:3.0.0",
  "name": "API: User Lookup",
  "title": "Find User",
  "description": "Look up user information.",
  "output": {
    "USER_ID": "out.data.id",
    "USER_NAME": "out.data.profile.name",
    "USER_EMAIL": "out.data.profile.email",
    "CREATED": "out.data.created_at"
  },
  "actions": [
    {
      "type": "collect",
      "label": "Search",
      "destination": {
        "url": "https://api.example.com/users/search",
        "method": "GET"
      },
      "inputs": [
        {
          "name": "Username",
          "as": "q",
          "type": "string",
          "source": "field"
        }
      ]
    }
  ],
  "messages": {
    "success": "Found: {{USER_NAME}} ({{USER_EMAIL}})"
  }
}
```

## Order of Resolution

1. Input values collected
2. Variables interpolated
3. Action executed
4. Output paths resolved (in order)
5. Transforms computed (in order)
6. Messages populated
7. Next URL constructed
