export type AppointmentService = {
  slug: string
  name?: string
  durationMinutes?: number
  routingMode?: 'direct' | 'round_robin'
  staffAgentUuids?: string[]
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
  services?: AppointmentService[]
}

export type AvailableStaffMember = {
  uuid: string
  name: string
}

export type AppointmentConfigureData = {
  policy: AppointmentPolicy | null
  availableStaff: AvailableStaffMember[]
}
