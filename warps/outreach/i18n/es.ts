import { en } from './en'

export const es: typeof en = {
  broadcast: {
    title: 'Mensaje de difusión',
    recipients: 'Destinatarios',
    noContacts: 'No se encontraron contactos. Prueba con otro tag o agrega contactos a tu CRM.',
    channel: 'Canal',
    channelWhatsapp: 'WhatsApp',
    channelEmail: 'Correo',
    messagePlaceholder: 'Escribe tu mensaje...',
    send: 'Enviar difusión',
    sending: 'Enviando...',
    sent: '¡Enviado!',
    sentMessage: 'Tu mensaje fue enviado a {count} contacto.',
    sentMessagePlural: 'Tu mensaje fue enviado a {count} contactos.',
    confirmTitle: '¿Enviar a {count} contactos?',
    confirmDescription: 'Esto enviará tu mensaje por {channel} a todos los destinatarios mostrados arriba.',
    confirm: 'Confirmar y enviar',
    cancel: 'Cancelar',
    messageRequired: 'Escribe un mensaje antes de enviar.',
    noRecipientsWithChannel: 'Ninguno de los contactos seleccionados tiene una dirección de {channel}. Cambia de canal o agrega los datos del contacto.',
  },
}
