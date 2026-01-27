# Collect Action

The `collect` action type sends HTTP requests to external endpoints, useful for data collection, API integrations, and off-chain operations.

## Basic Structure

```json
{
  "type": "collect",
  "label": "Submit Form",
  "destination": {
    "url": "https://api.example.com/submit",
    "method": "POST"
  }
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"collect"` |
| `label` | WarpText | ✅ | Button text |
| `description` | WarpText | ❌ | Additional context |
| `destination` | object \| string | ❌ | HTTP destination config |
| `inputs` | WarpActionInput[] | ❌ | Data to collect and send |
| `primary` | boolean | ❌ | Mark as primary action |
| `auto` | boolean | ❌ | Auto-execute without user click |
| `next` | string | ❌ | Next Warp ID after execution |
| `when` | string | ❌ | Conditional expression |

## Destination Configuration

### Simple URL

```json
{
  "destination": "https://api.example.com/endpoint"
}
```

### Full Configuration

```json
{
  "destination": {
    "url": "https://api.example.com/endpoint",
    "method": "POST",
    "headers": {
      "Authorization": "Bearer {{API_KEY}}",
      "Content-Type": "application/json"
    }
  }
}
```

### HTTP Methods

- `GET` - Retrieve data (inputs as query params)
- `POST` - Submit data (inputs as JSON body)
- `PUT` - Update data
- `DELETE` - Delete data

## Examples

### Simple Data Collection

```json
{
  "type": "collect",
  "label": "Subscribe",
  "destination": {
    "url": "https://api.newsletter.com/subscribe",
    "method": "POST"
  },
  "inputs": [
    {
      "name": "Email",
      "as": "email",
      "type": "string",
      "source": "field",
      "required": true,
      "pattern": "^[^@]+@[^@]+\\.[^@]+$"
    }
  ]
}
```

### GET Request with Query Params

```json
{
  "type": "collect",
  "label": "Fetch Price",
  "auto": true,
  "destination": {
    "url": "https://api.coingecko.com/api/v3/simple/price?ids={{tokenId}}&vs_currencies=usd",
    "method": "GET"
  },
  "inputs": [
    {
      "name": "Token",
      "as": "tokenId",
      "type": "string",
      "source": "field",
      "default": "bitcoin"
    }
  ]
}
```

### Authenticated API Call

```json
{
  "protocol": "warp:3.0.0",
  "name": "Data: Submit Form",
  "title": "Contact Form",
  "description": "Submit your inquiry.",
  "vars": {
    "API_URL": "env:API_URL",
    "API_KEY": "env:API_KEY"
  },
  "actions": [
    {
      "type": "collect",
      "label": "Submit",
      "destination": {
        "url": "{{API_URL}}/contact",
        "method": "POST",
        "headers": {
          "Authorization": "Bearer {{API_KEY}}",
          "Content-Type": "application/json"
        }
      },
      "inputs": [
        {
          "name": "Name",
          "as": "name",
          "type": "string",
          "source": "field",
          "required": true
        },
        {
          "name": "Email",
          "as": "email",
          "type": "string",
          "source": "field",
          "required": true
        },
        {
          "name": "Message",
          "as": "message",
          "type": "string",
          "source": "field",
          "required": true
        }
      ]
    }
  ]
}
```

### Onboarding Flow

```json
{
  "protocol": "warp:3.0.0",
  "name": "JoAi: Onboarding",
  "title": "Welcome to JoAi",
  "description": "Tell us about yourself.",
  "bot": "Welcome the user and collect their information.",
  "vars": {
    "COLLECT_API_URL": "env:COLLECT_API_URL",
    "COLLECT_API_KEY": "env:COLLECT_API_KEY"
  },
  "actions": [
    {
      "type": "collect",
      "label": "Get Started",
      "destination": {
        "url": "{{COLLECT_API_URL}}",
        "method": "POST",
        "headers": {
          "Authorization": "Bearer {{COLLECT_API_KEY}}"
        }
      },
      "inputs": [
        {
          "name": "Your Name",
          "as": "userName",
          "bot": "The user's name for identification.",
          "type": "string",
          "source": "field",
          "required": true
        },
        {
          "name": "How did you find us?",
          "as": "source",
          "bot": "How they discovered the platform. Examples: Google, friend, Twitter.",
          "type": "string",
          "source": "field",
          "required": true
        },
        {
          "name": "Wallet Address",
          "as": "wallet",
          "type": "address",
          "source": "user:wallet"
        }
      ]
    }
  ],
  "messages": {
    "success": "Welcome aboard, {{userName}}!"
  }
}
```

### Output from API Response

```json
{
  "protocol": "warp:3.0.0",
  "name": "API: Fetch and Display",
  "title": "Get User Data",
  "description": "Fetch user information from API.",
  "output": {
    "USER_ID": "out.data.id",
    "USER_NAME": "out.data.name"
  },
  "actions": [
    {
      "type": "collect",
      "label": "Fetch",
      "auto": true,
      "destination": {
        "url": "https://api.example.com/user/{{USER_WALLET}}",
        "method": "GET"
      }
    }
  ],
  "messages": {
    "success": "Found user: {{USER_NAME}} (ID: {{USER_ID}})"
  }
}
```

## Security Notes

- Never hardcode secrets in Warps; use environment variables
- Use `env:VAR_NAME` syntax for sensitive values
- HTTPS is strongly recommended for all endpoints
- Consider CORS policies when integrating with browsers
