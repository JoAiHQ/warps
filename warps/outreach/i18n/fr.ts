import { en } from './en'

export const fr: typeof en = {
  broadcast: {
    title: 'Message de diffusion',
    recipients: 'Destinataires',
    noContacts: 'Aucun contact trouvé. Essaie un autre tag ou ajoute des contacts à ton CRM.',
    channel: 'Canal',
    channelWhatsapp: 'WhatsApp',
    channelEmail: 'E-mail',
    messagePlaceholder: 'Écris ton message...',
    send: 'Envoyer la diffusion',
    sending: 'Envoi en cours...',
    sent: 'Envoyé !',
    sentMessage: 'Ton message a été envoyé à {count} contact.',
    sentMessagePlural: 'Ton message a été envoyé à {count} contacts.',
    confirmTitle: 'Envoyer à {count} contacts ?',
    confirmDescription: 'Cela enverra ton message via {channel} à tous les destinataires affichés ci-dessus.',
    confirm: 'Confirmer et envoyer',
    cancel: 'Annuler',
    messageRequired: 'Écris un message avant d\'envoyer.',
    noRecipientsWithChannel: 'Aucun des contacts sélectionnés n\'a d\'adresse {channel}. Change de canal ou ajoute les coordonnées du contact.',
  },
}
