# 🌌 Warps

**Warps** is an open-source protocol for defining executable actions that bridge AI agents to any application, API, or blockchain. It turns conversations into real-world execution across web services and decentralized networks.

### 🚀 What are Warps?

A Warp is a declarative JSON object that describes a "skill" for an AI agent. Instead of writing custom integration code for every API, chain, or wallet, you define:

- **Action Protocol**: Standardized format for REST API requests, smart contract calls, and asset transfers.
- **Dynamic Input Collection**: How the AI should prompt the user or extract data from context.
- **Universal Execution**: Support for standard Web2 APIs alongside Ethereum, Solana, Sui, MultiversX, Base, and other chains.
- **Agent Native**: Designed to be natively understood by LLMs like GPT-4, Claude 3.5, and specialized JoAi agents.

### 🔌 Dynamic MCP

Warps are designed to serve as the portable schema for **Model Context Protocol (MCP)** tools.

By standardizing the definition of actions, inputs, and outputs in JSON, Warps allow generic runners to dynamically expose your API to AI agents. You define the interface once, and it becomes compatible with the entire MCP ecosystem.

## 🛠️ Developer Guide

This repository is the central registry for Warp definitions. Developers are invited to contribute new Warps to expand the capabilities of the ecosystem.

### 🎨 Developing ChatApps

Each Warp can have an associated **ChatApp** that provides a rich, interactive experience within the chat interface. These are built as standalone HTML files.

#### Location
Place your ChatApp source code (`index.tsx`, `styles.css`) directly alongside the `warp.json` in the specific warp directory:
`warps/<brand>/<warp-name>/`

#### Building ChatApps
To build all ChatApps in the repository:

```bash
npm install
npm run build
```

To build a specific app:

```bash
node ui/build.js <brand>/<warp-name>
# Example: node ui/build.js multiversx/account-info
```

The build process will:
1.  Compile the React code into a standalone HTML file (`chatapp.dist.html`).
2.  Update the `warp.json` file's `ui` field to point to the hosted version of this artifact.

#### ⚡ Development

To start a local development server for a specific ChatApp:

```bash
npm run dev <brand>/<warp-name>
# Example: npm run dev multiversx/account-info
```
This will start a Vite server at `http://localhost:5173` with Hot Module Replacement (HMR).

#### 🧪 Testing

To run tests for the ChatApps:

```bash
npm test
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

### 🌐 The JoAi Network

Contributing to this repository automatically plugs your integrations into the **JoAi Cloud**.

We handle the infrastructure so you can focus on the capabilities. Once your Warp is merged:
- **Hosted Dynamic MCP**: We provide the generic MCP server execution. Your Warps instantly become live tools that users can connect to (e.g., in Claude Desktop) without running their own servers.
- **No-Code Experience**: Users can use your tools with zero friction—no local setup or maintenance required.
- **Instant Deployment**: Your definitions and UIs are automatically hosted on our global CDN.
- **Universal Reach**: Your actions become instantly discoverable and executable by any agent in the JoAi ecosystem.

It's the fastest way to get your service into the hands of AI users.

### 📦 Contributing

1. **Fork** this repository.
2. **Add** your Warp JSON to the `warps/` directory.
3. **Include** any necessary ABIs in the `abis/` subdirectory and brand metadata in `brand.ts` within your warp's brand folder.
4. **Submit** a Pull Request.

Once merged, your Warp will be automatically indexed and deployed to the JoAi Managed Platform and other supported clients.

### 📚 Resources

- **Documentation**: [https://docs.joai.ai/warps](https://docs.joai.ai/warps)
- **Visual Editor**: [usewarp.to/create](https://usewarp.to/create)
- **Community**: [Telegram](https://telegram.usewarp.to)