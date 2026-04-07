import { en } from './en'

export const de: typeof en = {
  configure: {
    title: 'Termineinstellungen',
    officeHours: 'Bürozeiten',
    closed: 'Geschlossen',
    bookingRules: 'Buchungsregeln',
    services: 'Dienstleistungen',
    addService: 'Hinzufügen',
    removeService: 'Entfernen',
    noServices: 'Keine Dienstleistungen konfiguriert. Füge eine hinzu, um servicebasierte Buchungen zu aktivieren.',
    serviceSlugPlaceholder: 'Slug (z. B. haarschnitt)',
    serviceNamePlaceholder: 'Name',
    save: 'Einstellungen speichern',
    saved: 'Gespeichert',
    saving: 'Speichern...',
    fields: {
      slotInterval: 'Slot-Intervall (Min)',
      bufferAfter: 'Pufferzeit (Min)',
      minNotice: 'Mindestvorlaufzeit (Min)',
      maxDaysAhead: 'Maximale Vorlaufzeit (Tage)',
      serviceSlug: 'Slug',
      serviceName: 'Name',
      serviceDuration: 'Dauer (Min)',
    },
    days: {
      monday: 'Mo',
      tuesday: 'Di',
      wednesday: 'Mi',
      thursday: 'Do',
      friday: 'Fr',
      saturday: 'Sa',
      sunday: 'So',
    },
  },
}
