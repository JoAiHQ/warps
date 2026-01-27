# Warp Chaining

The `next` field links Warps together, enabling multi-step flows and workflows.

## Basic Usage

### Root-Level Next

Applies after the entire Warp completes:

```json
{
  "protocol": "warp:3.0.0",
  "name": "Step: One",
  "title": "Step 1",
  "next": "step-two",
  "actions": [...]
}
```

### Action-Level Next

Specific to one action:

```json
{
  "actions": [
    {
      "type": "contract",
      "label": "Execute",
      "next": "confirmation-warp"
    }
  ]
}
```

Action-level `next` overrides root-level.

## Destination Types

### Warp ID (Alias)

```json
{
  "next": "my-next-warp"
}
```

### Warp Hash

```json
{
  "next": "hash:d08a405f6d11b5506889bf6cd822fec2a8ef826c170fd1920ff5241f3883adb9"
}
```

### External URL

```json
{
  "next": "https://app.example.com/success"
}
```

## Passing Data

Use output results as query parameters:

```json
{
  "output": {
    "TX_HASH": "out.hash",
    "AMOUNT": "out.1"
  },
  "next": "receipt?tx={{TX_HASH}}&amount={{AMOUNT}}"
}
```

### In the Next Warp

```json
{
  "vars": {
    "TX_HASH": "query:tx",
    "AMOUNT": "query:amount"
  },
  "title": "Receipt for {{AMOUNT}}",
  "description": "Transaction: {{TX_HASH}}"
}
```

## Chaining Patterns

### Linear Flow

```
Warp A -> Warp B -> Warp C
```

```json
// Warp A
{ "next": "warp-b" }

// Warp B
{ "next": "warp-c" }

// Warp C
{ "next": null }
```

### Conditional Flow

```json
{
  "output": {
    "STATUS": "out.1"
  },
  "actions": [
    {
      "type": "query",
      "label": "Check Status"
    },
    {
      "type": "link",
      "label": "View Success",
      "url": "https://usewarp.to/success-warp",
      "when": "{{STATUS}} === 'approved'"
    },
    {
      "type": "link",
      "label": "View Pending",
      "url": "https://usewarp.to/pending-warp",
      "when": "{{STATUS}} === 'pending'"
    }
  ]
}
```

### Multi-Step Registration

```json
// Step 1: Collect Info
{
  "name": "Register: Step 1",
  "title": "Registration - Personal Info",
  "next": "register-step-2?name={{userName}}",
  "actions": [
    {
      "type": "collect",
      "label": "Continue",
      "inputs": [
        {
          "name": "Name",
          "as": "userName",
          "type": "string",
          "source": "field",
          "required": true
        }
      ]
    }
  ]
}

// Step 2: Connect Wallet
{
  "name": "Register: Step 2",
  "title": "Registration - Connect Wallet",
  "vars": {
    "userName": "query:name"
  },
  "next": "register-complete?name={{userName}}&wallet={{USER_WALLET}}",
  "actions": [
    {
      "type": "transfer",
      "label": "Verify Wallet",
      "address": "{{CONTRACT_ADDRESS}}",
      "value": "0"
    }
  ]
}
```

### Transaction + Confirmation

```json
{
  "name": "Token: Swap",
  "title": "Swap Tokens",
  "output": {
    "TX_HASH": "out.hash",
    "AMOUNT_OUT": "event.Swap.3"
  },
  "next": "swap-complete?tx={{TX_HASH}}&received={{AMOUNT_OUT}}",
  "actions": [
    {
      "type": "contract",
      "label": "Swap",
      "..."
    }
  ]
}
```

## Error Handling

`next` only triggers on success. Use `alerts` for error handling:

```json
{
  "next": "success-warp",
  "alerts": {
    "on_error": {
      "label": "Error",
      "trigger": "on_failure",
      "subject": "Transaction Failed",
      "body": "Please try again.",
      "action": "retry-warp"
    }
  }
}
```

## Best Practices

1. **Keep chains short**: 2-4 steps max
2. **Pass minimal data**: Only what's needed
3. **URL encode parameters**: Automatically handled by SDK
4. **Handle edge cases**: What if user abandons mid-flow?
5. **Provide escape routes**: Don't trap users in flows
6. **Test the full chain**: End-to-end testing

## Complete Example

```json
{
  "protocol": "warp:3.0.0",
  "name": "Raffle: Create",
  "title": "Create Raffle",
  "description": "Create a new raffle.",
  "chain": "multiversx",
  "output": {
    "RAFFLE_ID": "event.RaffleCreated.1"
  },
  "next": "raffle-fund?id={{RAFFLE_ID}}",
  "actions": [
    {
      "type": "contract",
      "label": "Create Raffle",
      "address": "erd1qqqqqqqqqqqqqpgq...",
      "func": "createRaffle",
      "gasLimit": 20000000,
      "inputs": [
        {
          "name": "Name",
          "as": "raffleName",
          "type": "string",
          "position": "arg:1",
          "source": "field",
          "required": true
        },
        {
          "name": "Duration (days)",
          "type": "uint64",
          "position": "arg:2",
          "source": "field",
          "default": "7",
          "options": ["1", "3", "7", "14", "30"]
        }
      ]
    }
  ],
  "messages": {
    "success": "Raffle #{{RAFFLE_ID}} created! Redirecting to funding..."
  }
}
```
