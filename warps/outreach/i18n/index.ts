import { de } from './de'
import { en } from './en'
import { es } from './es'
import { fr } from './fr'
import { ro } from './ro'

export type Translations = typeof en

export const translations: Record<string, Translations> = { en, de, fr, es, ro }
