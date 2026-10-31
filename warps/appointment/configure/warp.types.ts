export type BookingTheme = 'classic' | 'soft' | 'editorial'

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
  paymentEnabled?: boolean | null
  bookingTheme?: BookingTheme | null
}

export type AvailableStaffMember = {
  uuid: string
  name: string
}

export type AppointmentConfigureData = {
  policy: AppointmentPolicy | null
  availableStaff: AvailableStaffMember[]
}
