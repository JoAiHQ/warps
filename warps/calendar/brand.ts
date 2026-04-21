import { WarpBrandBuilder, WarpChainEnv, WarpClientConfig } from '@joai/warps'
import { WarpbaseBrand } from '../types'

export const brand = async (config: WarpClientConfig): Promise<WarpbaseBrand> => ({
  info: await new WarpBrandBuilder(config)
    .setName('AI Calendar')
    .setDescription({
      en: 'Manage calendar events — create, update, delete, and list — through your AI agent. Provider-agnostic: works with whichever calendar the agent is connected to (Google, Microsoft, Apple). Every action routes through your configured integration so there is one interface regardless of provider.',
      de: 'Verwalte Kalenderereignisse — erstellen, aktualisieren, löschen, auflisten — über deinen KI-Agenten. Anbieterunabhängig: funktioniert mit dem verbundenen Kalender (Google, Microsoft, Apple). Jede Aktion läuft über deine konfigurierte Integration, damit es eine einheitliche Oberfläche gibt.',
      fr: 'Gerez les evenements de calendrier — creer, mettre a jour, supprimer, lister — via votre agent IA. Independant du fournisseur: fonctionne avec le calendrier connecte (Google, Microsoft, Apple). Chaque action passe par votre integration configuree.',
      es: 'Gestiona eventos de calendario — crear, actualizar, eliminar, listar — mediante tu agente IA. Independiente del proveedor: funciona con el calendario conectado (Google, Microsoft, Apple). Cada accion pasa por tu integracion configurada.',
      ro: 'Gestioneaza evenimente de calendar — creare, actualizare, stergere, listare — prin agentul tau AI. Independent de furnizor: functioneaza cu calendarul conectat (Google, Microsoft, Apple). Fiecare actiune trece prin integrarea ta configurata.',
    })
    .setLogo('https://raw.githubusercontent.com/JoAiHQ/assets/refs/heads/main/apps/logos/joai.svg')
    .setUrls({ web: 'https://joai.ai' })
    .build(),
  contracts: {},
  destinations: {
    API_BASE: (env: WarpChainEnv) => {
      if (env === 'devnet') return 'https://devnet-api.joai.ai'
      if (env === 'testnet') return 'https://testnet-api.joai.ai'
      return 'https://api.joai.ai'
    },
  },
})
