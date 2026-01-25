import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const GoogleCalendarBrand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Google Calendar')
    .setDescription({
      en: "Manage <strong>calendar events</strong>, <strong>schedules</strong>, and <strong>appointments</strong> with Google Calendar. Create, update, delete, and list events using Google Calendar's <strong>REST API</strong>.",
      de: 'Verwalte <strong>Kalendereinträge</strong>, <strong>Termine</strong> und <strong>Besprechungen</strong> mit Google Calendar. Erstelle, aktualisiere, lösche und liste Ereignisse mit der <strong>REST API</strong> von Google Calendar.',
    })
    .setLogo('https://www.google.com/calendar/about/static/images/favicon.ico')
    .setColors({ primary: '#4285F4' })
    .setUrls({ web: 'https://calendar.google.com' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (env: WarpChainEnv) => 'https://www.googleapis.com/calendar/v3',
    API_CALENDARS: (env: WarpChainEnv) => 'https://www.googleapis.com/calendar/v3/calendars',
    API_EVENTS: (env: WarpChainEnv) => 'https://www.googleapis.com/calendar/v3/calendars',
  },
})
