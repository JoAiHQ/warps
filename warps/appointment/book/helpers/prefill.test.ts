import { describe, it, expect } from 'vitest'
import { resolveBookingPrefill } from './prefill'

const policy = {
  timezone: 'Europe/Vienna',
  agent: { uuid: 'agent-1', name: 'Ingrid' },
  serviceSelectionEnabled: true,
}

describe('resolveBookingPrefill', () => {
  it('prefills a chosen slot and contact details', () => {
    const draft = resolveBookingPrefill(
      {
        scheduledAt: '2026-11-17T10:00:00+01:00',
        scheduledEndAt: '2026-11-17T10:30:00+01:00',
        agentUuid: 'agent-1',
        serviceSlug: 'beratung',
        attendeeName: 'Ada Lovelace',
        attendeeEmail: 'ada@example.com',
        purpose: 'Consultation',
        notes: 'First visit',
      },
      policy,
      [{ slug: 'beratung', name: 'Beratung', durationMinutes: 30 }],
    )

    expect(draft.step).toBe('contact')
    expect(draft.name).toBe('Ada Lovelace')
    expect(draft.email).toBe('ada@example.com')
    expect(draft.purpose).toBe('Consultation')
    expect(draft.notes).toBe('First visit')
    expect(draft.slot?.startAt).toBe('2026-11-17T10:00:00+01:00')
    expect(draft.service?.slug).toBe('beratung')
    expect(draft.agentUuid).toBe('agent-1')
    expect(draft.timezone).toBe('Europe/Vienna')
  })

  it('falls back to the policy agent for cross-team bookings', () => {
    const draft = resolveBookingPrefill({ teamSlug: 'salus-forma', scheduledAt: '2026-11-17T10:00:00+01:00' }, policy)
    expect(draft.agentUuid).toBe('agent-1')
    expect(draft.step).toBe('contact')
  })

  it('uses chat-provided slots without a scheduledAt', () => {
    const slots = [
      { startAt: '2026-11-17T09:00:00+01:00', endAt: '2026-11-17T09:30:00+01:00', agentUuid: 'agent-1', agentName: 'Ingrid' },
      { startAt: '2026-11-17T09:30:00+01:00', endAt: '2026-11-17T10:00:00+01:00', agentUuid: 'agent-1', agentName: 'Ingrid' },
    ]
    const draft = resolveBookingPrefill({ slots }, policy)
    expect(draft.step).toBe('datetime')
    expect(draft.slots).toHaveLength(2)
    expect(draft.date?.getDate()).toBe(17)
  })

  it('goes to the service picker when no service is chosen', () => {
    const draft = resolveBookingPrefill({ teamSlug: 'salus-forma' }, policy, [{ slug: 'beratung', name: 'Beratung' }])
    expect(draft.step).toBe('service')
  })
})
