# Messages

Messages provide user-facing feedback after Warp execution.

## Structure

```json
{
  "messages": {
    "success": "Operation completed!",
    "error": "Something went wrong.",
    "custom_key": "Custom message"
  }
}
```

## Reserved Keys

| Key | Purpose |
|-----|---------|
| `success` | Shown on successful execution |
| `error` | Shown on failed execution |
| `bot` | AI-only message (hidden from users) |

## Variable Interpolation

Use `{{variable}}` to insert dynamic values:

```json
{
  "output": {
    "TX_HASH": "out.hash",
    "AMOUNT": "out.1"
  },
  "messages": {
    "success": "Sent {{AMOUNT}} tokens! View TX: {{TX_HASH}}"
  }
}
```

### Available Variables

- Output results (`{{RESULT_NAME}}`)
- Input values (`{{inputAs}}`)
- Root variables (`{{varName}}`)
- Globals (`{{USER_WALLET}}`, `{{CHAIN_EXPLORER}}`)

## Localized Messages

```json
{
  "messages": {
    "success": {
      "en": "Transaction successful!",
      "de": "Transaktion erfolgreich!",
      "es": "¡Transacción exitosa!"
    },
    "error": {
      "en": "Transaction failed.",
      "de": "Transaktion fehlgeschlagen.",
      "es": "Transacción fallida."
    }
  }
}
```

## Examples

### Basic Messages

```json
{
  "messages": {
    "success": "Your tokens have been staked!",
    "error": "Failed to stake. Check your balance."
  }
}
```

### Dynamic Success Message

```json
{
  "output": {
    "STAKED_AMOUNT": "out.1",
    "APY": "out.2"
  },
  "messages": {
    "success": "Staked {{STAKED_AMOUNT}} tokens at {{APY}}% APY!"
  }
}
```

### With Explorer Link

```json
{
  "output": {
    "TX_HASH": "out.hash"
  },
  "messages": {
    "success": "Transaction confirmed! View on explorer: {{CHAIN_EXPLORER}}/tx/{{TX_HASH}}"
  }
}
```

### AI Bot Message

```json
{
  "messages": {
    "success": "Transfer complete!",
    "bot": "The transfer was successful. Ask if the user wants to make another transfer or check their balance."
  }
}
```

### Complete Example

```json
{
  "protocol": "warp:3.0.0",
  "name": "DeFi: Stake",
  "title": "Stake Tokens",
  "description": "Stake your tokens to earn rewards.",
  "output": {
    "STAKE_ID": "event.Staked.1",
    "AMOUNT": "event.Staked.2",
    "APY": "out.currentAPY"
  },
  "actions": [
    {
      "type": "contract",
      "label": "Stake",
      "address": "0xStaking...",
      "func": "stake",
      "gasLimit": 200000,
      "inputs": [
        {
          "name": "Amount",
          "as": "stakeAmount",
          "type": "uint256",
          "position": "arg:1",
          "source": "field",
          "required": true,
          "modifier": "scale:18"
        }
      ]
    }
  ],
  "messages": {
    "success": "🎉 Staked {{stakeAmount}} tokens!\n\nStake ID: {{STAKE_ID}}\nCurrent APY: {{APY}}%\n\nYour rewards will start accruing immediately.",
    "error": "❌ Staking failed.\n\nPossible reasons:\n- Insufficient balance\n- Not enough gas\n- Contract paused\n\nPlease try again.",
    "bot": "The staking was successful. The user's position is now active. Offer to show staking dashboard or stake more."
  }
}
```

### Conditional Content in Messages

Use computed output for conditional display:

```json
{
  "output": {
    "BALANCE": "out.1",
    "STATUS": "transform:() => { return result.BALANCE > 0 ? '✅ Active' : '⚠️ Empty' }"
  },
  "messages": {
    "success": "Balance check complete!\n\nStatus: {{STATUS}}\nBalance: {{BALANCE}}"
  }
}
```

## Best Practices

1. **Keep messages concise**: Users scan, not read
2. **Include relevant data**: TX hash, amounts, IDs
3. **Use emojis sparingly**: 1-2 per message
4. **Provide next steps**: What can user do now?
5. **Helpful error messages**: Explain what went wrong and how to fix
6. **Test all languages**: If using i18n
