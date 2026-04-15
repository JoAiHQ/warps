import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'get': {
    keywords: {
      en: ['get form', 'fetch form', 'read form definition', 'form details'],
      de: ['Formular abrufen', 'Formular lesen', 'Formulardefinition'],
      fr: ['obtenir formulaire', 'lire formulaire'],
      es: ['obtener formulario', 'leer formulario'],
      ro: ['obtine formular', 'citeste formular'],
    },
    useCases: {
      en: [
        'Read the current definition of a form before adding or editing fields',
        'Check which fields a form currently has',
      ],
      de: [
        'Aktuelle Definition eines Formulars lesen, bevor Felder hinzugefügt oder bearbeitet werden',
        'Prüfen, welche Felder ein Formular aktuell hat',
      ],
      fr: [
        'Lire la définition actuelle d\'un formulaire avant d\'ajouter ou de modifier des champs',
        'Vérifier quels champs un formulaire contient actuellement',
      ],
      es: [
        'Leer la definición actual de un formulario antes de agregar o editar campos',
        'Verificar qué campos tiene actualmente un formulario',
      ],
      ro: [
        'Citeste definitia curenta a unui formular inainte de a adauga sau edita campuri',
        'Verifica ce campuri are in prezent un formular',
      ],
    },
    category: 'sales',
    faq: {},
  },

  'create': {
    keywords: {
      en: ['create form', 'new form', 'form builder', 'lead form setup', 'event form create', 'no-code form builder'],
      de: ['Formular erstellen', 'neues Formular', 'Formular-Builder', 'Lead-Formular einrichten', 'Event-Formular erstellen'],
      fr: ['creer formulaire', 'nouveau formulaire', 'constructeur de formulaire', 'creer formulaire evenement'],
      es: ['crear formulario', 'nuevo formulario', 'constructor de formularios', 'crear formulario de evento'],
      ro: ['crea formular', 'formular nou', 'constructor de formulare', 'creare formular eveniment'],
    },
    useCases: {
      en: [
        'Create a lead capture form for a webinar or event',
        'Set up an RSVP form for a product launch or workshop',
        'Create a feedback form for post-visit NPS collection',
        'Build a waitlist form for a new product or service',
      ],
      de: [
        'Ein Lead-Erfassungsformular für ein Webinar oder Event erstellen',
        'Ein RSVP-Formular für eine Produkteinführung oder einen Workshop einrichten',
        'Ein Feedback-Formular für die NPS-Erfassung nach einem Besuch erstellen',
        'Ein Wartelisten-Formular für ein neues Produkt oder eine Dienstleistung erstellen',
      ],
      fr: [
        'Créer un formulaire de capture de leads pour un webinaire ou un événement',
        'Configurer un formulaire RSVP pour un lancement de produit ou un atelier',
        'Créer un formulaire de feedback pour la collecte NPS après une visite',
        'Construire un formulaire de liste d attente pour un nouveau produit ou service',
      ],
      es: [
        'Crear un formulario de captura de leads para un webinar o evento',
        'Configurar un formulario RSVP para un lanzamiento de producto o taller',
        'Crear un formulario de feedback para la recopilación NPS después de una visita',
        'Construir un formulario de lista de espera para un nuevo producto o servicio',
      ],
      ro: [
        'Creaza un formular de captare a lead-urilor pentru un webinar sau eveniment',
        'Configureaza un formular RSVP pentru un lansare de produs sau workshop',
        'Creaza un formular de feedback pentru colectarea NPS dupa o vizita',
        'Construieste un formular de lista de asteptare pentru un produs sau serviciu nou',
      ],
    },
    category: 'sales',
    faq: {
      en: [
        {
          question: 'What is the form type for?',
          answer: '"lead" forms automatically chain to @joai-contact-create after submission — every submission becomes a CRM contact. "feedback" chains to @joai-store-append. "rsvp" creates a tagged contact. "custom" lets you configure the chain manually.',
        },
        {
          question: 'Can I have multiple forms per agent?',
          answer: 'Yes. Each form is a separate private warp with its own unique ID. An agent can own any number of forms — one per event, one for a contact page, one for a waitlist.',
        },
        {
          question: 'How do submitters access the form?',
          answer: 'Every form gets a public URL at joai.ai/w/{formId}. Share it as a link, embed it in a QR code, or link from a landing page — no account required to submit.',
        },
      ],
      de: [
        {
          question: 'Wofür ist der Formulartyp?',
          answer: '"lead"-Formulare verketten nach der Einreichung automatisch mit @joai-contact-create — jede Einreichung wird ein CRM-Kontakt. "feedback" verbindet mit @joai-store-append. "rsvp" erstellt einen getaggten Kontakt. "custom" ermöglicht manuelle Konfiguration.',
        },
        {
          question: 'Kann ich mehrere Formulare pro Agent haben?',
          answer: 'Ja. Jedes Formular ist ein eigener privater Warp mit eindeutiger ID. Ein Agent kann beliebig viele Formulare besitzen — eines pro Event, eines für eine Kontaktseite, eines für eine Warteliste.',
        },
        {
          question: 'Wie greifen Einsender auf das Formular zu?',
          answer: 'Jedes Formular erhält eine öffentliche URL unter joai.ai/w/{formId}. Als Link teilen, in einen QR-Code einbetten oder von einer Landingpage verlinken — kein Konto erforderlich.',
        },
      ],
    },
  },

  'field-add': {
    keywords: {
      en: ['add form field', 'custom form field', 'form builder field', 'form customization'],
      de: ['Formularfeld hinzufügen', 'benutzerdefiniertes Feld', 'Formular anpassen'],
      fr: ['ajouter champ formulaire', 'champ personnalise', 'personnalisation formulaire'],
      es: ['agregar campo formulario', 'campo personalizado', 'personalizacion de formulario'],
      ro: ['adauga camp formular', 'camp personalizat', 'personalizare formular'],
    },
    useCases: {
      en: [
        'Add a "Company" field to a lead capture form for B2B events',
        'Add a "Job Title" field to segment professional contacts after a conference',
        'Add a "Message" text field to a contact form for open-ended inquiries',
        'Add an "Interest" select field to route leads to the right follow-up sequence',
      ],
      de: [
        'Ein "Unternehmen"-Feld zu einem Lead-Formular für B2B-Events hinzufügen',
        'Ein "Jobtitel"-Feld hinzufügen, um Profi-Kontakte nach einer Konferenz zu segmentieren',
        'Ein "Nachricht"-Textfeld zu einem Kontaktformular für offene Anfragen hinzufügen',
        'Ein "Interesse"-Auswahlfeld hinzufügen, um Leads zur richtigen Follow-up-Sequenz zu routen',
      ],
      fr: [
        'Ajouter un champ "Entreprise" à un formulaire de capture de leads pour des événements B2B',
        'Ajouter un champ "Titre du poste" pour segmenter les contacts professionnels après une conférence',
        'Ajouter un champ texte "Message" à un formulaire de contact pour des demandes ouvertes',
        'Ajouter un champ select "Intérêt" pour router les leads vers la bonne séquence de suivi',
      ],
      es: [
        'Agregar un campo "Empresa" a un formulario de captura de leads para eventos B2B',
        'Agregar un campo "Cargo" para segmentar contactos profesionales después de una conferencia',
        'Agregar un campo de texto "Mensaje" a un formulario de contacto para consultas abiertas',
        'Agregar un campo select "Interés" para enrutar leads a la secuencia de seguimiento correcta',
      ],
      ro: [
        'Adauga un camp "Companie" la un formular de captare a lead-urilor pentru evenimente B2B',
        'Adauga un camp "Titlu job" pentru a segmenta contactele profesionale dupa o conferinta',
        'Adauga un camp text "Mesaj" la un formular de contact pentru cereri deschise',
        'Adauga un camp select "Interes" pentru a direcţiona lead-urile catre secventa de follow-up potrivita',
      ],
    },
    category: 'sales',
    faq: {
      en: [
        {
          question: 'Can I change a field\'s type after adding it?',
          answer: 'Field type cannot be changed once set. To change a type, remove the field and add a new one with the correct type.',
        },
        {
          question: 'What field types are available?',
          answer: '`string` (short text), `email` (validated email), `phone` (phone number), `text` (multi-line), `select` (dropdown), `bool` (yes/no toggle).',
        },
      ],
      de: [
        {
          question: 'Kann ich den Feldtyp nach dem Hinzufügen ändern?',
          answer: 'Der Feldtyp kann nach dem Setzen nicht geändert werden. Um den Typ zu ändern, entferne das Feld und füge es mit dem korrekten Typ neu hinzu.',
        },
        {
          question: 'Welche Feldtypen sind verfügbar?',
          answer: '`string` (kurzer Text), `email` (validierte E-Mail), `phone` (Telefonnummer), `text` (mehrzeilig), `select` (Dropdown), `bool` (Ja/Nein).',
        },
      ],
    },
  },

  'field-update': {
    keywords: {
      en: ['edit form field', 'update field label', 'change field required'],
      de: ['Formularfeld bearbeiten', 'Feldbezeichnung ändern', 'Pflichtfeld ändern'],
      fr: ['modifier champ formulaire', 'changer libelle champ'],
      es: ['editar campo formulario', 'cambiar etiqueta campo'],
      ro: ['edita camp formular', 'schimba eticheta camp'],
    },
    useCases: {
      en: [
        'Rename a field label from "Notes" to "Message" without removing and re-adding the field',
        'Change a field from optional to required after testing the form',
      ],
      de: [
        'Eine Feldbezeichnung von "Notizen" auf "Nachricht" umbenennen, ohne das Feld zu entfernen und neu hinzuzufügen',
        'Ein Feld nach dem Testen von optional auf Pflichtfeld ändern',
      ],
      fr: [
        'Renommer un libellé de champ de "Notes" à "Message" sans supprimer et rajouter le champ',
        'Changer un champ de facultatif à obligatoire après avoir testé le formulaire',
      ],
      es: [
        'Renombrar una etiqueta de campo de "Notas" a "Mensaje" sin eliminar y volver a agregar el campo',
        'Cambiar un campo de opcional a obligatorio después de probar el formulario',
      ],
      ro: [
        'Redenumeste o eticheta de camp din "Note" in "Mesaj" fara a sterge si readauga campul',
        'Schimba un camp din optional in obligatoriu dupa testarea formularului',
      ],
    },
    category: 'sales',
    faq: {
      en: [
        {
          question: 'Can I change the field type with this warp?',
          answer: 'No — field type is immutable once set. Only the label and required flag can be updated. To change a type, use `field-remove` then `field-add`.',
        },
      ],
      de: [
        {
          question: 'Kann ich den Feldtyp mit diesem Warp ändern?',
          answer: 'Nein — der Feldtyp ist unveränderlich. Nur Beschriftung und Pflichtfeld-Status können aktualisiert werden. Um den Typ zu ändern, `field-remove` und `field-add` verwenden.',
        },
      ],
    },
  },

  'field-remove': {
    keywords: {
      en: ['remove form field', 'delete field', 'form cleanup'],
      de: ['Formularfeld entfernen', 'Feld löschen', 'Formular bereinigen'],
      fr: ['supprimer champ formulaire', 'effacer champ', 'nettoyage formulaire'],
      es: ['eliminar campo formulario', 'borrar campo', 'limpiar formulario'],
      ro: ['sterge camp formular', 'elimina camp', 'curata formular'],
    },
    useCases: {
      en: [
        'Remove a field that is no longer relevant after an event is over',
        'Clean up a form by removing unused optional fields',
        'Remove a field before re-adding it with a corrected type',
      ],
      de: [
        'Ein nicht mehr relevantes Feld nach einem Event entfernen',
        'Ein Formular durch Entfernen nicht genutzter optionaler Felder bereinigen',
        'Ein Feld entfernen, bevor es mit dem korrekten Typ neu hinzugefügt wird',
      ],
      fr: [
        'Supprimer un champ qui n est plus pertinent après la fin d un événement',
        'Nettoyer un formulaire en supprimant les champs optionnels inutilisés',
        'Supprimer un champ avant de le rajouter avec le bon type',
      ],
      es: [
        'Eliminar un campo que ya no es relevante después de que un evento haya terminado',
        'Limpiar un formulario eliminando campos opcionales no utilizados',
        'Eliminar un campo antes de volver a agregarlo con el tipo correcto',
      ],
      ro: [
        'Sterge un camp care nu mai este relevant dupa incheierea unui eveniment',
        'Curata un formular prin eliminarea campurilor optionale neutilizate',
        'Sterge un camp inainte de a-l readauga cu tipul corect',
      ],
    },
    category: 'sales',
    faq: {
      en: [
        {
          question: 'Is removing a field reversible?',
          answer: 'No — the removal is permanent. The slug can be re-registered with `field-add` but any submissions that already included that field will have had their data carried through the CRM chain.',
        },
      ],
      de: [
        {
          question: 'Ist das Entfernen eines Felds umkehrbar?',
          answer: 'Nein — die Entfernung ist dauerhaft. Der Slug kann mit `field-add` neu registriert werden, aber frühere Einreichungen haben die Daten bereits durch die CRM-Kette weitergegeben.',
        },
      ],
    },
  },
}
