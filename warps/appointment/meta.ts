import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'book': {
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

  'cancel': {
    keywords: {
      en: ['cancel appointment', 'remove booking', 'delete appointment', 'unbook slot'],
      de: ['Termin absagen', 'Buchung entfernen', 'Termin löschen', 'Zeitslot freigeben'],
    },
    useCases: {
      en: ['Cancel a meeting you can no longer attend', 'Free up a booked slot due to a scheduling conflict', 'Remove a duplicate or accidental booking'],
      de: ['Eine Besprechung absagen, an der du nicht mehr teilnehmen kannst', 'Einen gebuchten Slot wegen eines Terminkonfikts freigeben', 'Eine doppelte oder versehentliche Buchung entfernen'],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'Can I cancel an appointment at any time?',
          answer:
            'You can cancel anytime before the appointment, but the provider may enforce a cancellation policy with a minimum notice period or a cancellation fee.',
        },
        {
          question: 'Is there a cancellation fee for appointments?',
          answer:
            'It depends on the provider\'s policy. Some require 24-hour notice for free cancellation, while others may charge a fee for late cancellations or no-shows.',
        },
      ],
      de: [
        {
          question: 'Kann ich einen Termin jederzeit absagen?',
          answer:
            'Du kannst jederzeit vor dem Termin absagen, aber der Anbieter kann eine Stornierungsrichtlinie mit Mindestfrist oder Stornogebühr haben.',
        },
        {
          question: 'Gibt es eine Stornogebühr für Termine?',
          answer:
            'Das hängt von der Richtlinie des Anbieters ab. Manche verlangen eine 24-Stunden-Frist für kostenlose Stornierung, andere berechnen eine Gebühr bei kurzfristiger Absage oder Nichterscheinen.',
        },
      ],
    },
  },

  'reschedule': {
    keywords: {
      en: ['reschedule appointment', 'change appointment time', 'move booking', 'update appointment'],
      de: ['Termin verschieben', 'Terminzeit ändern', 'Buchung verlegen', 'Termin aktualisieren'],
    },
    useCases: {
      en: ['Move a client meeting to a later time slot', 'Reschedule an appointment due to an unexpected conflict', 'Shift a recurring booking to a different day of the week'],
      de: ['Ein Kundengespräch auf einen späteren Zeitslot verschieben', 'Einen Termin wegen eines unerwarteten Konflikts umplanen', 'Eine wiederkehrende Buchung auf einen anderen Wochentag verlegen'],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'How do I reschedule an existing appointment?',
          answer:
            'Select your booked appointment and choose a new available time slot. The original slot is freed up automatically once you confirm the new time.',
        },
        {
          question: 'Are there restrictions on rescheduling appointments?',
          answer:
            'Rescheduling may be limited by the provider\'s policy, such as a minimum notice period or a maximum number of changes per booking.',
        },
      ],
      de: [
        {
          question: 'Wie verschiebe ich einen bestehenden Termin?',
          answer:
            'Wähle deinen gebuchten Termin und suche einen neuen verfügbaren Zeitslot aus. Der ursprüngliche Slot wird automatisch freigegeben, sobald du die neue Zeit bestätigst.',
        },
        {
          question: 'Gibt es Einschränkungen beim Verschieben von Terminen?',
          answer:
            'Das Verschieben kann durch die Richtlinie des Anbieters eingeschränkt sein, z. B. durch eine Mindestfrist oder eine maximale Anzahl an Änderungen pro Buchung.',
        },
      ],
    },
  },

  'availability': {
    keywords: {
      en: ['check availability', 'available time slots', 'open appointments', 'free schedule slots'],
      de: ['Verfügbarkeit prüfen', 'verfügbare Zeitslots', 'offene Termine', 'freie Terminslots'],
    },
    useCases: {
      en: ['Browse available slots for next week before booking', 'Check if a specific date and time is still open', 'Find the earliest available appointment slot'],
      de: ['Verfügbare Slots für nächste Woche vor der Buchung durchsuchen', 'Prüfen, ob ein bestimmtes Datum und eine bestimmte Uhrzeit noch frei ist', 'Den frühesten verfügbaren Terminslot finden'],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'How are available appointment slots determined?',
          answer:
            'Available slots are based on the provider\'s configured working hours, existing bookings, and buffer times between appointments. Only genuinely open slots are shown.',
        },
        {
          question: 'Can I check availability for a specific date?',
          answer:
            'Yes, specify a date to see all open time slots for that day. You can also browse multiple days to find the most convenient option.',
        },
      ],
      de: [
        {
          question: 'Wie werden verfügbare Terminslots ermittelt?',
          answer:
            'Verfügbare Slots basieren auf den konfigurierten Arbeitszeiten des Anbieters, bestehenden Buchungen und Pufferzeiten zwischen Terminen. Es werden nur tatsächlich freie Slots angezeigt.',
        },
        {
          question: 'Kann ich die Verfügbarkeit für ein bestimmtes Datum prüfen?',
          answer:
            'Ja, gib ein Datum an, um alle offenen Zeitslots für diesen Tag zu sehen. Du kannst auch mehrere Tage durchsuchen, um die passendste Option zu finden.',
        },
      ],
    },
  },

  'onboarding': {
    keywords: {
      en: ['appointment onboarding', 'setup appointments', 'appointment system intro', 'get started appointments'],
      de: ['Termin-Onboarding', 'Termine einrichten', 'Terminsystem Einführung', 'mit Terminen starten'],
    },
    useCases: {
      en: ['Set up an appointment system for a new business', 'Walk through initial configuration of booking rules and hours', 'Onboard a team to start accepting appointment bookings'],
      de: ['Ein Terminsystem für ein neues Geschäft einrichten', 'Die Erstkonfiguration von Buchungsregeln und Öffnungszeiten durchgehen', 'Ein Team onboarden, um Terminbuchungen anzunehmen'],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'What do I need to set up an appointment system?',
          answer:
            'You need to define your available hours, appointment duration, and basic booking rules. The onboarding walks you through each step so your system is ready to accept bookings.',
        },
        {
          question: 'How long does appointment onboarding take?',
          answer:
            'The initial setup takes just a few minutes. You configure your schedule, set policies, and can start accepting bookings immediately afterward.',
        },
      ],
      de: [
        {
          question: 'Was brauche ich, um ein Terminsystem einzurichten?',
          answer:
            'Du musst deine verfügbaren Zeiten, die Termindauer und grundlegende Buchungsregeln festlegen. Das Onboarding führt dich durch jeden Schritt, damit dein System bereit ist, Buchungen anzunehmen.',
        },
        {
          question: 'Wie lange dauert das Termin-Onboarding?',
          answer:
            'Die Ersteinrichtung dauert nur wenige Minuten. Du konfigurierst deinen Zeitplan, legst Richtlinien fest und kannst danach sofort Buchungen annehmen.',
        },
      ],
    },
  },

  'request-create': {
    keywords: {
      en: ['request appointment', 'appointment request', 'ask for appointment', 'submit booking request'],
      de: ['Termin anfragen', 'Terminanfrage', 'um Termin bitten', 'Buchungsanfrage einreichen'],
    },
    useCases: {
      en: ['Request a consultation that requires provider approval', 'Submit a booking request for a high-demand time slot', 'Ask for an appointment outside regular booking hours'],
      de: ['Eine Beratung anfragen, die eine Genehmigung des Anbieters erfordert', 'Eine Buchungsanfrage für einen stark nachgefragten Zeitslot einreichen', 'Einen Termin außerhalb der regulären Buchungszeiten anfragen'],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'When should I use an appointment request instead of direct booking?',
          answer:
            'Use a request when the provider needs to manually approve bookings, such as for high-demand slots, consultations requiring preparation, or appointments outside regular hours.',
        },
        {
          question: 'What happens after I submit an appointment request?',
          answer:
            'The provider receives your request and can approve or decline it. You are notified once a decision is made, and the slot is reserved only upon approval.',
        },
      ],
      de: [
        {
          question: 'Wann sollte ich eine Terminanfrage statt einer direkten Buchung verwenden?',
          answer:
            'Nutze eine Anfrage, wenn der Anbieter Buchungen manuell genehmigen muss, z. B. bei stark nachgefragten Slots, Beratungen mit Vorbereitung oder Terminen außerhalb der regulären Zeiten.',
        },
        {
          question: 'Was passiert, nachdem ich eine Terminanfrage eingereicht habe?',
          answer:
            'Der Anbieter erhält deine Anfrage und kann sie annehmen oder ablehnen. Du wirst benachrichtigt, sobald eine Entscheidung getroffen wurde, und der Slot wird erst bei Genehmigung reserviert.',
        },
      ],
    },
  },

  'upsert-policy': {
    keywords: {
      en: ['appointment policy', 'booking policy', 'cancellation policy', 'appointment rules'],
      de: ['Terminrichtlinie', 'Buchungsrichtlinie', 'Stornierungsrichtlinie', 'Terminregeln'],
    },
    useCases: {
      en: ['Set a 24-hour cancellation policy for appointments', 'Define no-show fees to reduce missed bookings', 'Update booking terms to require deposits for premium services'],
      de: ['Eine 24-Stunden-Stornierungsrichtlinie für Termine festlegen', 'No-Show-Gebühren definieren, um verpasste Buchungen zu reduzieren', 'Buchungsbedingungen aktualisieren, um Anzahlungen für Premium-Dienste zu verlangen'],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'What policies can I configure for my appointments?',
          answer:
            'You can set cancellation deadlines, no-show fees, required deposits, rescheduling limits, and minimum notice periods. Policies are enforced automatically on every booking.',
        },
        {
          question: 'Can I update my appointment policy after it is created?',
          answer:
            'Yes, you can update your policy at any time. Changes apply to new bookings immediately; existing bookings follow the policy that was active when they were made.',
        },
      ],
      de: [
        {
          question: 'Welche Richtlinien kann ich für meine Termine konfigurieren?',
          answer:
            'Du kannst Stornierungsfristen, No-Show-Gebühren, Anzahlungen, Umbuchungslimits und Mindestvorlaufzeiten festlegen. Richtlinien werden automatisch bei jeder Buchung durchgesetzt.',
        },
        {
          question: 'Kann ich meine Terminrichtlinie nachträglich ändern?',
          answer:
            'Ja, du kannst deine Richtlinie jederzeit aktualisieren. Änderungen gelten sofort für neue Buchungen; bestehende Buchungen behalten die zum Buchungszeitpunkt gültige Richtlinie.',
        },
      ],
    },
  },

  'configure': {
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
