import { Plus, Trash } from '@openai/apps-sdk-ui/components/Icon'
import { Input } from '@openai/apps-sdk-ui/components/Input'
import React from 'react'
import { useTranslations } from '../../../ui/lib/hooks'
import { translations, Translations } from '../i18n'
import { AppointmentService } from './warp.types'

type ServiceEntry = AppointmentService & { _id: string }

type Props = {
  services: ServiceEntry[]
  onAdd: () => void
  onUpdate: (id: string, updated: AppointmentService) => void
  onRemove: (id: string) => void
}

function ServiceRow({
  service,
  tr,
  onUpdate,
  onRemove,
}: {
  service: ServiceEntry
  tr: Translations['configure']
  onUpdate: (updated: AppointmentService) => void
  onRemove: () => void
}) {
  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl border border-default bg-surface-secondary">
      <div className="flex gap-2">
        <Input
          placeholder={tr.serviceSlugPlaceholder}
          value={service.slug}
          onChange={(e) => onUpdate({ ...service, slug: e.target.value })}
          size="sm"
        />
        <Input
          placeholder={tr.serviceNamePlaceholder}
          value={service.name ?? ''}
          onChange={(e) => onUpdate({ ...service, name: e.target.value || undefined })}
          size="sm"
        />
        <button
          onClick={onRemove}
          className="text-secondary hover:text-danger transition-colors shrink-0"
          type="button"
          aria-label={tr.removeService}
        >
          <Trash className="size-4" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-secondary">{tr.fields.serviceDuration}</span>
        <Input
          type="number"
          placeholder="30"
          value={service.durationMinutes ?? ''}
          onChange={(e) => onUpdate({ ...service, durationMinutes: e.target.value ? Number(e.target.value) : undefined })}
          size="sm"
          className="w-24"
        />
      </div>
    </div>
  )
}

export function ServicesList({ services, onAdd, onUpdate, onRemove }: Props) {
  const tr = useTranslations(translations).configure

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-secondary uppercase tracking-wide">{tr.services}</h2>
        <button
          onClick={onAdd}
          type="button"
          className="flex items-center gap-1 text-xs text-link hover:underline font-medium"
        >
          <Plus className="size-3" />
          {tr.addService}
        </button>
      </div>
      {services.length > 0 ? (
        <div className="flex flex-col gap-2">
          {services.map((service) => (
            <ServiceRow
              key={service._id}
              service={service}
              tr={tr}
              onUpdate={(updated) => onUpdate(service._id, updated)}
              onRemove={() => onRemove(service._id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-xs text-secondary">{tr.noServices}</p>
      )}
    </section>
  )
}
