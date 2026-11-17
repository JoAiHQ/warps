import { LocalizedText, Translator } from '../../lib/i18n'

export const UVA_FIELD_LABELS: Record<string, LocalizedText> = {
  '000': { en: 'Total turnover', de: 'Gesamtbetrag der Lieferungen und Leistungen' },
  '006': { en: 'Output VAT 13%', de: 'Ermäßigter Steuersatz 13%' },
  '022': { en: 'Output VAT 20%', de: 'Normalsteuersatz 20%' },
  '029': { en: 'Output VAT 10%', de: 'Ermäßigter Steuersatz 10%' },
  '057': { en: 'Reverse charge VAT', de: 'Steuerschuld Reverse Charge § 19' },
  '060': { en: 'Input VAT', de: 'Vorsteuer' },
  '065': { en: 'Input VAT on intra-EU acquisitions', de: 'Vorsteuer aus ig. Erwerb' },
  '066': { en: 'Input VAT reverse charge', de: 'Vorsteuer Reverse Charge § 19' },
  '070': { en: 'Intra-EU acquisitions', de: 'Innergemeinschaftliche Erwerbe' },
  '072': { en: 'Acquisition VAT 20%', de: 'Erwerbsteuer 20%' },
}

const VALUE_LABELS: Record<string, LocalizedText> = {
  asset: { en: 'Asset', de: 'Aktivkonto' },
  liability: { en: 'Liability', de: 'Passivkonto' },
  equity: { en: 'Equity', de: 'Eigenkapital' },
  revenue: { en: 'Revenue', de: 'Erlös' },
  expense: { en: 'Expense', de: 'Aufwand' },
  bank: { en: 'Bank', de: 'Bank' },
  cash: { en: 'Cash', de: 'Kassa' },
  receivable: { en: 'Receivable', de: 'Forderung' },
  payable: { en: 'Payable', de: 'Verbindlichkeit' },
  input_vat: { en: 'Input VAT', de: 'Vorsteuer' },
  output_vat: { en: 'Output VAT', de: 'Umsatzsteuer' },
  private: { en: 'Private', de: 'Privat' },
  standard: { en: 'Standard', de: 'Normal' },
  reverse_charge: { en: 'Reverse charge', de: 'Reverse Charge' },
  exempt: { en: 'Exempt', de: 'Steuerfrei' },
  acquisition: { en: 'Intra-EU acquisition', de: 'Ig. Erwerb' },
  none: { en: 'None', de: 'Keine' },
  manual: { en: 'Manual', de: 'Manuell' },
  order: { en: 'Order', de: 'Bestellung' },
  open: { en: 'Open', de: 'Offen' },
  matched: { en: 'Matched', de: 'Zugeordnet' },
  booked: { en: 'Booked', de: 'Verbucht' },
  ignored: { en: 'Ignored', de: 'Ignoriert' },
}

/**
 * Translates known accounting enum values (account types, roles, tax kinds,
 * sources, bank statuses). Unknown values are shown as they are.
 */
export function accountingValue(t: Translator, value: unknown): string | null {
  if (typeof value !== 'string' || !value) return null
  const label = VALUE_LABELS[value.toLowerCase()]
  return label ? t(label) : value.replace(/_/g, ' ')
}
