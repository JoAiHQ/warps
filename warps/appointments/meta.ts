import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'appointment-book': {
    keywords: {
      en: ['book appointment', 'schedule appointment', 'make reservation', 'book meeting', 'schedule visit', 'appointment booking'],
      de: ['Termin buchen', 'Termin vereinbaren', 'Reservierung machen', 'Besprechung buchen', 'Besuch planen', 'Terminbuchung'],
    },
    useCases: {
      en: ['Schedule a consultation with a service provider', 'Book a recurring weekly appointment for a client', 'Reserve a time slot on behalf of someone else'],
      de: ['Eine Beratung bei einem Dienstleister vereinbaren', 'Einen wöchentlich wiederkehrenden Termin für einen Kunden buchen', 'Einen Zeitslot im Namen einer anderen Person reservieren'],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'How do I book an appointment?',
          answer:
            'Simply select an available time slot and provide your details to book an appointment.',
        },
        {
          question: 'Can I book an appointment for someone else?',
          answer:
            'Yes, you can book on behalf of someone else by providing their contact details during the booking process.',
        },
      ],
      de: [
        {
          question: 'Wie buche ich einen Termin?',
          answer:
            'Wähle einfach einen verfügbaren Zeitslot und gib deine Daten ein, um einen Termin zu buchen.',
        },
        {
          question: 'Kann ich einen Termin für jemand anderen buchen?',
          answer:
            'Ja, du kannst im Namen einer anderen Person buchen, indem du deren Kontaktdaten während des Buchungsvorgangs angibst.',
        },
      ],
    },
  },

  'appointment-cancel': {
    keywords: {
      en: ['cancel appointment', 'remove booking', 'delete appointment', 'unbook slot'],
      de: ['Termin absagen', 'Buchung entfernen', 'Termin löschen', 'Zeitslot freigeben'],
    },
    useCases: {
      en: ['Cancel a meeting you can no longer attend', 'Free up a booked slot due to a scheduling conflict', 'Remove a duplicate or accidental booking'],
      de: ['Eine Besprechung absagen, an der du nicht mehr teilnehmen kannst', 'Einen gebuchten Slot wegen eines Terminkonfikts freigeben', 'Eine doppelte oder versehentliche Buchung entfernen'],
    },
    category: 'productivity',
  },

  'appointment-reschedule': {
    keywords: {
      en: ['reschedule appointment', 'change appointment time', 'move booking', 'update appointment'],
      de: ['Termin verschieben', 'Terminzeit ändern', 'Buchung verlegen', 'Termin aktualisieren'],
    },
    useCases: {
      en: ['Move a client meeting to a later time slot', 'Reschedule an appointment due to an unexpected conflict', 'Shift a recurring booking to a different day of the week'],
      de: ['Ein Kundengespräch auf einen späteren Zeitslot verschieben', 'Einen Termin wegen eines unerwarteten Konflikts umplanen', 'Eine wiederkehrende Buchung auf einen anderen Wochentag verlegen'],
    },
    category: 'productivity',
  },

  'appointment-availability': {
    keywords: {
      en: ['check availability', 'available time slots', 'open appointments', 'free schedule slots'],
      de: ['Verfügbarkeit prüfen', 'verfügbare Zeitslots', 'offene Termine', 'freie Terminslots'],
    },
    useCases: {
      en: ['Browse available slots for next week before booking', 'Check if a specific date and time is still open', 'Find the earliest available appointment slot'],
      de: ['Verfügbare Slots für nächste Woche vor der Buchung durchsuchen', 'Prüfen, ob ein bestimmtes Datum und eine bestimmte Uhrzeit noch frei ist', 'Den frühesten verfügbaren Terminslot finden'],
    },
    category: 'productivity',
  },

  'appointment-onboarding': {
    keywords: {
      en: ['appointment onboarding', 'setup appointments', 'appointment system intro', 'get started appointments'],
      de: ['Termin-Onboarding', 'Termine einrichten', 'Terminsystem Einführung', 'mit Terminen starten'],
    },
    useCases: {
      en: ['Set up an appointment system for a new business', 'Walk through initial configuration of booking rules and hours', 'Onboard a team to start accepting appointment bookings'],
      de: ['Ein Terminsystem für ein neues Geschäft einrichten', 'Die Erstkonfiguration von Buchungsregeln und Öffnungszeiten durchgehen', 'Ein Team onboarden, um Terminbuchungen anzunehmen'],
    },
    category: 'productivity',
  },

  'appointment-request-create': {
    keywords: {
      en: ['request appointment', 'appointment request', 'ask for appointment', 'submit booking request'],
      de: ['Termin anfragen', 'Terminanfrage', 'um Termin bitten', 'Buchungsanfrage einreichen'],
    },
    useCases: {
      en: ['Request a consultation that requires provider approval', 'Submit a booking request for a high-demand time slot', 'Ask for an appointment outside regular booking hours'],
      de: ['Eine Beratung anfragen, die eine Genehmigung des Anbieters erfordert', 'Eine Buchungsanfrage für einen stark nachgefragten Zeitslot einreichen', 'Einen Termin außerhalb der regulären Buchungszeiten anfragen'],
    },
    category: 'productivity',
  },

  'appointment-upsert-policy': {
    keywords: {
      en: ['appointment policy', 'booking policy', 'cancellation policy', 'appointment rules'],
      de: ['Terminrichtlinie', 'Buchungsrichtlinie', 'Stornierungsrichtlinie', 'Terminregeln'],
    },
    useCases: {
      en: ['Set a 24-hour cancellation policy for appointments', 'Define no-show fees to reduce missed bookings', 'Update booking terms to require deposits for premium services'],
      de: ['Eine 24-Stunden-Stornierungsrichtlinie für Termine festlegen', 'No-Show-Gebühren definieren, um verpasste Buchungen zu reduzieren', 'Buchungsbedingungen aktualisieren, um Anzahlungen für Premium-Dienste zu verlangen'],
    },
    category: 'productivity',
  },

  'appointment-configure': {
    keywords: {
      en: ['configure appointments', 'appointment settings', 'setup booking system', 'appointment configuration', 'manage availability'],
      de: ['Termine konfigurieren', 'Termineinstellungen', 'Buchungssystem einrichten', 'Terminkonfiguration', 'Verfügbarkeit verwalten'],
    },
    useCases: {
      en: ['Set different availability hours for each day of the week', 'Configure buffer times between consecutive appointments', 'Adjust notification settings for booking confirmations and reminders'],
      de: ['Verschiedene Verfügbarkeitszeiten für jeden Wochentag festlegen', 'Pufferzeiten zwischen aufeinanderfolgenden Terminen konfigurieren', 'Benachrichtigungseinstellungen für Buchungsbestätigungen und Erinnerungen anpassen'],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'How do I configure my appointment system?',
          answer:
            'Set up your availability, booking rules, and notification preferences through the configuration action. You can define time slots, buffer times, and cancellation policies.',
        },
        {
          question: 'Can I set different availability for different days?',
          answer:
            'Yes, the configuration allows you to set custom availability per day of the week, including different time slots and blocked-off periods.',
        },
      ],
      de: [
        {
          question: 'Wie konfiguriere ich mein Terminsystem?',
          answer:
            'Richte deine Verfügbarkeit, Buchungsregeln und Benachrichtigungseinstellungen über die Konfigurationsaktion ein. Du kannst Zeitslots, Pufferzeiten und Stornierungsrichtlinien festlegen.',
        },
        {
          question: 'Kann ich verschiedene Verfügbarkeiten für verschiedene Tage festlegen?',
          answer:
            'Ja, die Konfiguration ermöglicht es dir, benutzerdefinierte Verfügbarkeiten pro Wochentag festzulegen, einschließlich verschiedener Zeitslots und gesperrter Zeiträume.',
        },
      ],
    },
  },
}
