import type { AppointmentPolicy } from '../configure/warp.types'

export type { AppointmentPolicy }

export type AvailabilitySlot = {
  startAt: string
  endAt: string
  agentUuid: string
  agentName: string
  serviceSlug?: string | null
}

export type BookPublicData = {
  policy: AppointmentPolicy | null
}

export type BookingResult = {
  id: string
  name: string
  scheduledAt: string
  inviteUrl?: string
}
