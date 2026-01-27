# Contract Action

The `contract` action type executes smart contract functions on the blockchain.

## Basic Structure

```json
{
  "type": "contract",
  "label": "Execute",
  "address": "0xContractAddress...",
  "func": "functionName",
  "gasLimit": 100000
}
```

## Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | ✅ | Must be `"contract"` |
| `label` | WarpText | ✅ | Button text |
| `gasLimit` | number | ✅ | Gas limit for transaction |
| `description` | WarpText | ❌ | Additional context |
| `address` | string | ❌ | Contract address |
| `func` | string \| null | ❌ | Function name to call |
| `args` | string[] | ❌ | Fixed typed arguments |
| `value` | string | ❌ | Native token amount to send |
| `transfers` | string[] | ❌ | Token transfers with call |
| `abi` | string | ❌ | Function ABI signature |
| `inputs` | WarpActionInput[] | ❌ | User inputs |
| `primary` | boolean | ❌ | Mark as primary action |
| `auto` | boolean | ❌ | Auto-execute without user click |
| `next` | string | ❌ | Next Warp ID after execution |
| `when` | string | ❌ | Conditional expression |

## Input Positions for Contract

- `arg:1`, `arg:2`, ... `arg:10` - Function arguments
- `value` - Native token amount to send
- `transfer` - Token to transfer with call
- `chain` - Target blockchain

## Argument Types

Arguments in `args` and input `type` use typed format:

```
type:value
```

### Base Types

| Type | Description | Example |
|------|-------------|---------|
| `string` | Text string | `string:hello` |
| `uint8` | 8-bit unsigned | `uint8:255` |
| `uint16` | 16-bit unsigned | `uint16:65535` |
| `uint32` | 32-bit unsigned | `uint32:4294967295` |
| `uint64` | 64-bit unsigned | `uint64:123456789` |
| `uint128` | 128-bit unsigned | `uint128:...` |
| `uint256` | 256-bit unsigned | `uint256:1000000` |
| `biguint` | Arbitrary size | `biguint:123...` |
| `bool` | Boolean | `bool:true` |
| `address` | Blockchain address | `address:0x...` |
| `hex` | Hex encoded | `hex:1234abcd` |
| `token` | Token identifier | `token:USDC-c76f1f` |

### Nested Types

```
// Option (nullable)
option:string:hello
option:string

// List
list:string:a,b,c
list:uint64:1,2,3

// Variadic (variable arguments)
variadic:uint64:1,2,3

// Composite
composite(string|uint64):hello|123
```

## Examples

### ERC20 Approve

```json
{
  "type": "contract",
  "label": "Approve USDC",
  "abi": "function approve(address spender, uint256 amount)",
  "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "func": "approve",
  "gasLimit": 60000,
  "args": [
    "address:0xSpenderAddress...",
    "uint256:115792089237316195423570985008687907853269984665640564039457584007913129639935"
  ]
}
```

### Swap with User Input

```json
{
  "type": "contract",
  "label": "Swap Tokens",
  "abi": "function swap(address tokenIn, address tokenOut, uint256 amountIn)",
  "address": "0xRouterAddress...",
  "func": "swap",
  "gasLimit": 300000,
  "inputs": [
    {
      "name": "Token In",
      "type": "address",
      "position": "arg:1",
      "source": "field",
      "required": true
    },
    {
      "name": "Token Out",
      "type": "address",
      "position": "arg:2",
      "source": "field",
      "required": true
    },
    {
      "name": "Amount",
      "type": "uint256",
      "position": "arg:3",
      "source": "field",
      "required": true,
      "modifier": "scale:18"
    }
  ]
}
```

### Payable Function (Send Value)

```json
{
  "type": "contract",
  "label": "Stake ETH",
  "abi": "function stake()",
  "address": "0xStakingContract...",
  "func": "stake",
  "gasLimit": 150000,
  "inputs": [
    {
      "name": "ETH Amount",
      "type": "biguint",
      "position": "value",
      "source": "field",
      "required": true,
      "modifier": "scale:18"
    }
  ]
}
```

### MultiversX Smart Contract

```json
{
  "type": "contract",
  "label": "Delegate EGLD",
  "chain": "multiversx",
  "address": "erd1qqqqqqqqqqqqqpgqxwakt2g7u9atsnr03gqcgmhcv38pt7mkd94q6shuwt",
  "func": "delegate",
  "gasLimit": 12000000,
  "inputs": [
    {
      "name": "Amount",
      "type": "biguint",
      "position": "value",
      "source": "field",
      "required": true,
      "modifier": "scale:18"
    }
  ]
}
```

### Mixed Args and Inputs

```json
{
  "type": "contract",
  "label": "Register User",
  "abi": "function register(string name, uint256 age, address referrer)",
  "address": "0xContract...",
  "func": "register",
  "gasLimit": 100000,
  "args": [
    "string:{{userName}}",
    "uint256:{{userAge}}",
    "address:0xDefaultReferrer..."
  ],
  "inputs": [
    {
      "name": "Your Name",
      "as": "userName",
      "type": "string",
      "source": "field",
      "required": true
    },
    {
      "name": "Your Age",
      "as": "userAge",
      "type": "uint256",
      "source": "field",
      "required": true
    }
  ]
}
```

### With Token Transfer (MultiversX)

```json
{
  "type": "contract",
  "label": "Add Liquidity",
  "chain": "multiversx",
  "address": "erd1qqqqqqqqqqqqqpgq...",
  "func": "addLiquidity",
  "gasLimit": 20000000,
  "transfers": ["USDC-c76f1f|0|1000000"],
  "args": ["biguint:900000"]
}
```

## Gas Limit Guidelines

| Operation Type | Suggested Gas Limit |
|---------------|---------------------|
| Simple transfer | 21000 - 50000 |
| Token approval | 50000 - 80000 |
| Simple contract call | 100000 - 200000 |
| Swap | 200000 - 400000 |
| Complex DeFi | 500000+ |
| MultiversX calls | 6000000 - 60000000 |
