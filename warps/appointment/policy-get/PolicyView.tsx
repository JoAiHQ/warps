import { Button } from '@openai/apps-sdk-ui/components/Button'
import React from 'react'
import { useAppContext } from '../../../ui/lib/components'
import { useTranslations } from '../../../ui/lib/hooks'
import { translations } from '../i18n'
import {
  formatCapacity,
  formatDateList,
  formatFlag,
  formatMinutes,
  groupOpeningHours,
} from './helpers'
import type { AppointmentPolicyView, PolicySync } from './types'

type Props = {
  policy: AppointmentPolicyView
}

type Row = {
  label: string
  value: string
}

type PolicyGetCopy = (typeof translations)['en']['policyGet']

export function PolicyView({ policy }: Props) {
  const { executeWarp } = useAppContext()
  const tr = useTranslations(translations).policyGet
  const dayLabels = useTranslations(translations).configure.days
  const isActive = policy.active !== false
  const openingHours = groupOpeningHours(policy.availability, dayLabels)
  const capacity = formatCapacity(policy.bookingCapacity, policy.bookingCapacityUnit, tr.fields.capacityUnits)
  const agentName = policy.agent?.name?.trim() || null

  const ruleRows = ([
    { label: tr.fields.slotInterval, value: formatMinutes(policy.slotIntervalMinutes, tr.fields.minutesUnit) },
    { label: tr.fields.bufferAfter, value: formatMinutes(policy.bufferMinutes, tr.fields.minutesUnit) },
    { label: tr.fields.minNotice, value: formatMinutes(policy.minNoticeMinutes, tr.fields.minutesUnit) },
    { label: tr.fields.maxDaysAhead, value: formatMinutes(policy.maxDaysAhead, tr.fields.daysUnit) },
    { label: tr.fields.capacity, value: capacity },
    { label: tr.fields.requireApproval, value: formatFlag(policy.requireApproval, tr.yes, tr.no) },
    { label: tr.fields.notificationEmail, value: policy.notificationEmail?.trim() || null },
    { label: tr.fields.conferenceEnabled, value: formatFlag(policy.conferenceEnabled, tr.yes, tr.no) },
    { label: tr.fields.serviceSelectionEnabled, value: formatFlag(policy.serviceSelectionEnabled, tr.yes, tr.no) },
    { label: tr.fields.paymentEnabled, value: formatFlag(policy.paymentEnabled, tr.yes, tr.no) },
  ] as Array<{ label: string; value: string | null }>).filter((row): row is Row => !!row.value)

  const blockedDates = policy.blockedDates?.filter(Boolean) ?? []
  const holidays = policy.holidays?.filter(Boolean) ?? []
  const metaRows = ([
    blockedDates.length ? { label: tr.fields.blockedDates, value: formatDateList(blockedDates) } : null,
    holidays.length ? { label: tr.fields.holidays, value: formatDateList(holidays) } : null,
    policy.sync ? { label: tr.fields.sync, value: formatSync(policy.sync, tr) } : null,
  ] as Array<Row | null>).filter((row): row is Row => !!row)

  return (
    <div className="flex w-full flex-col gap-4 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-base font-semibold text-warp-fg">{tr.title}</h1>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-warp-fg-secondary">
            {policy.timezone && <span>{policy.timezone}</span>}
            {agentName && <span>· {agentName}</span>}
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
            isActive
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-warp-surface-secondary text-warp-fg-muted'
          }`}
        >
          {isActive ? tr.active : tr.inactive}
        </span>
      </div>

      <section className="flex flex-col gap-1.5">
        <h2 className="text-[11px] font-semibold uppercase tracking-wide text-warp-fg-secondary">{tr.officeHours}</h2>
        {openingHours.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-warp-border bg-warp-surface">
            {openingHours.map((line, index) => (
              <div
                key={`${line.days}-${line.time}`}
                className={`flex items-center justify-between gap-3 px-3 py-1.5 ${
                  index < openingHours.length - 1 ? 'border-b border-warp-border' : ''
                }`}
              >
                <span className="text-sm font-medium text-warp-fg">{line.days}</span>
                <span className="text-sm tabular-nums text-warp-fg-secondary">{line.time}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-warp-fg-muted">{tr.noHours}</p>
        )}
      </section>

      {ruleRows.length > 0 && (
        <section className="flex flex-col gap-1.5">
          <h2 className="text-[11px] font-semibold uppercase tracking-wide text-warp-fg-secondary">{tr.bookingRules}</h2>
          <div className="overflow-hidden rounded-lg border border-warp-border bg-warp-surface">
            {ruleRows.map((row, index) => (
              <InfoRow key={row.label} label={row.label} value={row.value} bordered={index < ruleRows.length - 1} />
            ))}
          </div>
        </section>
      )}

      {metaRows.length > 0 && (
        <section className="flex flex-col gap-1.5">
          <h2 className="text-[11px] font-semibold uppercase tracking-wide text-warp-fg-secondary">{tr.details}</h2>
          <div className="overflow-hidden rounded-lg border border-warp-border bg-warp-surface">
            {metaRows.map((row, index) => (
              <InfoRow key={row.label} label={row.label} value={row.value} bordered={index < metaRows.length - 1} />
            ))}
          </div>
        </section>
      )}

      <Button color="secondary" block onClick={() => executeWarp('appointment-configure', {})}>
        {tr.editSettings}
      </Button>
    </div>
  )
}

function InfoRow({ label, value, bordered }: { label: string; value: string; bordered?: boolean }) {
  return (
    <div className={`flex items-start justify-between gap-3 px-3 py-1.5 ${bordered ? 'border-b border-warp-border' : ''}`}>
      <span className="shrink-0 text-sm text-warp-fg-secondary">{label}</span>
      <span className="break-all text-right text-sm font-medium text-warp-fg">{value}</span>
    </div>
  )
}

const formatSync = (sync: PolicySync, tr: PolicyGetCopy): string => {
  if (sync.lastSyncError) return `${tr.syncError}: ${sync.lastSyncError}`
  if (sync.enabled) return tr.syncEnabled
  return tr.syncDisabled
}
