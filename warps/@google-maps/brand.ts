import { WarpBrandBuilder, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('Google Maps')
    .setDescription({
      en: 'Explore <strong>places</strong>, <strong>routes</strong>, and <strong>locations</strong> worldwide with Google Maps. Search for addresses, get directions, discover nearby spots, and find details like ratings and opening hours.',
      de: 'Erkunde <strong>Orte</strong>, <strong>Routen</strong> und <strong>Standorte</strong> weltweit mit Google Maps. Suche nach Adressen, erhalte Wegbeschreibungen, entdecke nahegelegene Orte und finde Details wie Bewertungen und Öffnungszeiten.',
    })
    .setLogo('https://www.google.com/maps/about/images/favicon.ico')
    .setColors({ primary: '#4285F4' })
    .setUrls({ web: 'https://maps.google.com' })
    .build(),
  contracts: {},
  destinations: {},
})
