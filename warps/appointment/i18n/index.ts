import { de } from './de'
import { en } from './en'

export type Translations = typeof en

export const translations: Record<string, Translations> = { en, de }
