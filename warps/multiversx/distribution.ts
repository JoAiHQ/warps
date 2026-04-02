import { createDefaultAppDistribution } from '../distribution'

export const distribution = createDefaultAppDistribution({
  install: {
    summary: 'Connect MultiversX to Claude, Codex, and ChatGPT. Check balances, view transactions, manage staking, and interact with ESDT tokens through natural language.',
    examplePrompts: [
      'What is the EGLD balance of erd1...?',
      'Show my staking delegations.',
      'View details for token WEGLD-bd4d79.',
    ],
  },
  review: {
    testPrompts: [
      'What is the balance of erd1qqqqqqqqqqqqqpgqhe8t5jewej70zupmh44jurgn29psua5l2jps3ntjj3?',
      'Show staking delegations for erd1qqqqqqqqqqqqqpgqhe8t5jewej70zupmh44jurgn29psua5l2jps3ntjj3.',
      'Get transaction details for a recent transaction hash.',
    ],
  },
})
