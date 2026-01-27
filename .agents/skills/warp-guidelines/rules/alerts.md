# Alerts

Alerts trigger notifications based on Warp execution events. This is a **v3 feature**.

## Alert Structure

```json
{
  "alerts": {
    "alert_id": {
      "label": "Alert Name",
      "trigger": "on_success",
      "subject": "Notification Subject",
      "body": "Notification body with {{variables}}",
      "action": "optional-warp-id"
    }
  }
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | WarpText | ✅ | Internal label |
| `trigger` | string | ✅ | When to fire |
| `subject` | WarpText | ✅ | Notification subject |
| `body` | WarpText | ✅ | Notification body |
| `action` | string | ❌ | Warp ID to link |

## Trigger Types

| Trigger | Description |
|---------|-------------|
| `on_success` | After successful execution |
| `on_failure` | After failed execution |
| `on_complete` | After any completion |

## Examples

### Success Notification

```json
{
  "alerts": {
    "payment_sent": {
      "label": "Payment Sent",
      "trigger": "on_success",
      "subject": "Payment Confirmed",
      "body": "You sent {{amount}} to {{recipient}}"
    }
  }
}
```

### Error Notification

```json
{
  "alerts": {
    "tx_failed": {
      "label": "Transaction Failed",
      "trigger": "on_failure",
      "subject": "Transaction Error",
      "body": "Your transaction failed. Please check your balance and try again."
    }
  }
}
```

### Alert with Action Link

```json
{
  "alerts": {
    "stake_complete": {
      "label": "Staking Complete",
      "trigger": "on_success",
      "subject": "EGLD Staked Successfully",
      "body": "{{amount}} EGLD is now earning rewards",
      "action": "view-staking-dashboard"
    }
  }
}
```

### Multiple Alerts

```json
{
  "alerts": {
    "success_alert": {
      "label": "Success",
      "trigger": "on_success",
      "subject": "Operation Complete",
      "body": "Your operation was successful!"
    },
    "failure_alert": {
      "label": "Failure",
      "trigger": "on_failure",
      "subject": "Operation Failed",
      "body": "Something went wrong. Error: {{error}}"
    }
  }
}
```

### Localized Alerts

```json
{
  "alerts": {
    "transfer_done": {
      "label": "Transfer Complete",
      "trigger": "on_success",
      "subject": {
        "en": "Transfer Successful",
        "de": "Überweisung erfolgreich",
        "es": "Transferencia exitosa"
      },
      "body": {
        "en": "You sent {{amount}} to {{recipient}}",
        "de": "Sie haben {{amount}} an {{recipient}} gesendet",
        "es": "Enviaste {{amount}} a {{recipient}}"
      }
    }
  }
}
```

## Complete Example

```json
{
  "protocol": "warp:3.0.0",
  "name": "Payment: Send USDC",
  "title": "Send USDC",
  "description": "Send USDC to any address.",
  "output": {
    "TX_HASH": "out.hash"
  },
  "actions": [
    {
      "type": "contract",
      "label": "Send",
      "abi": "function transfer(address to, uint256 amount)",
      "address": "0xUSDC...",
      "func": "transfer",
      "gasLimit": 60000,
      "inputs": [
        {
          "name": "Recipient",
          "as": "recipient",
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
  "alerts": {
    "payment_sent": {
      "label": "Payment Notification",
      "trigger": "on_success",
      "subject": "💸 Payment Sent",
      "body": "You sent {{amount}} USDC to {{recipient}}. TX: {{TX_HASH}}"
    },
    "payment_failed": {
      "label": "Payment Error",
      "trigger": "on_failure",
      "subject": "❌ Payment Failed",
      "body": "Failed to send {{amount}} USDC. Please check your balance."
    }
  },
  "messages": {
    "success": "Payment sent! Check your notifications."
  }
}
```

## Client Implementation

Clients should:

1. Subscribe to Warp execution events
2. Evaluate trigger conditions
3. Display notifications (push, in-app, etc.)
4. Handle action clicks to navigate to linked Warps

## Use Cases

- Transaction confirmations
- Error reporting
- Status updates
- Follow-up action reminders
- Cross-platform notifications
