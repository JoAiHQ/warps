import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  render: {
    keywords: {
      en: ['generate PDF', 'HTML to PDF', 'render document', 'create PDF', 'PDF from HTML', 'PDF generator'],
      de: ['PDF erstellen', 'HTML zu PDF', 'Dokument rendern', 'PDF generieren', 'PDF aus HTML', 'PDF Generator'],
    },
    useCases: {
      en: [
        'Generate a PDF invoice from HTML for sending to a customer',
        'Render a work report as a PDF for archival or sharing',
        'Create a formatted PDF document from structured content',
      ],
      de: [
        'Eine PDF-Rechnung aus HTML erstellen und an einen Kunden senden',
        'Einen Arbeitsbericht als PDF rendern und archivieren',
        'Ein formatiertes PDF-Dokument aus strukturierten Inhalten erstellen',
      ],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'What CSS is supported?',
          answer: 'The HTML is rendered with DomPDF which supports standard CSS for print. Use inline or embedded styles for best results.',
        },
        {
          question: 'Where is the PDF stored?',
          answer: 'The generated PDF is saved to the team media library and can be downloaded or shared from there.',
        },
      ],
      de: [
        {
          question: 'Welches CSS wird unterstützt?',
          answer: 'Das HTML wird mit DomPDF gerendert, das Standard-CSS für Druck unterstützt. Verwende inline oder eingebettete Styles.',
        },
        {
          question: 'Wo wird das PDF gespeichert?',
          answer: 'Das erstellte PDF wird in der Team-Mediathek gespeichert und kann von dort heruntergeladen oder geteilt werden.',
        },
      ],
    },
  },
}
