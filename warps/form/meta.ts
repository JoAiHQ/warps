import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  // ── Public warps ─────────────────────────────────────────────────────────

  'submit': {
    keywords: {
      en: ['form', 'lead capture', 'event signup', 'webinar registration', 'qr code form', 'contact form', 'sign up form', 'rsvp form', 'waitlist', 'quote request', 'feedback form', 'no-code form'],
      de: ['Formular', 'Lead-Erfassung', 'Event-Anmeldung', 'Webinar-Registrierung', 'QR-Code-Formular', 'Kontaktformular', 'Anmeldeformular', 'RSVP', 'Warteliste', 'Angebotsanfrage', 'Feedback-Formular'],
      fr: ['formulaire', 'capture de leads', 'inscription evenement', 'inscription webinaire', 'formulaire QR code', 'formulaire de contact', 'RSVP', 'liste d attente', 'demande de devis'],
      es: ['formulario', 'captacion de leads', 'registro de evento', 'inscripcion webinar', 'formulario QR', 'formulario de contacto', 'RSVP', 'lista de espera', 'solicitud de presupuesto'],
      ro: ['formular', 'captare lead-uri', 'inregistrare eveniment', 'inregistrare webinar', 'formular QR', 'formular de contact', 'RSVP', 'lista de asteptare', 'cerere de oferta'],
    },
    useCases: {
      en: [
        'Capture lead information from a QR code displayed at a webinar, seminar, or trade show',
        'Register attendees of a live event as tagged CRM contacts — segment by event, date, or location',
        'Collect walk-in customer details at a physical location: salon, clinic, law firm',
        'Run a lightweight signup form for a landing page, social bio, or email campaign',
        'Collect RSVPs for a product launch, workshop, or networking event',
        'Capture quote requests from potential clients — name, email, company, and notes in one step',
        'Build a waitlist for a new product or service before launch',
        'Replace a static contact page with an interactive, CRM-connected form',
      ],
      de: [
        'Lead-Daten über einen QR-Code bei einem Webinar, Seminar oder einer Messe erfassen',
        'Teilnehmer eines Live-Events als getaggte CRM-Kontakte registrieren — nach Event, Datum oder Ort segmentieren',
        'Walk-in Kundendaten an einem physischen Standort erfassen: Salon, Praxis, Kanzlei',
        'Ein schlankes Anmeldeformular für eine Landingpage, Social-Bio oder E-Mail-Kampagne betreiben',
        'RSVPs für eine Produkteinführung, einen Workshop oder ein Networking-Event erfassen',
        'Angebotsanfragen von Interessenten in einem Schritt erfassen — Name, E-Mail, Unternehmen, Notizen',
        'Eine Warteliste für ein neues Produkt oder eine neue Dienstleistung aufbauen',
        'Eine statische Kontaktseite durch ein interaktives, CRM-verbundenes Formular ersetzen',
      ],
      fr: [
        'Capturer des informations sur les leads via un QR code affiché lors d un webinaire, d un séminaire ou d un salon',
        'Enregistrer les participants d un événement en direct comme contacts CRM taguës — segmenter par événement, date ou lieu',
        'Collecter les données des clients walk-in dans un lieu physique : salon, clinique, cabinet d avocats',
        'Opérer un formulaire d inscription léger pour une landing page, une bio sociale ou une campagne e-mail',
        'Collecter des RSVPs pour un lancement de produit, un atelier ou un événement de networking',
        'Capturer des demandes de devis en une seule étape — nom, e-mail, entreprise et notes',
        'Construire une liste d attente pour un nouveau produit ou service avant le lancement',
        'Remplacer une page de contact statique par un formulaire interactif connecté au CRM',
      ],
      es: [
        'Capturar información de leads desde un código QR mostrado en un webinar, seminario o feria',
        'Registrar asistentes de un evento en vivo como contactos de CRM etiquetados — segmentar por evento, fecha o lugar',
        'Recoger datos de clientes walk-in en un local físico: salón, clínica, bufete de abogados',
        'Operar un formulario de registro ligero para una landing page, bio social o campaña de email',
        'Recoger RSVPs para un lanzamiento de producto, taller o evento de networking',
        'Capturar solicitudes de presupuesto en un solo paso — nombre, email, empresa y notas',
        'Crear una lista de espera para un nuevo producto o servicio antes del lanzamiento',
        'Reemplazar una página de contacto estática por un formulario interactivo conectado al CRM',
      ],
      ro: [
        'Capteaza informatii despre lead-uri printr-un cod QR afisat la un webinar, seminar sau targ',
        'Inregistreaza participantii unui eveniment live ca si contacte CRM tag-uite — segmenteaza dupa eveniment, data sau locatie',
        'Colecteaza datele clientilor walk-in intr-un loc fizic: salon, clinica, cabinet de avocatura',
        'Ruleaza un formular de inregistrare lejer pentru o landing page, bio social sau campanie email',
        'Colecteaza RSVPs pentru un lansare de produs, workshop sau eveniment de networking',
        'Capteaza cereri de oferta intr-un singur pas — nume, email, companie si note',
        'Construieste o lista de asteptare pentru un produs sau serviciu nou inainte de lansare',
        'Inlocuieste o pagina de contact statica cu un formular interactiv conectat la CRM',
      ],
    },
    category: 'sales',
    faq: {
      en: [
        {
          question: 'How does a form submission get into my CRM?',
          answer: 'After the user submits, the form\'s `next` chain calls `@joai-contact-create` with all the collected fields. The contact is created instantly in the agent\'s CRM with the supplied tags — no manual import needed.',
        },
        {
          question: 'Do submitters need to log in or create an account?',
          answer: 'No. Forms are fully public — that is the point of the QR code workflow. The submitter just fills in the fields and hits submit. No app, no account, no friction.',
        },
        {
          question: 'Can I tag submissions by event or source?',
          answer: 'Yes. Add `?tags=webinar-apr-2026` to the form URL and every contact created from that link will carry the tag. Use different tags per QR code to segment by event, channel, or location.',
        },
        {
          question: 'Can I add custom fields to my form?',
          answer: 'Yes. Form definitions are stored on-chain via the Form smart contract. Use `create-form` to register your form, then `add-field` to define exactly which fields you want. The `submit` warp renders whatever fields are defined on-chain.',
        },
        {
          question: 'Is submission data stored on the blockchain?',
          answer: 'No. Only the form definition (field names, labels, types) lives on-chain. Submission data — name, email, phone — is processed by the warp\'s next chain and stored in your private CRM. Nothing private goes on a public ledger.',
        },
        {
          question: 'How do I generate a QR code for my form?',
          answer: 'Use the form\'s site URL: `https://joai.ai/s/{agentSlug}?formId={formId}&tags={eventTag}`. Any QR generator (or the built-in one in JoAi) can turn this into a scannable code you can print or display on screen.',
        },
      ],
      de: [
        {
          question: 'Wie kommt eine Formulareinreichung in mein CRM?',
          answer: 'Nach dem Absenden ruft die `next`-Kette des Formulars `@joai-contact-create` mit allen gesammelten Feldern auf. Der Kontakt wird sofort im CRM des Agents mit den angegebenen Tags erstellt — kein manueller Import nötig.',
        },
        {
          question: 'Müssen Einreichende sich anmelden oder ein Konto erstellen?',
          answer: 'Nein. Formulare sind vollständig öffentlich — das ist der Sinn des QR-Code-Workflows. Einreichende füllen einfach die Felder aus und tippen auf Absenden. Keine App, kein Konto, keine Hürden.',
        },
        {
          question: 'Kann ich Einreichungen nach Event oder Quelle taggen?',
          answer: 'Ja. Füge `?tags=webinar-apr-2026` zur Formular-URL hinzu und jeder über diesen Link erstellte Kontakt trägt den Tag. Verwende verschiedene Tags pro QR-Code, um nach Event, Kanal oder Ort zu segmentieren.',
        },
        {
          question: 'Kann ich benutzerdefinierte Felder hinzufügen?',
          answer: 'Ja. Formulardefinitionen werden on-chain über den Form-Smart-Contract gespeichert. Mit `create-form` registrierst du dein Formular, dann mit `add-field` definierst du die gewünschten Felder.',
        },
        {
          question: 'Werden Einreichungsdaten auf der Blockchain gespeichert?',
          answer: 'Nein. Nur die Formulardefinition (Feldnamen, Labels, Typen) liegt on-chain. Einreichungsdaten — Name, E-Mail, Telefon — werden durch die Next-Kette verarbeitet und in deinem privaten CRM gespeichert.',
        },
        {
          question: 'Wie erstelle ich einen QR-Code für mein Formular?',
          answer: 'Verwende die Formular-Site-URL: `https://joai.ai/s/{agentSlug}?formId={formId}&tags={eventTag}`. Ein QR-Generator (oder der in JoAi integrierte) kann daraus einen druckbaren oder am Bildschirm anzeigbaren Code erstellen.',
        },
      ],
    },
  },

  'complete': {
    keywords: {
      en: ['form completion screen', 'submission confirmed', 'signup success', 'rsvp confirmed', 'custom thank you message'],
      de: ['Formular-Abschlussseite', 'Einreichung bestätigt', 'Anmeldung erfolgreich', 'RSVP bestätigt', 'benutzerdefinierte Dankes-Nachricht'],
      fr: ['ecran de completion formulaire', 'soumission confirmee', 'inscription reussie', 'RSVP confirme', 'message de remerciement personnalise'],
      es: ['pantalla de finalizacion formulario', 'envio confirmado', 'registro exitoso', 'RSVP confirmado', 'mensaje de agradecimiento personalizado'],
      ro: ['ecran finalizare formular', 'trimitere confirmata', 'inregistrare reusita', 'RSVP confirmat', 'mesaj de multumire personalizat'],
    },
    useCases: {
      en: [
        'Show a personalised completion message after a form or RSVP submission',
        'Display a custom message set by the form owner (e.g. "See you at the event!")',
        'Redirect submitters to the next step: booking, content download, or social follow',
      ],
      de: [
        'Nach einer Formular- oder RSVP-Einreichung eine personalisierte Abschlussnachricht anzeigen',
        'Eine vom Formularbesitzer festgelegte benutzerdefinierte Nachricht anzeigen (z.B. "Wir freuen uns auf dich beim Event!")',
        'Einreichende zum nächsten Schritt weiterleiten: Buchung, Content-Download oder Social Follow',
      ],
      fr: [
        'Afficher un message de completion personnalisé après la soumission d un formulaire ou RSVP',
        'Afficher un message personnalisé défini par le propriétaire du formulaire (ex: "À bientôt à l événement !")',
        'Rediriger les soumetteurs vers l étape suivante : réservation, téléchargement de contenu ou suivi social',
      ],
      es: [
        'Mostrar un mensaje de finalización personalizado después del envío de un formulario o RSVP',
        'Mostrar un mensaje personalizado establecido por el propietario del formulario (ej: "¡Nos vemos en el evento!")',
        'Redirigir a los que enviaron el formulario al siguiente paso: reserva, descarga de contenido o seguimiento social',
      ],
      ro: [
        'Afiseaza un mesaj de finalizare personalizat dupa trimiterea unui formular sau RSVP',
        'Afiseaza un mesaj personalizat setat de proprietarul formularului (ex: "Ne vedem la eveniment!")',
        'Redirectioneaza participantii catre pasul urmator: rezervare, descarcare continut sau urmarire sociala',
      ],
    },
    category: 'sales',
    faq: {
      en: [
        {
          question: 'How do I set a custom completion message?',
          answer: 'Use the `set-complete-message` warp to write a custom message to the Form smart contract. It supports `{{name}}` for personalisation. The message is stored on-chain and passed to the completion screen via the `?customMessage=` query param in the `next` chain.',
        },
        {
          question: 'Can I customise the CTA button?',
          answer: 'Yes. The CTA link defaults to the agent\'s site but can be configured in the brand\'s site routes to point to a booking warp, a content piece, or any external URL.',
        },
      ],
      de: [
        {
          question: 'Wie setze ich eine benutzerdefinierte Abschlussnachricht?',
          answer: 'Mit dem `set-complete-message`-Warp kannst du eine benutzerdefinierte Nachricht in den Form-Smart-Contract schreiben. Unterstützt `{{name}}` für Personalisierung. Die Nachricht wird on-chain gespeichert und über den `?customMessage=`-Query-Parameter in der `next`-Kette übergeben.',
        },
        {
          question: 'Kann ich den CTA-Button anpassen?',
          answer: 'Ja. Der CTA-Link zeigt standardmäßig auf die Site des Agents, kann aber in den Site-Routen der Brand auf einen Buchungs-Warp, ein Content-Stück oder eine beliebige externe URL konfiguriert werden.',
        },
      ],
    },
  },

  'set-complete-message': {
    keywords: {
      en: ['custom form message', 'completion message', 'post-submit message', 'personalise form', 'form confirmation text'],
      de: ['benutzerdefinierte Formularnachricht', 'Abschlussnachricht', 'Nachricht nach Einreichung', 'Formular personalisieren'],
      fr: ['message formulaire personnalise', 'message de completion', 'message apres soumission', 'personnaliser formulaire'],
      es: ['mensaje formulario personalizado', 'mensaje de finalizacion', 'mensaje post-envio', 'personalizar formulario'],
      ro: ['mesaj formular personalizat', 'mesaj de finalizare', 'mesaj dupa trimitere', 'personaliza formular'],
    },
    useCases: {
      en: [
        'Set "See you at the WKO event on Tuesday!" as the completion message for a webinar signup form',
        'Tell RSVP submitters what happens next: "We will send you the Zoom link 24 hours before"',
        'Personalise the completion screen by event — each QR code URL carries a different message',
      ],
      de: [
        '"Wir freuen uns auf dich beim WKO-Event am Dienstag!" als Abschlussnachricht für ein Webinar-Formular setzen',
        'RSVP-Einreichenden mitteilen, was als nächstes passiert: "Den Zoom-Link erhältst du 24 Stunden vorher"',
        'Den Abschlussbildschirm pro Event personalisieren — jede QR-Code-URL trägt eine eigene Nachricht',
      ],
      fr: [
        'Définir "À bientôt à l événement WKO mardi !" comme message de completion pour un formulaire webinaire',
        'Informer les participants RSVP de la suite : "Nous vous enverrons le lien Zoom 24 heures avant"',
        'Personnaliser l écran de completion par événement — chaque URL de QR code porte un message différent',
      ],
      es: [
        'Establecer "¡Nos vemos en el evento WKO el martes!" como mensaje de finalización para un formulario de webinar',
        'Informar a los participantes RSVP qué sigue: "Te enviaremos el enlace de Zoom 24 horas antes"',
        'Personalizar la pantalla de finalización por evento — cada URL de código QR lleva un mensaje diferente',
      ],
      ro: [
        'Seteaza "Ne vedem la evenimentul WKO marți!" ca mesaj de finalizare pentru un formular de webinar',
        'Informeaza participantii RSVP ce urmeaza: "Iti vom trimite linkul Zoom cu 24 de ore inainte"',
        'Personalizeaza ecranul de finalizare per eveniment — fiecare URL de cod QR poarta un mesaj diferent',
      ],
    },
    category: 'sales',
    faq: {
      en: [
        {
          question: 'Is the completion message stored on-chain?',
          answer: 'Yes. It is written to the Form smart contract via `setCompleteMessage`. Being on-chain means it is verifiable, permanent, and readable by the warp at render time.',
        },
        {
          question: 'Can I use the submitter\'s name in the message?',
          answer: 'Yes. Use `{{name}}` in your message and it will be replaced with the submitter\'s name at display time.',
        },
      ],
      de: [
        {
          question: 'Wird die Abschlussnachricht on-chain gespeichert?',
          answer: 'Ja. Sie wird über `setCompleteMessage` in den Form-Smart-Contract geschrieben. On-Chain bedeutet: verifizierbar, permanent und zur Rendering-Zeit vom Warp lesbar.',
        },
        {
          question: 'Kann ich den Namen der einreichenden Person in der Nachricht verwenden?',
          answer: 'Ja. Verwende `{{name}}` in deiner Nachricht und es wird zur Anzeigezeit durch den Namen der einreichenden Person ersetzt.',
        },
      ],
    },
  },

  // ── Admin warps ──────────────────────────────────────────────────────────

  'create': {
    keywords: {
      en: ['create form', 'on-chain form', 'register form', 'blockchain form builder', 'lead form setup', 'event form create', 'no-code form builder'],
      de: ['Formular erstellen', 'On-Chain-Formular', 'Formular registrieren', 'Blockchain-Formular', 'Lead-Formular einrichten', 'Event-Formular erstellen'],
      fr: ['creer formulaire', 'formulaire on-chain', 'enregistrer formulaire', 'constructeur de formulaire blockchain', 'creer formulaire evenement'],
      es: ['crear formulario', 'formulario on-chain', 'registrar formulario', 'constructor de formularios blockchain', 'crear formulario de evento'],
      ro: ['crea formular', 'formular on-chain', 'inregistra formular', 'constructor de formulare blockchain', 'creare formular eveniment'],
    },
    useCases: {
      en: [
        'Create a verified, on-chain form definition for a webinar or event',
        'Register a lead capture form with type "lead" so submissions automatically become CRM contacts',
        'Set up an RSVP form for a product launch or workshop',
        'Create a feedback form for post-visit NPS collection',
      ],
      de: [
        'Eine verifizierte, on-chain Formulardefinition für ein Webinar oder Event erstellen',
        'Ein Lead-Erfassungsformular mit Typ "lead" registrieren, damit Einreichungen automatisch zu CRM-Kontakten werden',
        'Ein RSVP-Formular für eine Produkteinführung oder einen Workshop einrichten',
        'Ein Feedback-Formular für die NPS-Erfassung nach einem Besuch erstellen',
      ],
      fr: [
        'Créer une définition de formulaire vérifiée et on-chain pour un webinaire ou un événement',
        'Enregistrer un formulaire de capture de leads de type "lead" pour que les soumissions deviennent automatiquement des contacts CRM',
        'Configurer un formulaire RSVP pour un lancement de produit ou un atelier',
        'Créer un formulaire de feedback pour la collecte NPS après une visite',
      ],
      es: [
        'Crear una definición de formulario verificada y on-chain para un webinar o evento',
        'Registrar un formulario de captura de leads de tipo "lead" para que las respuestas se conviertan automáticamente en contactos CRM',
        'Configurar un formulario RSVP para un lanzamiento de producto o taller',
        'Crear un formulario de feedback para la recopilación NPS después de una visita',
      ],
      ro: [
        'Creaza o definitie de formular verificata si on-chain pentru un webinar sau eveniment',
        'Inregistreaza un formular de captare a lead-urilor de tip "lead" pentru ca trimiterile sa devina automat contacte CRM',
        'Configureaza un formular RSVP pentru un lansare de produs sau workshop',
        'Creaza un formular de feedback pentru colectarea NPS dupa o vizita',
      ],
    },
    category: 'sales',
    faq: {
      en: [
        {
          question: 'What does "on-chain form definition" mean?',
          answer: 'The form\'s structure — its ID, title, type, and field list — is stored permanently on the MultiversX blockchain. This makes the form configuration verifiable, immutable, and readable by AI agents. Submission data itself is never stored on-chain.',
        },
        {
          question: 'What is the form type for?',
          answer: '"lead" forms chain to @joai-contact-create after submission — every submission becomes a CRM contact. "feedback" forms chain to @joai-store-append. "rsvp" forms create a contact tagged with the event. "custom" lets you configure the chain manually.',
        },
        {
          question: 'Can I have multiple forms per agent?',
          answer: 'Yes. Each form has a unique form ID. An agent can own any number of forms — one per event, one for a contact page, one for a waitlist. Query all forms for an agent with `getFormsByAgent`.',
        },
      ],
      de: [
        {
          question: 'Was bedeutet "on-chain Formulardefinition"?',
          answer: 'Die Struktur des Formulars — ID, Titel, Typ und Feldliste — wird dauerhaft auf der MultiversX-Blockchain gespeichert. Dadurch ist die Formularkonfiguration überprüfbar, unveränderlich und für KI-Agenten lesbar. Einreichungsdaten werden nie on-chain gespeichert.',
        },
        {
          question: 'Wofür ist der Formulartyp?',
          answer: '"lead"-Formulare verketten nach der Einreichung mit @joai-contact-create — jede Einreichung wird ein CRM-Kontakt. "feedback"-Formulare verketten mit @joai-store-append. "rsvp"-Formulare erstellen einen Kontakt mit Event-Tag. "custom" ermöglicht manuelle Konfiguration der Kette.',
        },
        {
          question: 'Kann ich mehrere Formulare pro Agent haben?',
          answer: 'Ja. Jedes Formular hat eine eindeutige Form-ID. Ein Agent kann beliebig viele Formulare besitzen — eines pro Event, eines für eine Kontaktseite, eines für eine Warteliste.',
        },
      ],
    },
  },

  'field-add': {
    keywords: {
      en: ['add form field', 'custom form field', 'form builder field', 'on-chain field', 'form customization'],
      de: ['Formularfeld hinzufügen', 'benutzerdefiniertes Feld', 'Formular anpassen', 'On-Chain-Feld'],
      fr: ['ajouter champ formulaire', 'champ personnalise', 'personnalisation formulaire', 'champ on-chain'],
      es: ['agregar campo formulario', 'campo personalizado', 'personalizacion de formulario', 'campo on-chain'],
      ro: ['adauga camp formular', 'camp personalizat', 'personalizare formular', 'camp on-chain'],
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
          answer: 'The field type is immutable once set — it is stored on-chain. To change a type, remove the field and add a new one with the corrected type.',
        },
        {
          question: 'What field types are available?',
          answer: '`string` (short text), `email` (validated email address), `phone` (phone number), `text` (multi-line), `select` (dropdown). More types can be added as the smart contract evolves.',
        },
      ],
      de: [
        {
          question: 'Kann ich den Feldtyp nach dem Hinzufügen ändern?',
          answer: 'Der Feldtyp ist nach dem Setzen unveränderlich — er wird on-chain gespeichert. Um den Typ zu ändern, entferne das Feld und füge es mit dem korrekten Typ neu hinzu.',
        },
        {
          question: 'Welche Feldtypen sind verfügbar?',
          answer: '`string` (kurzer Text), `email` (validierte E-Mail-Adresse), `phone` (Telefonnummer), `text` (mehrzeilig), `select` (Dropdown). Weitere Typen können mit der Weiterentwicklung des Smart Contracts hinzukommen.',
        },
      ],
    },
  },

  'field-update': {
    keywords: {
      en: ['edit form field', 'update field label', 'reorder form fields', 'change field required'],
      de: ['Formularfeld bearbeiten', 'Feldbezeichnung ändern', 'Felder neu anordnen', 'Pflichtfeld ändern'],
      fr: ['modifier champ formulaire', 'changer libelle champ', 'reordonner champs formulaire'],
      es: ['editar campo formulario', 'cambiar etiqueta campo', 'reordenar campos formulario'],
      ro: ['edita camp formular', 'schimba eticheta camp', 'reordona campuri formular'],
    },
    useCases: {
      en: [
        'Rename a field label from "Notes" to "Message" without removing and re-adding the field',
        'Change a field from optional to required after testing the form',
        'Reorder fields to improve the form\'s flow and completion rate',
      ],
      de: [
        'Eine Feldbezeichnung von "Notizen" auf "Nachricht" umbenennen, ohne das Feld zu entfernen und neu hinzuzufügen',
        'Ein Feld nach dem Testen von optional auf Pflichtfeld ändern',
        'Felder neu anordnen, um den Formularfluss und die Ausfüllrate zu verbessern',
      ],
      fr: [
        'Renommer un libellé de champ de "Notes" à "Message" sans supprimer et rajouter le champ',
        'Changer un champ de facultatif à obligatoire après avoir testé le formulaire',
        'Réorganiser les champs pour améliorer le flux du formulaire et le taux de complétion',
      ],
      es: [
        'Renombrar una etiqueta de campo de "Notas" a "Mensaje" sin eliminar y volver a agregar el campo',
        'Cambiar un campo de opcional a obligatorio después de probar el formulario',
        'Reordenar campos para mejorar el flujo del formulario y la tasa de finalización',
      ],
      ro: [
        'Redenumeste o eticheta de camp din "Note" in "Mesaj" fara a sterge si readauga campul',
        'Schimba un camp din optional in obligatoriu dupa testarea formularului',
        'Reordoneaza campurile pentru a imbunatati fluxul formularului si rata de completare',
      ],
    },
    category: 'sales',
    faq: {
      en: [
        {
          question: 'Can I change the field type with this warp?',
          answer: 'No — field type is immutable once set. Only the label, required flag, and position can be updated. To change a type, use `remove-field` and `add-field`.',
        },
      ],
      de: [
        {
          question: 'Kann ich den Feldtyp mit diesem Warp ändern?',
          answer: 'Nein — der Feldtyp ist nach dem Setzen unveränderlich. Nur Beschriftung, Pflichtfeld-Status und Position können aktualisiert werden. Um den Typ zu ändern, `remove-field` und `add-field` verwenden.',
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
          answer: 'No. The removal is permanent and on-chain. The field\'s slug can be re-registered with `add-field` but previous submissions that included that field will have carried the data in the CRM contact notes — it is not lost.',
        },
      ],
      de: [
        {
          question: 'Ist das Entfernen eines Felds umkehrbar?',
          answer: 'Nein. Die Entfernung ist dauerhaft und on-chain. Der Slug des Felds kann mit `add-field` neu registriert werden, aber frühere Einreichungen, die dieses Feld enthielten, haben die Daten in den CRM-Kontaktnotizen getragen — sie gehen nicht verloren.',
        },
      ],
    },
  },

  'set-active': {
    keywords: {
      en: ['pause form', 'close form', 'disable form', 'reopen form', 'form status', 'stop collecting leads'],
      de: ['Formular pausieren', 'Formular schließen', 'Formular deaktivieren', 'Formular wiedereröffnen', 'Lead-Erfassung stoppen'],
      fr: ['suspendre formulaire', 'fermer formulaire', 'desactiver formulaire', 'rouvrir formulaire', 'arreter collecte leads'],
      es: ['pausar formulario', 'cerrar formulario', 'desactivar formulario', 'reabrir formulario', 'detener captura de leads'],
      ro: ['pauza formular', 'inchide formular', 'dezactiveaza formular', 'redeschide formular', 'opreste captarea lead-urilor'],
    },
    useCases: {
      en: [
        'Close a webinar signup form after the event is over',
        'Pause a waitlist form while reviewing applications',
        'Reopen a form for a recurring event without recreating it',
        'Temporarily disable a contact form during a busy period',
      ],
      de: [
        'Ein Webinar-Anmeldeformular nach Ende des Events schließen',
        'Ein Wartelisten-Formular während der Überprüfung von Bewerbungen pausieren',
        'Ein Formular für ein wiederkehrendes Event ohne Neuerstellung wiedereröffnen',
        'Ein Kontaktformular in einer geschäftigen Phase vorübergehend deaktivieren',
      ],
      fr: [
        'Fermer un formulaire d inscription à un webinaire après la fin de l événement',
        'Suspendre un formulaire de liste d attente pendant l examen des candidatures',
        'Rouvrir un formulaire pour un événement récurrent sans le recréer',
        'Désactiver temporairement un formulaire de contact pendant une période chargée',
      ],
      es: [
        'Cerrar un formulario de inscripción a un webinar después de que el evento haya terminado',
        'Pausar un formulario de lista de espera mientras se revisan las solicitudes',
        'Reabrir un formulario para un evento recurrente sin recrearlo',
        'Desactivar temporalmente un formulario de contacto durante un período ocupado',
      ],
      ro: [
        'Inchide un formular de inscriere la un webinar dupa incheierea evenimentului',
        'Pauzeaza un formular de lista de asteptare in timp ce revizuiesti aplicatiile',
        'Redeschide un formular pentru un eveniment recurent fara a-l recrea',
        'Dezactiveaza temporar un formular de contact in timpul unei perioade aglomerate',
      ],
    },
    category: 'sales',
    faq: {
      en: [
        {
          question: 'What happens when someone tries to submit to a paused form?',
          answer: 'The smart contract\'s `recordSubmission` endpoint rejects the transaction with ERR_FORM_INACTIVE. The submitter sees an error indicating the form is not currently accepting responses.',
        },
      ],
      de: [
        {
          question: 'Was passiert, wenn jemand versucht, ein pausiertes Formular einzureichen?',
          answer: 'Der `recordSubmission`-Endpoint des Smart Contracts lehnt die Transaktion mit ERR_FORM_INACTIVE ab. Die einreichende Person sieht einen Fehler, der darauf hinweist, dass das Formular derzeit keine Einreichungen akzeptiert.',
        },
      ],
    },
  },
}
