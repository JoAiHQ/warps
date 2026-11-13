export type PolicyAvailabilityRange = string | { start: string; end: string }

export type PolicySync = {
  enabled: boolean
  lastSyncedAt?: string | null
  lastSyncError?: string | null
}

export type PolicyAgent = {
  uuid?: string
  name?: string
}

export type AppointmentPolicyView = {
  active?: boolean | null
  timezone?: string | null
  availability?: Record<string, PolicyAvailabilityRange[]> | null
  minNoticeMinutes?: number | null
  bufferMinutes?: number | null
  maxDaysAhead?: number | null
  slotIntervalMinutes?: number | null
  blockedDates?: string[] | null
  holidays?: string[] | null
  conferenceEnabled?: boolean | null
  serviceSelectionEnabled?: boolean | null
  paymentEnabled?: boolean | null
  bookingCapacity?: number | null
  bookingCapacityUnit?: 'booking' | 'person' | null
  requireApproval?: boolean | null
  notificationEmail?: string | null
  sync?: PolicySync | null
  agent?: PolicyAgent | null
  agentUuid?: string | null
}

export type PolicyGetData = {
  policy?: AppointmentPolicyView | null
}
