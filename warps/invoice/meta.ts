import { WarpMetaBuilder } from '@joai/warps'

export const meta = new WarpMetaBuilder()
  .setKeywords({
    en: [
      'create invoice',
      'generate invoice',
      'billing',
      'payment request',
      'freelancer invoice',
      'contractor invoice',
      'handyman invoice',
      'plumber invoice',
      'electrician invoice',
      'labor and materials invoice',
      'pdf invoice',
      'service billing',
      'professional invoice',
      'invoice document',
    ],
    de: [
      'Rechnung erstellen',
      'Rechnung schreiben',
      'Abrechnung',
      'Zahlungsaufforderung',
      'Freiberufler Rechnung',
      'Handwerkerrechnung',
      'Installateur Rechnung',
      'Elektriker Rechnung',
      'Material und Arbeitszeit',
      'Leistungsrechnung',
      'PDF Rechnung',
      'Dienstleistungsabrechnung',
      'professionelle Rechnung',
      'Rechnungsdokument',
    ],
  })
  .setUseCases({
    en: [
      'A freelancer bills a client for a project milestone',
      'A handyman bills a client for 3 hours of labor plus replacement parts after a service visit',
      'A contractor creates a formal payment request for a construction phase',
      'A service provider generates a professional PDF invoice for a business customer',
    ],
    de: [
      'Ein Freiberufler stellt einem Kunden einen Projektabschnitt in Rechnung',
      'Ein Handwerker berechnet einem Kunden 3 Arbeitsstunden plus Ersatzteile nach einem Servicebesuch',
      'Ein Auftragnehmer erstellt eine formelle Zahlungsaufforderung für eine Bauphase',
      'Ein Dienstleister erstellt eine professionelle PDF-Rechnung für einen Geschäftskunden',
    ],
  })
  .setFaq({
    en: [
      {
        question: 'Where is the invoice stored?',
        answer: 'The generated PDF invoice is automatically uploaded to your team media library and a signed temporary link is provided.',
      },
      {
        question: 'Can I customize the invoice template?',
        answer: 'The warp uses the professional JoAi standard template. For custom branding, please contact support.',
      },
      {
        question: 'Can I bill for both labor hours and materials?',
        answer: 'Yes, you can add as many line items as you need, specifying different titles for labor and parts.',
      },
    ],
    de: [
      {
        question: 'Wo wird die Rechnung gespeichert?',
        answer: 'Die erstellte PDF-Rechnung wird automatisch in deine Team-Mediathek hochgeladen und ein signierter temporärer Link wird bereitgestellt.',
      },
      {
        question: 'Kann ich die Rechnungsvorlage anpassen?',
        answer: 'Das Warp verwendet die professionelle JoAi-Standardvorlage. Für individuelles Branding wenden Sie sich bitte an den Support.',
      },
      {
        question: 'Kann ich sowohl Arbeitsstunden als auch Material abrechnen?',
        answer: 'Ja, du kannst so viele Positionen hinzufügen wie nötig und dabei verschiedene Titel für Arbeit und Teile angeben.',
      },
    ],
  })
  .build()
