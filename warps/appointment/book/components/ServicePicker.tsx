import React from 'react'
import type { AppointmentService } from '../warp.types'

type Props = {
  services: AppointmentService[]
  onSelect: (service: AppointmentService | null) => void
  bookLabel: string
  noSpecificServiceLabel: string
  durationUnit: string
}

export function ServicePicker({ services, onSelect, bookLabel, noSpecificServiceLabel, durationUnit }: Props) {
  return (
    <div className="flex flex-col gap-3 p-4">
      {services.map((service) => (
        <button
          key={service.slug}
          onClick={() => onSelect(service)}
          className="flex items-center justify-between w-full p-4 rounded-xl border border-default bg-surface-secondary hover:bg-surface-secondary/70 transition-colors text-left"
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">{service.name ?? service.slug}</span>
            {service.durationMinutes != null && (
              <span className="text-xs text-secondary">{service.durationMinutes} {durationUnit}</span>
            )}
          </div>
          <span className="text-xs font-medium text-primary ml-4 shrink-0">{bookLabel}</span>
        </button>
      ))}

      <button
        onClick={() => onSelect(null)}
        className="w-full p-3 rounded-xl border border-default text-sm text-secondary hover:text-primary hover:border-primary transition-colors text-center"
      >
        {noSpecificServiceLabel}
      </button>
    </div>
  )
}
