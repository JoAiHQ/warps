import type { AppointmentPolicy } from '../configure/warp.types'

export type { AppointmentPolicy }

export type AvailabilitySlot = {
  startAt: string
  endAt: string
  agentUuid: string
  agentName: string
  serviceSlug?: string | null
}

export type ShopService = {
  slug: string
  name: string
  price: string
  duration_minutes: number
  category?: string
  description?: string
}

export type BookPublicData = {
  policy: AppointmentPolicy | null
}

export type BookingResult = {
  id: string
  name: string
  scheduledAt: string
  endAt: string
  joinUrl?: string
}
