import { de } from './de'
import { en } from './en'
import { es } from './es'
import { fr } from './fr'
import { ro } from './ro'

export type PollTranslations = typeof en

export const translations: Record<string, PollTranslations> = { en, de, fr, es, ro }
