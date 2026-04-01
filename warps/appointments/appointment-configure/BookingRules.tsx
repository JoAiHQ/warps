import { Input } from '@openai/apps-sdk-ui/components/Input'
import React from 'react'
import { AppointmentPolicy } from './warp.types'

type Props = {
  policy: AppointmentPolicy
  onChange: (patch: Partial<AppointmentPolicy>) => void
}

export function BookingRules({ policy, onChange }: Props) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold text-secondary uppercase tracking-wide">Booking Rules</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-secondary">Slot interval (min)</label>
          <Input
            type="number"
            placeholder="30"
            value={policy.slotIntervalMinutes ?? ''}
            onChange={(e) => onChange({ slotIntervalMinutes: e.target.value ? Number(e.target.value) : null })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-secondary">Buffer after (min)</label>
          <Input
            type="number"
            placeholder="0"
            value={policy.bufferMinutes ?? ''}
            onChange={(e) => onChange({ bufferMinutes: e.target.value ? Number(e.target.value) : null })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-secondary">Min notice (min)</label>
          <Input
            type="number"
            placeholder="60"
            value={policy.minNoticeMinutes ?? ''}
            onChange={(e) => onChange({ minNoticeMinutes: e.target.value ? Number(e.target.value) : null })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-secondary">Max days ahead</label>
          <Input
            type="number"
            placeholder="60"
            value={policy.maxDaysAhead ?? ''}
            onChange={(e) => onChange({ maxDaysAhead: e.target.value ? Number(e.target.value) : null })}
          />
        </div>
      </div>
    </section>
  )
}
