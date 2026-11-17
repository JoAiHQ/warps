import type { AppointmentPolicy } from '../../configure/warp.types'
import type { AppointmentService, AvailabilitySlot, BookPrefill } from '../warp.types'

export type BookingStep = 'service' | 'datetime' | 'contact'

export type BookingDraft = {
  name: string
  email: string
  purpose: string
  notes: string
  service: AppointmentService | null | undefined
  slot: AvailabilitySlot | null
  date: Date | null
  slots: AvailabilitySlot[]
  step: BookingStep
  timezone: string | null
  agentUuid: string | null
}

export function resolveBookingPrefill(
  inputs: BookPrefill | undefined,
  policy: AppointmentPolicy | null | undefined,
  services: AppointmentService[] = [],
): BookingDraft {
  const serviceSlug = inputs?.serviceSlug?.trim() || undefined
  const service = serviceSlug ? (services.find((item) => item.slug === serviceSlug) ?? { slug: serviceSlug }) : undefined
  const agentUuid = inputs?.agentUuid || policy?.agent?.uuid || null

  const slot: AvailabilitySlot | null = inputs?.scheduledAt
    ? {
        startAt: inputs.scheduledAt,
        endAt: inputs.scheduledEndAt || inputs.scheduledAt,
        agentUuid: agentUuid ?? '',
        agentName: policy?.agent?.name ?? '',
        serviceSlug: serviceSlug ?? null,
      }
    : null

  const slots = Array.isArray(inputs?.slots) ? inputs.slots : []
  const date = slot ? new Date(slot.startAt) : slots[0] ? new Date(slots[0].startAt) : null
  const validDate = date && !Number.isNaN(date.getTime()) ? date : null

  const serviceSelectionEnabled = policy?.serviceSelectionEnabled ?? true
  const step: BookingStep = slot
    ? 'contact'
    : service
      ? 'datetime'
      : serviceSelectionEnabled && services.length > 0
        ? 'service'
        : 'datetime'

  return {
    name: inputs?.attendeeName?.trim() ?? '',
    email: inputs?.attendeeEmail?.trim() ?? '',
    purpose: (inputs?.purpose ?? inputs?.title)?.trim() ?? '',
    notes: inputs?.notes?.trim() ?? '',
    service,
    slot,
    date: validDate,
    slots,
    step,
    timezone: inputs?.timezone || policy?.timezone || null,
    agentUuid,
  }
}
