import { Input } from '@openai/apps-sdk-ui/components/Input'
import { Switch } from '@openai/apps-sdk-ui/components/Switch'
import React from 'react'
import { useTranslations } from '../../../ui/lib/hooks'
import { translations } from '../i18n'

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const
const DEFAULT_HOURS = '09:00-17:00'

function parseTimeRange(range: string): [string, string] {
  const parts = range.split('-')
  const start = parts[0]?.match(/^\d{2}:\d{2}$/) ? parts[0] : '09:00'
  const end = parts[1]?.match(/^\d{2}:\d{2}$/) ? parts[1] : '17:00'
  return [start, end]
}

type Props = {
  availability: Record<string, string[]>
  onChange: (day: string, ranges: string[]) => void
}

export function OfficeHours({ availability, onChange }: Props) {
  const tr = useTranslations(translations).configure

  const toggleDay = (day: string) => {
    const ranges = availability[day] ?? []
    onChange(day, ranges.length > 0 ? [] : [DEFAULT_HOURS])
  }

  const updateDayHours = (day: string, part: 'start' | 'end', value: string) => {
    const [start, end] = parseTimeRange(availability[day]?.[0] ?? DEFAULT_HOURS)
    const newRange = part === 'start' ? `${value}-${end}` : `${start}-${value}`
    onChange(day, [newRange])
  }

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold text-secondary uppercase tracking-wide">{tr.officeHours}</h2>
      <div className="flex flex-col gap-2">
        {DAYS.map((day) => {
          const ranges = availability[day] ?? []
          const enabled = ranges.length > 0
          const [start, end] = parseTimeRange(ranges[0] ?? DEFAULT_HOURS)

          return (
            <div key={day} className="flex items-center gap-3 min-h-8">
              <Switch checked={enabled} onCheckedChange={() => toggleDay(day)} />
              <span className="text-sm font-medium w-8 shrink-0">{tr.days[day]}</span>
              {enabled ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={start}
                    onChange={(e) => updateDayHours(day, 'start', e.target.value)}
                    size="sm"
                  />
                  <span className="text-secondary text-xs">–</span>
                  <Input
                    type="time"
                    value={end}
                    onChange={(e) => updateDayHours(day, 'end', e.target.value)}
                    size="sm"
                  />
                </div>
              ) : (
                <span className="text-xs text-secondary">{tr.closed}</span>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
