import { en } from './en'

export const ro: typeof en = {
  broadcast: {
    title: 'Mesaj de difuzare',
    recipients: 'Destinatari',
    noContacts: 'Niciun contact găsit. Încearcă un alt tag sau adaugă contacte în CRM-ul tău.',
    channel: 'Canal',
    channelWhatsapp: 'WhatsApp',
    channelEmail: 'E-mail',
    messagePlaceholder: 'Scrie mesajul tău...',
    send: 'Trimite difuzarea',
    sending: 'Se trimite...',
    sent: 'Trimis!',
    sentMessage: 'Mesajul tău a fost trimis la {count} contact.',
    sentMessagePlural: 'Mesajul tău a fost trimis la {count} contacte.',
    confirmTitle: 'Trimiți la {count} contacte?',
    confirmDescription: 'Aceasta va trimite mesajul tău prin {channel} tuturor destinatarilor afișați mai sus.',
    confirm: 'Confirmă și trimite',
    cancel: 'Anulează',
    messageRequired: 'Scrie un mesaj înainte de a trimite.',
    noRecipientsWithChannel: 'Niciunul dintre contactele selectate nu are o adresă de {channel}. Schimbă canalul sau adaugă datele de contact.',
  },
  dashboard: {
    enrolled: 'Înrolați',
    parked: 'Parcați',
    replied: 'Răspuns',
    enrolledContacts: 'Contacte înrolate',
    parkedContacts: 'Contacte parcate',
    repliedContacts: 'Contacte care au răspuns',
    templates: 'Șabloane',
  },
}
