---
name: warp-guidelines
description: Complete guide for creating valid Warp JSON definitions for the Warp Protocol
metadata:
  tags: warps, blockchain, web3, transactions, smart-contracts, ai
  version: 3.0.0
---

# Warp Protocol

This skill enables creating **Warp JSON** definitions. A Warp is a declarative JSON object that defines executable blockchain actions, smart contract interactions, data collection, and AI tool integrations.

## When to Use

Use this skill when:
- Creating new Warp definitions
- Modifying existing Warps
- Building blockchain transaction UIs
- Integrating smart contracts with AI agents
- Working with the JoAi or usewarp.to platforms

## How to Use

Read the rule files for detailed explanations and examples:

### Core Concepts
- [rules/core-structure.md](rules/core-structure.md) - Root Warp JSON structure and required fields
- [rules/inputs.md](rules/inputs.md) - Input types, sources, positions, and validation
- [rules/variables.md](rules/variables.md) - Variables, interpolation, and global values
- [rules/chains.md](rules/chains.md) - Multi-chain support and chain configuration

### Action Types
- [rules/action-transfer.md](rules/action-transfer.md) - Transfer tokens and native currency
- [rules/action-contract.md](rules/action-contract.md) - Execute smart contract functions
- [rules/action-query.md](rules/action-query.md) - Query contract state (read-only)
- [rules/action-collect.md](rules/action-collect.md) - Collect data via HTTP requests
- [rules/action-link.md](rules/action-link.md) - Navigate to external URLs
- [rules/action-mcp.md](rules/action-mcp.md) - Execute MCP (Model Context Protocol) tools
- [rules/action-prompt.md](rules/action-prompt.md) - Generate text using AI prompts

### Advanced Features
- [rules/output.md](rules/output.md) - Extract and transform execution results
- [rules/messages.md](rules/messages.md) - Custom success and error messages
- [rules/chaining.md](rules/chaining.md) - Link Warps together with next steps
- [rules/alerts.md](rules/alerts.md) - Trigger notifications based on conditions
- [rules/i18n.md](rules/i18n.md) - Internationalization and localized text

## Quick Reference

### Minimal Warp Structure

```json
{
  "protocol": "warp:3.0.0",
  "name": "Category: Name",
  "title": "User-Facing Title",
  "description": "Brief description of what this Warp does.",
  "actions": [
    {
      "type": "transfer",
      "label": "Send"
    }
  ]
}
```

### Supported Action Types

| Type | Purpose | Required Fields |
|------|---------|-----------------|
| `transfer` | Send tokens/currency | label |
| `contract` | Call smart contract | label, gasLimit |
| `query` | Read contract state | label |
| `collect` | HTTP data collection | label |
| `link` | Navigate to URL | label, url |
| `mcp` | MCP tool execution | label |
| `prompt` | AI text generation | label, prompt |

### Supported Chains

`multiversx`, `vibechain`, `sui`, `ethereum`, `base`, `arbitrum`, `polygon`, `somnia`, `fastset`, `solana`, `near`

## Validation Checklist

Before finalizing a Warp:

1. ✅ Protocol is `"warp:3.0.0"`
2. ✅ Action `type` matches user intent
3. ✅ All `{{variables}}` have corresponding inputs with `as` field
4. ✅ Input `type` fields are explicit (`string`, `uint256`, `address`)
5. ✅ Contract actions have `abi` signature and `gasLimit`
6. ✅ Required inputs are marked with `required: true`
