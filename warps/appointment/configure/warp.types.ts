export type AppointmentService = {
  slug: string
  name?: string
  durationMinutes?: number
}

export type AppointmentPolicy = {
  timezone?: string | null
  availability?: Record<string, string[]>
  minNoticeMinutes?: number | null
  bufferMinutes?: number | null
  maxDaysAhead?: number | null
  slotIntervalMinutes?: number | null
  blockedDates?: string[]
  holidays?: string[]
  conferenceEnabled?: boolean | null
  serviceSelectionEnabled?: boolean | null
  marketplacePaymentEnabled?: boolean | null
}

export type AvailableStaffMember = {
  uuid: string
  name: string
}

export type AppointmentConfigureData = {
  policy: AppointmentPolicy | null
  services: AppointmentService[]
  availableStaff: AvailableStaffMember[]
}
