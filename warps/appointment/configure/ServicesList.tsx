import React from 'react'
import { useTranslations } from '../../../ui/lib/hooks'
import { translations, Translations } from '../i18n'
import { AppointmentService } from './warp.types'

type Props = {
  services: AppointmentService[]
}

function ServiceRow({ service, tr }: { service: AppointmentService; tr: Translations['configure'] }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-default bg-surface-secondary">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{service.name ?? service.slug}</span>
        <span className="text-xs text-secondary">{service.slug}</span>
      </div>
      {service.durationMinutes != null && (
        <span className="text-xs text-secondary">{service.durationMinutes} {tr.fields.serviceDurationUnit}</span>
      )}
    </div>
  )
}

export function ServicesList({ services }: Props) {
  const tr = useTranslations(translations).configure

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold text-secondary uppercase tracking-wide">{tr.services}</h2>
      {services.length > 0 ? (
        <div className="flex flex-col gap-2">
          {services.map((service) => (
            <ServiceRow key={service.slug} service={service} tr={tr} />
          ))}
        </div>
      ) : (
        <p className="text-xs text-secondary">{tr.noServices}</p>
      )}
    </section>
  )
}
