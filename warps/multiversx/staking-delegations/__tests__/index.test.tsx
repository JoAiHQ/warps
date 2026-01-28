import { render, screen } from '@testing-library/react'
import { AppContext } from '../../../../ui/lib/components/App'
import { Main } from '../index'

const structuredDelegations = {
  DELEGATIONS: [
    {
      address: 'erd1testaddress',
      contract: 'erd1providerone',
      userUnBondable: '0',
      userActiveStake: '4000000000000000000',
      claimableRewards: '1064466452591972',
    },
    {
      address: 'erd1testaddress',
      contract: 'erd1providertwo',
      userUnBondable: '0',
      userActiveStake: '5000000000000000000',
      claimableRewards: '893495613628819',
    },
  ],
  TOTAL_STAKED: '9000000000000000000',
  TOTAL_STAKED_EGLD: 9,
  TOTAL_REWARDS: '1957962066220791',
  TOTAL_REWARDS_EGLD: 0.001957962066220791,
  PROVIDER_COUNT: 2,
}

const mockContext = {
  data: structuredDelegations,
  paymentRequired: false,
  executeTool: async () => ({}),
  executePrompt: async () => {},
  meta: undefined,
}

describe('staking delegations app', () => {
  it('renders when tool output is wrapped in structuredContent', () => {
    render(
      <AppContext.Provider value={mockContext}>
        <Main />
      </AppContext.Provider>
    )

    expect(screen.getByText('Your staked eGold')).toBeInTheDocument()
    expect(screen.getByText('2 providers')).toBeInTheDocument()
    expect(screen.getByText('Delegations')).toBeInTheDocument()
    expect(screen.getAllByText('Claim Rewards')).toHaveLength(2)
  })
})
