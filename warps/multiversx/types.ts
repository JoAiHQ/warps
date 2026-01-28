// Account types
export type AccountData = {
  address: string
  balance: string
  nonce: number
  shard: number
}

export type AccountToolData = {
  ACCOUNT_DATA: AccountData
  BALANCE_FORMATTED: number
  NONCE: number
  USERNAME?: string
}

// Delegation types
export type UndelegatedItem = {
  amount: string
  seconds: number
}

export type Delegation = {
  address: string
  contract: string
  userUnBondable: string
  userActiveStake: string
  claimableRewards: string
  userUndelegatedList?: UndelegatedItem[]
}

export type DelegationData = {
  DELEGATIONS: Delegation[]
  TOTAL_STAKED: string
  TOTAL_STAKED_EGLD: number
  TOTAL_REWARDS: string
  TOTAL_REWARDS_EGLD: number
  PROVIDER_COUNT: number
}

// Claim rewards types
export type ClaimRewardsData = {
  TX_HASH: string
  PROVIDER: string
  REWARDS_CLAIMED: string
  REWARDS_CLAIMED_EGLD: number
}

export type ProviderClaim = {
  provider: string
  txHash: string
  rewardsClaimed: string
  rewardsClaimedEgld: number
}

export type ClaimAllRewardsData = {
  CLAIMS: ProviderClaim[]
  TOTAL_REWARDS_CLAIMED: string
  TOTAL_REWARDS_CLAIMED_EGLD: number
  PROVIDER_COUNT: number
}
