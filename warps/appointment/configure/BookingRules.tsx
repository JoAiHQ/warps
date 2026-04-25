import { Input } from '@openai/apps-sdk-ui/components/Input'
import { Switch } from '@openai/apps-sdk-ui/components/Switch'
import React from 'react'
import { useTranslations } from '../../../ui/lib/hooks'
import { translations } from '../i18n'
import { AppointmentPolicy } from './warp.types'

type Props = {
  policy: AppointmentPolicy
  onChange: (patch: Partial<AppointmentPolicy>) => void
}

export function BookingRules({ policy, onChange }: Props) {
  const tr = useTranslations(translations).configure

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold text-secondary uppercase tracking-wide">{tr.bookingRules}</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-secondary">{tr.fields.slotInterval}</label>
          <Input
            type="number"
            placeholder="30"
            value={policy.slotIntervalMinutes ?? ''}
            onChange={(e) => onChange({ slotIntervalMinutes: e.target.value ? Number(e.target.value) : null })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-secondary">{tr.fields.bufferAfter}</label>
          <Input
            type="number"
            placeholder="0"
            value={policy.bufferMinutes ?? ''}
            onChange={(e) => onChange({ bufferMinutes: e.target.value ? Number(e.target.value) : null })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-secondary">{tr.fields.minNotice}</label>
          <Input
            type="number"
            placeholder="60"
            value={policy.minNoticeMinutes ?? ''}
            onChange={(e) => onChange({ minNoticeMinutes: e.target.value ? Number(e.target.value) : null })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-secondary">{tr.fields.maxDaysAhead}</label>
          <Input
            type="number"
            placeholder="60"
            value={policy.maxDaysAhead ?? ''}
            onChange={(e) => onChange({ maxDaysAhead: e.target.value ? Number(e.target.value) : null })}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <label className="text-xs text-secondary">{tr.fields.conferenceEnabled}</label>
        <Switch
          checked={policy.conferenceEnabled ?? true}
          onCheckedChange={(checked) => onChange({ conferenceEnabled: checked })}
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="text-xs text-secondary">{tr.fields.serviceSelectionEnabled}</label>
        <Switch
          checked={policy.serviceSelectionEnabled ?? true}
          onCheckedChange={(checked) => onChange({ serviceSelectionEnabled: checked })}
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="text-xs text-secondary">{tr.fields.marketplacePaymentEnabled}</label>
        <Switch
          checked={policy.marketplacePaymentEnabled ?? false}
          onCheckedChange={(checked) => onChange({ marketplacePaymentEnabled: checked })}
        />
      </div>
    </section>
  )
}
