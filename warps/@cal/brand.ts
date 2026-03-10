import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Cal.com')
    .setDescription({
      en: 'Manage <strong>scheduling</strong> and <strong>bookings</strong> with Cal.com. Check <strong>available time slots</strong>, <strong>create bookings</strong>, <strong>cancel or reschedule</strong> meetings, and list <strong>event types</strong> using the Cal.com <strong>REST API</strong>.',
      de: 'Verwalte <strong>Terminplanung</strong> und <strong>Buchungen</strong> mit Cal.com. Prüfe <strong>verfügbare Zeitfenster</strong>, <strong>erstelle Buchungen</strong>, <strong>storniere oder verschiebe</strong> Meetings und liste <strong>Ereignistypen</strong> mit der Cal.com <strong>REST API</strong>.',
    })
    .setLogo({
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/cal-white.svg',
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/cal-black.svg',
    })
    .setColors({ primary: '#292929' })
    .setUrls({ web: 'https://cal.com' })
    .build(),
  contracts: {},
  destinations: {
    API_BOOKINGS: (env: WarpChainEnv) => 'https://api.cal.com/v2/bookings',
    API_SLOTS: (env: WarpChainEnv) => 'https://api.cal.com/v2/slots',
    API_EVENT_TYPES: (env: WarpChainEnv) => 'https://api.cal.com/v2/event-types',
    API_SCHEDULES: (env: WarpChainEnv) => 'https://api.cal.com/v2/schedules',
  },
})
