import React from 'react'
import { useTranslations } from '../../../ui/lib/hooks'
import { translations } from '../i18n'
import type { BookingTheme } from './warp.types'

const THEMES: BookingTheme[] = ['classic', 'soft', 'editorial']

type Props = {
  value?: BookingTheme | null
  onChange: (theme: BookingTheme) => void
}

export function BookingThemePicker({ value, onChange }: Props) {
  const tr = useTranslations(translations).configure
  const selectedTheme = value ?? 'classic'

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold text-secondary uppercase tracking-wide">{tr.appearance}</h2>
      <div className="grid grid-cols-3 gap-2">
        {THEMES.map((theme) => {
          const selected = selectedTheme === theme

          return (
            <button
              key={theme}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(theme)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                selected
                  ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  : 'border-warp-border text-secondary hover:bg-warp-surface-secondary'
              }`}
            >
              {tr.themes[theme]}
            </button>
          )
        })}
      </div>
    </section>
  )
}
