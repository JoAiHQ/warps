# MCP Action

The `mcp` action type executes tools on Model Context Protocol (MCP) servers. This is a **v3 feature** for AI tool integrations.

## Basic Structure

```json
{
  "type": "mcp",
  "label": "Run Tool",
  "destination": {
    "url": "http://localhost:3000/sse",
    "tool": "my_tool"
  }
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"mcp"` |
| `label` | WarpText | ✅ | Button text |
| `description` | WarpText | ❌ | Additional context |
| `destination` | WarpMcpDestination | ❌ | MCP server config |
| `inputs` | WarpActionInput[] | ❌ | Tool arguments |
| `primary` | boolean | ❌ | Mark as primary action |
| `auto` | boolean | ❌ | Auto-execute |
| `next` | string | ❌ | Next Warp ID |
| `when` | string | ❌ | Conditional expression |

## Destination Configuration

```json
{
  "destination": {
    "url": "http://localhost:3000/sse",
    "tool": "tool_name",
    "headers": {
      "Authorization": "Bearer {{API_KEY}}"
    }
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | ✅ | MCP server SSE endpoint |
| `tool` | string | ✅ | Tool name to execute |
| `headers` | object | ❌ | HTTP headers for auth |

## Examples

### Simple Tool Call

```json
{
  "type": "mcp",
  "label": "Analyze Sentiment",
  "destination": {
    "url": "https://mcp.example.com/sse",
    "tool": "analyze_sentiment"
  },
  "inputs": [
    {
      "name": "Text",
      "as": "text",
      "type": "string",
      "source": "field",
      "required": true
    }
  ]
}
```

### JoAi MCP Server Integration

```json
{
  "protocol": "warp:3.0.0",
  "name": "AI: Execute Tool",
  "title": "Run JoAi Tool",
  "description": "Execute a tool on the JoAi MCP server.",
  "vars": {
    "MCP_URL": "https://mcp.joai.ai/sse",
    "MCP_TOKEN": "env:MCP_TOKEN"
  },
  "actions": [
    {
      "type": "mcp",
      "label": "Execute",
      "destination": {
        "url": "{{MCP_URL}}",
        "tool": "create_warp",
        "headers": {
          "Authorization": "Bearer {{MCP_TOKEN}}"
        }
      },
      "inputs": [
        {
          "name": "Warp Name",
          "as": "name",
          "type": "string",
          "source": "field",
          "required": true
        },
        {
          "name": "Description",
          "as": "description",
          "type": "string",
          "source": "field"
        }
      ]
    }
  ]
}
```

### Auto-Execute MCP Tool

```json
{
  "type": "mcp",
  "label": "Fetch Data",
  "auto": true,
  "destination": {
    "url": "https://mcp.example.com/sse",
    "tool": "get_market_data"
  },
  "inputs": [
    {
      "name": "Symbol",
      "as": "symbol",
      "type": "string",
      "source": "hidden",
      "default": "BTC"
    }
  ]
}
```

### Chained MCP Actions

```json
{
  "protocol": "warp:3.0.0",
  "name": "AI: Analyze and Act",
  "title": "Smart Analysis",
  "description": "Analyze data and take action.",
  "output": {
    "ANALYSIS": "out.result",
    "SHOULD_BUY": "out.recommendation"
  },
  "actions": [
    {
      "type": "mcp",
      "label": "Analyze",
      "auto": true,
      "destination": {
        "url": "https://mcp.example.com/sse",
        "tool": "analyze_market"
      },
      "inputs": [
        {
          "name": "Token",
          "as": "token",
          "type": "string",
          "source": "field",
          "required": true
        }
      ]
    },
    {
      "type": "link",
      "label": "View Analysis",
      "url": "https://app.example.com/analysis?result={{ANALYSIS}}",
      "when": "{{ANALYSIS}}"
    }
  ]
}
```

## MCP Protocol Overview

MCP (Model Context Protocol) is a standard for AI tool execution:

1. **SSE Connection**: Client connects to server via Server-Sent Events
2. **Tool Discovery**: Server advertises available tools
3. **Tool Execution**: Client sends tool call, server processes and streams results
4. **Response Handling**: Results are captured and available via output mapping

## Use Cases

- **AI-Powered Analysis**: Sentiment analysis, content generation
- **Data Processing**: Transform, aggregate, or enrich data
- **External API Orchestration**: Coordinate multiple API calls
- **Blockchain Analytics**: On-chain data analysis
- **Content Generation**: AI-generated text, images, code

## Combining with Other Actions

MCP actions work well in multi-step Warps:

```json
{
  "actions": [
    {
      "type": "mcp",
      "auto": true,
      "label": "Generate",
      "destination": { "url": "...", "tool": "generate_content" }
    },
    {
      "type": "collect",
      "label": "Save",
      "destination": { "url": "https://api.example.com/save", "method": "POST" }
    },
    {
      "type": "contract",
      "label": "Mint as NFT",
      "..."
    }
  ]
}
```
