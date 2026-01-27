# Link Action

The `link` action type navigates to an external URL or another Warp.

## Basic Structure

```json
{
  "type": "link",
  "label": "Learn More",
  "url": "https://example.com"
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"link"` |
| `label` | WarpText | ✅ | Button text |
| `url` | string | ✅ | Target URL |
| `description` | WarpText | ❌ | Additional context |
| `inputs` | WarpActionInput[] | ❌ | Dynamic URL parameters |
| `primary` | boolean | ❌ | Mark as primary action |
| `auto` | boolean | ❌ | Auto-redirect |
| `when` | string | ❌ | Conditional expression |

## Examples

### Simple External Link

```json
{
  "type": "link",
  "label": "View Documentation",
  "url": "https://docs.joai.ai"
}
```

### Dynamic URL with Variables

```json
{
  "type": "link",
  "label": "View Transaction",
  "url": "https://explorer.multiversx.com/transactions/{{TX_HASH}}"
}
```

### Link with User Input

```json
{
  "type": "link",
  "label": "Search Token",
  "url": "https://explorer.multiversx.com/tokens/{{tokenId}}",
  "inputs": [
    {
      "name": "Token ID",
      "as": "tokenId",
      "type": "string",
      "source": "field",
      "required": true
    }
  ]
}
```

### Link to Another Warp

```json
{
  "type": "link",
  "label": "Continue to Staking",
  "url": "https://usewarp.to/stake-egld"
}
```

### Conditional Link

```json
{
  "type": "link",
  "label": "View on Explorer",
  "url": "{{CHAIN_EXPLORER}}/transactions/{{TX_HASH}}",
  "when": "{{TX_HASH}}"
}
```

### Hidden Input for Static Parameter

```json
{
  "type": "link",
  "label": "Open Item",
  "url": "https://app.example.com/items/{{itemId}}",
  "inputs": [
    {
      "name": "Item ID",
      "as": "itemId",
      "type": "string",
      "source": "hidden",
      "default": "item-123"
    }
  ]
}
```

### Multiple Links in Warp

```json
{
  "protocol": "warp:3.0.0",
  "name": "Info: Resources",
  "title": "Helpful Resources",
  "description": "Explore our documentation and community.",
  "actions": [
    {
      "type": "link",
      "label": "📚 Documentation",
      "url": "https://docs.joai.ai",
      "primary": true
    },
    {
      "type": "link",
      "label": "💬 Community",
      "url": "https://telegram.usewarp.to"
    },
    {
      "type": "link",
      "label": "🐙 GitHub",
      "url": "https://github.com/JoAiHQ"
    }
  ]
}
```

## URL Patterns

### Using Global Variables

```json
{
  "url": "{{CHAIN_EXPLORER}}/address/{{USER_WALLET}}"
}
```

Available globals:
- `{{USER_WALLET}}` - Connected wallet address
- `{{CHAIN_EXPLORER}}` - Chain's block explorer URL
- `{{CHAIN_API}}` - Chain's API URL

### Query Parameters

```json
{
  "url": "https://app.example.com/page?token={{tokenId}}&amount={{amount}}"
}
```

### Using Output Results

After a contract/query action:

```json
{
  "output": {
    "TX_HASH": "out.hash"
  },
  "actions": [
    { "type": "contract", "..." : "..." },
    {
      "type": "link",
      "label": "View Transaction",
      "url": "{{CHAIN_EXPLORER}}/transactions/{{TX_HASH}}"
    }
  ]
}
```

## Notes

- Links open in new tab/window by default
- Use `auto: true` for automatic redirects (use carefully)
- URL encoding is handled automatically for variables
