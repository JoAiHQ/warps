import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('ElevenLabs')
    .setDescription({
      en: 'Generate <strong>realistic speech</strong> from text with ElevenLabs. Create <strong>voice messages</strong>, <strong>narrations</strong>, and <strong>audio content</strong> using AI <strong>text-to-speech</strong> with multiple voices and languages.',
      de: 'Erzeuge <strong>realistische Sprache</strong> aus Text mit ElevenLabs. Erstelle <strong>Sprachnachrichten</strong>, <strong>Erzählungen</strong> und <strong>Audioinhalte</strong> mit KI-<strong>Text-to-Speech</strong> in mehreren Stimmen und Sprachen.',
    })
    .setLogo({
      dark: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/elevenlabs-white.svg',
      light: 'https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/elevenlabs-black.svg',
    })
    .setColors({ primary: '#000000' })
    .setUrls({ web: 'https://elevenlabs.io' })
    .build(),
  contracts: {},
  destinations: {
    API_TTS: (env: WarpChainEnv) => 'https://api.elevenlabs.io/v1/text-to-speech',
    API_VOICES: (env: WarpChainEnv) => 'https://api.elevenlabs.io/v1/voices',
    API_STT: (env: WarpChainEnv) => 'https://api.elevenlabs.io/v1/speech-to-text',
  },
})
