import type { AppointmentPolicy } from '../configure/warp.types'

export type { AppointmentPolicy }

export type AppointmentService = {
  slug: string
  name?: string
  durationMinutes?: number
  bookable?: boolean
}

export type AvailabilitySlot = {
  startAt: string
  endAt: string
  agentUuid: string
  agentName: string
  serviceSlug?: string | null
}

export type BookPrefill = {
  teamSlug?: string
  agentUuid?: string
  serviceSlug?: string
  scheduledAt?: string
  scheduledEndAt?: string
  attendeeName?: string
  attendeeEmail?: string
  purpose?: string
  title?: string
  notes?: string
  timezone?: string
  services?: AppointmentService[]
  slots?: AvailabilitySlot[]
}

export type BookPublicData = {
  policy: AppointmentPolicy | null
  services: AppointmentService[]
}

export type BookingResult = {
  id: string
  name: string
  scheduledAt: string
  endAt: string
  joinUrl?: string
}
