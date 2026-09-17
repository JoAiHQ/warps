import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AppContext } from '../../lib/components/App'
import { DetailResult } from './DetailResult'
import { StatsResult } from './StatsResult'

const renderWithApp = (ui: React.ReactNode) =>
  render(
    <AppContext.Provider value={{ copyToClipboard: vi.fn() } as any}>
      {ui}
    </AppContext.Provider>,
  )

describe('StatsResult', () => {
  it('renders metric cards and hides empty values', () => {
    renderWithApp(
      <StatsResult
        title="Campaign stats"
        metrics={[
          { label: 'Total', value: 12 },
          { label: 'Drafts', value: 3 },
          { label: 'Hidden', value: null },
        ]}
      />,
    )

    expect(screen.getByText('Campaign stats')).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('Drafts')).toBeInTheDocument()
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })
})

describe('DetailResult', () => {
  it('renders primary, secondary, and detail rows', () => {
    renderWithApp(
      <DetailResult
        title="Project"
        emptyText="No project found."
        record={{ name: 'Launch film', status: 'ready', outputPreset: 'vertical', brief: 'A short launch clip' }}
        primaryKey="name"
        secondaryKey="status"
        detailKeys={['outputPreset', 'brief']}
      />,
    )

    expect(screen.getByText('Project')).toBeInTheDocument()
    expect(screen.getByText('Launch film')).toBeInTheDocument()
    expect(screen.getByText('ready')).toBeInTheDocument()
    expect(screen.getByText('Output preset')).toBeInTheDocument()
    expect(screen.getByText('vertical')).toBeInTheDocument()
    expect(screen.getByText('A short launch clip')).toBeInTheDocument()
  })

  it('shows empty state when record is missing', () => {
    renderWithApp(<DetailResult title="Project" emptyText="No project found." record={null} />)
    expect(screen.getByText('No project found.')).toBeInTheDocument()
  })
})
