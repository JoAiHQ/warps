# 🌌 Warps

**Warps** is an open-source protocol for defining executable actions that bridge AI agents to any application, API, or blockchain. It turns conversations into real-world execution across web services and decentralized networks.

### 🚀 What are Warps?

A Warp is a declarative JSON object that describes a "skill" for an AI agent. Instead of writing custom integration code for every API, chain, or wallet, you define:

- **Action Protocol**: Standardized format for REST API requests, smart contract calls, and asset transfers.
- **Dynamic Input Collection**: How the AI should prompt the user or extract data from context.
- **Universal Execution**: Support for standard Web2 APIs alongside Ethereum, Solana, Sui, MultiversX, Base, and other chains.
- **Agent Native**: Designed to be natively understood by LLMs like GPT-4, Claude 3.5, and specialized JoAi agents.

## 🛠️ Developer Guide

This repository is the central registry for Warp definitions. Developers are invited to contribute new Warps to expand the capabilities of the ecosystem.

### Repository Structure

```
warps/          # Warp JSON definitions organized by namespace
brands/         # Brand assets and metadata (colors, icons)
abis/           # Smart contract ABIs referenced by warps
skills/         # AI coding skills to help you generate warps
playground/     # Local utilities for validation and inspection
```

### 🏗️ Building a Warp

#### 1. Install AI Skills

We provide skills that teach your AI assistant (Cursor, Claude) how to write Warps for you:

```bash
npx skills add JoAiHQ/skills
```

#### 2. Generate with AI

Ask your assistant: _"Create a Warp that allows users to create a new issue on Linear."_

#### 3. Inspect Locally

Validate your warp definition using the playground:

```bash
node playground/inspect.js warps/my-project/my-action.json
```

### 📦 Contributing

1. **Fork** this repository.
2. **Add** your Warp JSON to the `warps/` directory.
3. **Include** any necessary ABIs in `abis/` and brand metadata in `brands/`.
4. **Submit** a Pull Request.

Once merged, your Warp will be automatically indexed and deployed to the JoAi Managed Platform and other supported clients.

### 📚 Resources

- **Documentation**: [https://docs.joai.ai/warps](https://docs.joai.ai/warps)
- **Visual Editor**: [usewarp.to/create](https://usewarp.to/create)
- **Community**: [Telegram](https://telegram.usewarp.to)
