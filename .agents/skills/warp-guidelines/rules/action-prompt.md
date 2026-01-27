# Prompt Action

The `prompt` action type generates text using AI/LLM models. This is a **v3 feature** for AI-native workflows.

## Basic Structure

```json
{
  "type": "prompt",
  "label": "Generate",
  "prompt": "Write a story about {{topic}}."
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"prompt"` |
| `label` | WarpText | ✅ | Button text |
| `prompt` | string | ✅ | Prompt template |
| `description` | WarpText | ❌ | Additional context |
| `inputs` | WarpActionInput[] | ❌ | Variables for prompt |
| `primary` | boolean | ❌ | Mark as primary action |
| `auto` | boolean | ❌ | Auto-execute |
| `next` | string | ❌ | Next Warp ID |
| `when` | string | ❌ | Conditional expression |

## Examples

### Simple Text Generation

```json
{
  "type": "prompt",
  "label": "Generate Story",
  "prompt": "Write a short story about {{topic}} in a {{style}} style.",
  "inputs": [
    {
      "name": "Topic",
      "as": "topic",
      "type": "string",
      "source": "field",
      "required": true
    },
    {
      "name": "Style",
      "as": "style",
      "type": "string",
      "source": "field",
      "options": ["funny", "dramatic", "mysterious", "romantic"]
    }
  ]
}
```

### AI Writing Assistant

```json
{
  "protocol": "warp:3.0.0",
  "name": "AI: Email Writer",
  "title": "Write Professional Email",
  "description": "Generate a professional email based on your input.",
  "actions": [
    {
      "type": "prompt",
      "label": "Generate Email",
      "prompt": "Write a professional email with the following details:\n\nPurpose: {{purpose}}\nRecipient: {{recipient}}\nTone: {{tone}}\nKey Points: {{keyPoints}}\n\nGenerate a complete, ready-to-send email.",
      "inputs": [
        {
          "name": "Purpose",
          "as": "purpose",
          "type": "string",
          "source": "field",
          "required": true,
          "description": "What is this email about?"
        },
        {
          "name": "Recipient",
          "as": "recipient",
          "type": "string",
          "source": "field",
          "required": true,
          "description": "Who are you writing to?"
        },
        {
          "name": "Tone",
          "as": "tone",
          "type": "string",
          "source": "field",
          "options": {
            "formal": "Formal & Professional",
            "friendly": "Friendly & Warm",
            "urgent": "Urgent & Direct"
          },
          "default": "formal"
        },
        {
          "name": "Key Points",
          "as": "keyPoints",
          "type": "string",
          "source": "field",
          "description": "Main points to include"
        }
      ]
    }
  ]
}
```

### Code Generation

```json
{
  "type": "prompt",
  "label": "Generate Code",
  "prompt": "Write a {{language}} function that {{functionality}}. Include comments and error handling.",
  "inputs": [
    {
      "name": "Language",
      "as": "language",
      "type": "string",
      "source": "field",
      "options": ["TypeScript", "Python", "Rust", "Solidity"]
    },
    {
      "name": "What should it do?",
      "as": "functionality",
      "type": "string",
      "source": "field",
      "required": true
    }
  ]
}
```

### Blockchain-Aware Prompt

```json
{
  "protocol": "warp:3.0.0",
  "name": "AI: Token Analysis",
  "title": "Analyze Token",
  "description": "Get AI analysis of a token.",
  "actions": [
    {
      "type": "query",
      "label": "Fetch Data",
      "auto": true,
      "address": "0xToken...",
      "func": "getTokenInfo"
    },
    {
      "type": "prompt",
      "label": "Analyze",
      "prompt": "Analyze this token data and provide insights:\n\nName: {{TOKEN_NAME}}\nSupply: {{TOKEN_SUPPLY}}\nHolders: {{TOKEN_HOLDERS}}\n\nProvide a brief analysis covering:\n1. Token distribution\n2. Market observations\n3. Potential risks"
    }
  ],
  "output": {
    "TOKEN_NAME": "out.name",
    "TOKEN_SUPPLY": "out.totalSupply",
    "TOKEN_HOLDERS": "out.holderCount"
  }
}
```

### Chained Prompt with Action

```json
{
  "protocol": "warp:3.0.0",
  "name": "AI: Smart Contract Generator",
  "title": "Generate Smart Contract",
  "description": "AI generates a smart contract based on your requirements.",
  "output": {
    "CONTRACT_CODE": "out.code"
  },
  "actions": [
    {
      "type": "prompt",
      "label": "Generate Contract",
      "prompt": "Generate a Solidity smart contract for: {{requirements}}. Include all necessary functions and events.",
      "inputs": [
        {
          "name": "Requirements",
          "as": "requirements",
          "type": "string",
          "source": "field",
          "required": true,
          "description": "Describe what the contract should do"
        }
      ]
    },
    {
      "type": "collect",
      "label": "Save to Workspace",
      "destination": {
        "url": "https://api.example.com/contracts",
        "method": "POST"
      },
      "inputs": [
        {
          "name": "code",
          "type": "string",
          "source": "hidden",
          "default": "{{CONTRACT_CODE}}"
        }
      ]
    }
  ]
}
```

## Prompt Best Practices

### Be Specific

```json
// ❌ Too vague
"prompt": "Write something about {{topic}}"

// ✅ Specific
"prompt": "Write a 200-word blog introduction about {{topic}} targeting beginners. Use a friendly tone and include a hook in the first sentence."
```

### Use Structured Output

```json
"prompt": "Analyze {{data}} and respond with:\n1. Summary (2-3 sentences)\n2. Key findings (bullet points)\n3. Recommendation (1 sentence)"
```

### Provide Context

```json
"prompt": "You are a blockchain expert. Explain {{concept}} to a developer who is familiar with Web2 but new to Web3."
```

### Handle Missing Variables

```json
"prompt": "Generate content about {{topic}}{{#if style}} in a {{style}} style{{/if}}."
```

## Use Cases

- **Content Generation**: Blog posts, social media, emails
- **Code Generation**: Smart contracts, scripts, configs
- **Analysis**: Token analysis, market insights
- **Translation**: Multi-language content
- **Summarization**: Document and data summaries
- **Creative Writing**: Stories, descriptions, taglines
