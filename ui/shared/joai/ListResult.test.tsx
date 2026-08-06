import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppContext } from '../../lib/components'
import { UseAppResult } from '../../lib/hooks/useApp'
import { ListResult, valueToString } from './ListResult'

function appValue(): UseAppResult<any, any> {
  return {
    data: {},
    inputs: {},
    config: {},
    paymentRequired: false,
    executeWarp: async () => {},
    executePrompt: async () => {},
    copyToClipboard: () => {},
    locale: 'en',
    t: (text: unknown) => (typeof text === 'string' ? text : ((text as Record<string, string>).en ?? '')),
  }
}

function renderWithApp(ui: React.ReactElement) {
  return render(<AppContext.Provider value={appValue()}>{ui}</AppContext.Provider>)
}

describe('ListResult', () => {
  it('renders items with primary and secondary keys', () => {
    renderWithApp(
      <ListResult
        title="Agents"
        emptyText="No agents found."
        items={[{ name: 'Alpha', uuid: 'abc-1' }, { name: 'Beta', uuid: 'abc-2' }]}
        primaryKey="name"
        secondaryKey="uuid"
        detailKeys={[]}
      />
    )
    expect(screen.getByText('Agents (2)')).toBeInTheDocument()
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
    expect(screen.getByText('abc-1')).toBeInTheDocument()
    expect(screen.queryByText('No agents found.')).not.toBeInTheDocument()
  })

  it('renders detail keys', () => {
    renderWithApp(
      <ListResult
        title="Contacts"
        emptyText="No contacts found."
        items={[{ name: 'Alpha', company: 'ACME', email: 'a@acme.test' }]}
        primaryKey="name"
        secondaryKey="company"
        detailKeys={['email']}
      />
    )
    expect(screen.getByText(/a@acme\.test/)).toBeInTheDocument()
  })

  it('renders the empty state only when there are no items', () => {
    const { rerender } = renderWithApp(
      <ListResult title="Agents" emptyText="No agents found." items={[]} />
    )
    expect(screen.getByText('No agents found.')).toBeInTheDocument()

    rerender(
      <AppContext.Provider value={appValue()}>
        <ListResult title="Agents" emptyText="No agents found." items={[{ name: 'Alpha' }]} />
      </AppContext.Provider>
    )
    expect(screen.queryByText('No agents found.')).not.toBeInTheDocument()
  })
})

describe('valueToString', () => {
  it('formats primitives, objects and undefined', () => {
    expect(valueToString('x')).toBe('x')
    expect(valueToString(0)).toBe('0')
    expect(valueToString({ a: 1 })).toBe('{"a":1}')
    expect(valueToString(null)).toBe('—')
    expect(valueToString(undefined)).toBe('—')
  })
})
