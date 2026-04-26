import type { AppointmentPolicy } from '../configure/warp.types'

export type { AppointmentPolicy }

export type AppointmentService = {
  slug: string
  name?: string
  durationMinutes?: number
}

export type AvailabilitySlot = {
  startAt: string
  endAt: string
  agentUuid: string
  agentName: string
  serviceSlug?: string | null
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
