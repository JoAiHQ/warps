import type { WarpExtras } from '../types'

const category = 'productivity' as const

export const meta: Record<string, WarpExtras> = {
  create: {
    keywords: { en: ['create form', 'form builder', 'contact form', 'lead form', 'double opt-in form', 'CRM consent'], de: ['Formular erstellen', 'Formular-Builder', 'Kontaktformular', 'Lead-Formular', 'Double-Opt-in-Formular', 'CRM-Einwilligung'] },
    useCases: { en: ['Create a contact form for a website', 'Collect confirmed email consent in the CRM', 'Build a registration or feedback form', 'Publish a reusable form template'], de: ['Ein Kontaktformular für eine Website erstellen', 'Bestätigte E-Mail-Einwilligungen im CRM erfassen', 'Ein Anmelde- oder Feedbackformular bauen', 'Eine wiederverwendbare Formularvorlage veröffentlichen'] },
    category,
    faq: {
      en: [{ question: 'Does a form need a brand?', answer: 'No. Forms are standalone team resources and are created without a brand.' }, { question: 'Can a form collect confirmed marketing consent?', answer: 'Yes. Enable CRM email consent to create the contact, send a confirmation email, and track consent status.' }, { question: 'Can other teams install my form?', answer: 'Yes. Publish it in the Form store to make it installable.' }],
      de: [{ question: 'Braucht ein Formular eine Marke?', answer: 'Nein. Formulare sind eigenständige Team-Ressourcen und werden ohne Marke erstellt.' }, { question: 'Kann ein Formular bestätigte Marketing-Einwilligungen erfassen?', answer: 'Ja. Aktiviere die CRM-E-Mail-Einwilligung, um Kontakte anzulegen, eine Bestätigungs-E-Mail zu senden und den Status zu verfolgen.' }, { question: 'Können andere Teams mein Formular installieren?', answer: 'Ja. Veröffentliche es im Formular-Store, damit es installiert werden kann.' }],
    },
  },
  list: {
    keywords: { en: ['list forms', 'team forms', 'form overview'], de: ['Formulare auflisten', 'Team-Formulare', 'Formularübersicht'] },
    useCases: { en: ['Review every form owned by a team', 'Find a form ID before editing it', 'Check publication status and form URLs'], de: ['Alle Formulare eines Teams prüfen', 'Eine Formular-ID vor der Bearbeitung finden', 'Veröffentlichungsstatus und Formular-URLs prüfen'] },
    category,
  },
  get: {
    keywords: { en: ['get form', 'form details', 'form definition'], de: ['Formular abrufen', 'Formulardetails', 'Formulardefinition'] },
    useCases: { en: ['Read a form before editing fields', 'Retrieve a public form URL', 'Inspect store publication status'], de: ['Ein Formular vor der Feldbearbeitung lesen', 'Eine öffentliche Formular-URL abrufen', 'Den Store-Veröffentlichungsstatus prüfen'] },
    category,
  },
  submissions: {
    keywords: { en: ['form submissions', 'form answers', 'live results', 'responses'], de: ['Formulareinreichungen', 'Formularantworten', 'Live-Ergebnisse', 'Antworten'] },
    useCases: { en: ['Review every answer submitted to a form', 'Show live results during an event or training', 'Check whether customers have submitted yet'], de: ['Alle Antworten eines Formulars prüfen', 'Live-Ergebnisse während eines Events oder Trainings zeigen', 'Prüfen, ob Kunden bereits eingereicht haben'] },
    category,
  },
  'field-add': {
    keywords: { en: ['add form field', 'form input', 'custom form field'], de: ['Formularfeld hinzufügen', 'Formulareingabe', 'Eigenes Formularfeld'] },
    useCases: { en: ['Add an email field to a contact form', 'Add a message textarea', 'Add an optional phone field'], de: ['Ein E-Mail-Feld zu einem Kontaktformular hinzufügen', 'Ein Nachrichtenfeld hinzufügen', 'Ein optionales Telefonfeld hinzufügen'] },
    category,
  },
  'field-update': {
    keywords: { en: ['update form field', 'edit form field', 'required field'], de: ['Formularfeld aktualisieren', 'Formularfeld bearbeiten', 'Pflichtfeld'] },
    useCases: { en: ['Rename a form field', 'Change whether a field is required', 'Update field options or validation'], de: ['Ein Formularfeld umbenennen', 'Den Pflichtfeld-Status ändern', 'Feldoptionen oder Validierung aktualisieren'] },
    category,
  },
  'field-remove': {
    keywords: { en: ['remove form field', 'delete form input'], de: ['Formularfeld entfernen', 'Formulareingabe löschen'] },
    useCases: { en: ['Remove an obsolete field', 'Simplify a form before publishing', 'Replace a field with a different type'], de: ['Ein veraltetes Feld entfernen', 'Ein Formular vor der Veröffentlichung vereinfachen', 'Ein Feld durch einen anderen Typ ersetzen'] },
    category,
  },
  delete: {
    keywords: { en: ['delete form', 'remove form'], de: ['Formular löschen', 'Formular entfernen'] },
    useCases: { en: ['Delete an obsolete form', 'Remove a test form permanently'], de: ['Ein veraltetes Formular löschen', 'Ein Testformular dauerhaft entfernen'] },
    category,
  },
  publish: {
    keywords: { en: ['publish form', 'form store', 'share form template'], de: ['Formular veröffentlichen', 'Formular-Store', 'Formularvorlage teilen'] },
    useCases: { en: ['Offer a contact form template to other teams', 'Publish a reusable registration form'], de: ['Anderen Teams eine Kontaktformular-Vorlage anbieten', 'Ein wiederverwendbares Anmeldeformular veröffentlichen'] },
    category,
  },
  unpublish: {
    keywords: { en: ['unpublish form', 'remove form from store'], de: ['Formular zurückziehen', 'Formular aus Store entfernen'] },
    useCases: { en: ['Stop new installations without deleting a form', 'Remove an outdated template from the store'], de: ['Neue Installationen stoppen, ohne das Formular zu löschen', 'Eine veraltete Vorlage aus dem Store entfernen'] },
    category,
  },
  install: {
    keywords: { en: ['install form', 'form template', 'form store'], de: ['Formular installieren', 'Formularvorlage', 'Formular-Store'] },
    useCases: { en: ['Install a ready-made contact form', 'Copy a registration template into a team'], de: ['Ein fertiges Kontaktformular installieren', 'Eine Anmeldevorlage in ein Team kopieren'] },
    category,
  },
}
