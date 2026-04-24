import type { AppointmentPolicy } from '../configure/warp.types'

export type { AppointmentPolicy }

export type ConfirmMeetingData = {
  MEETING_ID: string
  MEETING_NAME: string
  MEETING_CODE: string
  SCHEDULED_AT: string | null
  SCHEDULED_END_AT: string | null
  CONFERENCE_URL: string | null
  STATUS: string
  AGENT_NAME: string
  TEAM_NAME: string
}
