import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'win-back': {
    keywords: {
      en: ['win back', 'inactive customer', 'lapsed customer', 'customer retention', 'reactivate customer', 'ai', 'ai agent', 'ai-powered', 'automated', 'smart', 'personalized message'],
      de: ['zurueckgewinnen', 'inaktiver Kunde', 'abgewanderter Kunde', 'Kundenbindung', 'Kunden reaktivieren', 'ki', 'ki-agent', 'ki-gestützt', 'automatisiert', 'smart', 'personalisierte Nachricht'],
      fr: ['reconquerir', 'client inactif', 'client perdu', 'retention client', 'reactiver un client', 'ia', 'agent ia', 'ia propulsée', 'automatisé', 'intelligent', 'message personnalisé'],
      es: ['recuperar', 'cliente inactivo', 'cliente perdido', 'retencion de clientes', 'reactivar cliente', 'ia', 'agente ia', 'con ia', 'automatizado', 'inteligente', 'mensaje personalizado'],
      ro: ['recuperare', 'client inactiv', 'client pierdut', 'retentie clienti', 'reactiveaza client', 'ia', 'agent ia', 'bazat pe ia', 'automatizat', 'inteligent', 'mesaj personalizat'],
    },
    useCases: {
      en: ['Send a win-back offer to a customer inactive for 60 days', 'Reach out to lapsed clients with a personalized discount', 'Re-engage a former regular customer with a special promotion'],
      de: ['Ein Win-back-Angebot an einen seit 60 Tagen inaktiven Kunden senden', 'Abgewanderte Kunden mit einem personalisierten Rabatt kontaktieren', 'Einen ehemaligen Stammkunden mit einer Sonderaktion wieder ansprechen'],
      fr: ['Envoyer une offre de reconquete a un client inactif depuis 60 jours', 'Contacter des clients perdus avec une reduction personnalisee', 'Re-engager un ancien client regulier avec une promotion speciale'],
      es: ['Enviar una oferta de recuperacion a un cliente inactivo por 60 dias', 'Contactar clientes perdidos con un descuento personalizado', 'Re-involucrar a un antiguo cliente regular con una promocion especial'],
      ro: ['Trimite o oferta de recuperare unui client inactiv de 60 de zile', 'Contacteaza clientii pierduti cu o reducere personalizata', 'Re-implica un fost client fidel cu o promotie speciala'],
    },
    category: 'engagement',
    faq: {
      en: [
        {
          question: 'What makes a good win-back message?',
          answer:
            'A good win-back message is personalized, acknowledges the customer has been missed, and optionally includes an incentive like a discount or free service.',
        },
        {
          question: 'Can I include a discount or coupon?',
          answer:
            'Yes, you can include an optional offer such as a percentage discount, coupon code, or complimentary add-on service.',
        },
      ],
      de: [
        {
          question: 'Was macht eine gute Win-back-Nachricht aus?',
          answer:
            'Eine gute Win-back-Nachricht ist personalisiert, anerkennt, dass der Kunde vermisst wurde, und enthaelt optional einen Anreiz wie einen Rabatt oder eine kostenlose Leistung.',
        },
        {
          question: 'Kann ich einen Rabatt oder Gutschein hinzufuegen?',
          answer:
            'Ja, du kannst ein optionales Angebot wie einen prozentualen Rabatt, Gutscheincode oder eine kostenlose Zusatzleistung hinzufuegen.',
        },
      ],
      fr: [
        {
          question: 'Qu est-ce qui fait un bon message de reconquete ?',
          answer:
            'Un bon message de reconquete est personnalise, reconnait que le client a manque, et inclut optionnellement un incitatif comme une reduction ou un service gratuit.',
        },
        {
          question: 'Puis-je inclure une reduction ou un coupon ?',
          answer:
            'Oui, tu peux inclure une offre optionnelle comme un pourcentage de reduction, un code coupon ou un service complementaire gratuit.',
        },
      ],
      es: [
        {
          question: 'Que hace un buen mensaje de recuperacion?',
          answer:
            'Un buen mensaje de recuperacion es personalizado, reconoce que el cliente ha sido extrañado, y opcionalmente incluye un incentivo como un descuento o servicio gratuito.',
        },
        {
          question: 'Puedo incluir un descuento o cupon?',
          answer:
            'Si, puedes incluir una oferta opcional como un porcentaje de descuento, codigo de cupon o un servicio complementario gratuito.',
        },
      ],
      ro: [
        {
          question: 'Ce face un mesaj de recuperare bun?',
          answer:
            'Un mesaj de recuperare bun este personalizat, recunoaste ca clientul a fost pierdut din vedere si include optional un stimulent precum o reducere sau un serviciu gratuit.',
        },
        {
          question: 'Pot include o reducere sau un cupon?',
          answer:
            'Da, poti include o oferta optionala precum un procent de reducere, cod de cupon sau un serviciu complementar gratuit.',
        },
      ],
    },
  },

  'birthday': {
    keywords: {
      en: ['birthday', 'birthday greeting', 'birthday offer', 'happy birthday', 'birthday message', 'ai', 'ai-powered', 'automated', 'personalized', 'smart greeting'],
      de: ['Geburtstag', 'Geburtstagsgruss', 'Geburtstagsangebot', 'alles Gute zum Geburtstag', 'Geburtstagsnachricht', 'ki', 'ki-gestützt', 'automatisiert', 'personalisiert', 'smarter Gruß'],
      fr: ['anniversaire', 'voeu d anniversaire', 'offre d anniversaire', 'joyeux anniversaire', 'message d anniversaire', 'ia', 'ia propulsée', 'automatisé', 'personnalisé', 'agent ia'],
      es: ['cumpleanos', 'saludo de cumpleanos', 'oferta de cumpleanos', 'feliz cumpleanos', 'mensaje de cumpleanos', 'ia', 'con ia', 'automatizado', 'personalizado', 'agente ia'],
      ro: ['ziua de nastere', 'felicitare de nastere', 'oferta de nastere', 'la multi ani', 'mesaj de nastere', 'ia', 'bazat pe ia', 'automatizat', 'personalizat', 'agent ia'],
    },
    useCases: {
      en: ['Send a birthday greeting with a 10% discount coupon', 'Wish a loyal customer happy birthday with a free service offer', 'Automatically send birthday messages to all customers this week'],
      de: ['Einen Geburtstagsgruss mit einem 10%-Rabattgutschein senden', 'Einem treuen Kunden zum Geburtstag mit einem kostenlosen Service gratulieren', 'Automatisch Geburtstagsnachrichten an alle Kunden dieser Woche senden'],
      fr: ['Envoyer un voeu d anniversaire avec un coupon de 10% de reduction', 'Souhaiter un joyeux anniversaire a un client fidele avec une offre de service gratuit', 'Envoyer automatiquement des messages d anniversaire a tous les clients cette semaine'],
      es: ['Enviar un saludo de cumpleanos con un cupon de 10% de descuento', 'Desear feliz cumpleanos a un cliente leal con una oferta de servicio gratuito', 'Enviar automaticamente mensajes de cumpleanos a todos los clientes esta semana'],
      ro: ['Trimite o felicitare de ziua de nastere cu un cupon de 10% reducere', 'Ureaza la multi ani unui client fidel cu o oferta de serviciu gratuit', 'Trimite automat mesaje de ziua de nastere tuturor clientilor din aceasta saptamana'],
    },
    category: 'engagement',
    faq: {
      en: [
        {
          question: 'Can I include a special offer with the birthday greeting?',
          answer:
            'Yes, you can optionally include an offer such as a discount, coupon code, or complimentary service with the birthday greeting.',
        },
        {
          question: 'How does the birthday message get personalized?',
          answer:
            'The AI uses the customer name and your business context to craft a warm, personalized birthday message.',
        },
      ],
      de: [
        {
          question: 'Kann ich ein Sonderangebot mit dem Geburtstagsgruss hinzufuegen?',
          answer:
            'Ja, du kannst optional ein Angebot wie einen Rabatt, Gutscheincode oder eine kostenlose Leistung mit dem Geburtstagsgruss hinzufuegen.',
        },
        {
          question: 'Wie wird die Geburtstagsnachricht personalisiert?',
          answer:
            'Die KI nutzt den Kundennamen und deinen Geschaeftskontext, um eine herzliche, personalisierte Geburtstagsnachricht zu erstellen.',
        },
      ],
      fr: [
        {
          question: 'Puis-je inclure une offre speciale avec le voeu d anniversaire ?',
          answer:
            'Oui, tu peux optionnellement inclure une offre comme une reduction, un code coupon ou un service gratuit avec le voeu d anniversaire.',
        },
        {
          question: 'Comment le message d anniversaire est-il personnalise ?',
          answer:
            'L IA utilise le nom du client et le contexte de ton entreprise pour creer un message d anniversaire chaleureux et personnalise.',
        },
      ],
      es: [
        {
          question: 'Puedo incluir una oferta especial con el saludo de cumpleanos?',
          answer:
            'Si, puedes incluir opcionalmente una oferta como un descuento, codigo de cupon o un servicio gratuito con el saludo de cumpleanos.',
        },
        {
          question: 'Como se personaliza el mensaje de cumpleanos?',
          answer:
            'La IA usa el nombre del cliente y el contexto de tu negocio para crear un mensaje de cumpleanos calido y personalizado.',
        },
      ],
      ro: [
        {
          question: 'Pot include o oferta speciala cu felicitarea de ziua de nastere?',
          answer:
            'Da, poti include optional o oferta precum o reducere, cod de cupon sau un serviciu gratuit cu felicitarea de ziua de nastere.',
        },
        {
          question: 'Cum este personalizat mesajul de ziua de nastere?',
          answer:
            'IA foloseste numele clientului si contextul afacerii tale pentru a crea un mesaj de ziua de nastere cald si personalizat.',
        },
      ],
    },
  },

  'post-treatment': {
    keywords: {
      en: ['aftercare', 'post-treatment', 'care instructions', 'treatment follow-up', 'aftercare tips', 'ai', 'ai-powered', 'automated', 'personalized', 'smart follow-up'],
      de: ['Nachsorge', 'nach der Behandlung', 'Pflegeanweisungen', 'Behandlungs-Follow-up', 'Nachsorge-Tipps', 'ki', 'ki-gestützt', 'automatisiert', 'personalisiert', 'smartes Follow-up'],
      fr: ['suivi de traitement', 'apres traitement', 'instructions de soin', 'suivi post-traitement', 'conseils de suivi', 'ia', 'ia propulsée', 'automatisé', 'personnalisé', 'agent ia'],
      es: ['cuidado posterior', 'post-tratamiento', 'instrucciones de cuidado', 'seguimiento de tratamiento', 'consejos de cuidado', 'ia', 'con ia', 'automatizado', 'personalizado', 'agente ia'],
      ro: ['ingrijire post-tratament', 'dupa tratament', 'instructiuni de ingrijire', 'follow-up tratament', 'sfaturi de ingrijire', 'ia', 'bazat pe ia', 'automatizat', 'personalizat', 'agent ia'],
    },
    useCases: {
      en: ['Send aftercare instructions after a facial treatment', 'Follow up with care tips after a hair coloring session', 'Share recovery guidelines after a massage therapy session'],
      de: ['Nachsorge-Anweisungen nach einer Gesichtsbehandlung senden', 'Mit Pflegetipps nach einer Haarfaerbung nachfassen', 'Erholungsrichtlinien nach einer Massagetherapie teilen'],
      fr: ['Envoyer des instructions de suivi apres un soin du visage', 'Relancer avec des conseils de soin apres une coloration', 'Partager des directives de recuperation apres une seance de massage'],
      es: ['Enviar instrucciones de cuidado posterior despues de un tratamiento facial', 'Hacer seguimiento con consejos de cuidado despues de una coloracion', 'Compartir pautas de recuperacion despues de una sesion de masaje'],
      ro: ['Trimite instructiuni de ingrijire dupa un tratament facial', 'Urmareste cu sfaturi de ingrijire dupa o sedinta de vopsit', 'Imparte ghiduri de recuperare dupa o sedinta de masaj terapeutic'],
    },
    category: 'engagement',
    faq: {
      en: [
        {
          question: 'What kind of aftercare instructions can I send?',
          answer:
            'You can send any care instructions relevant to the treatment, such as product usage tips, activity restrictions, or follow-up appointment reminders.',
        },
        {
          question: 'Are the instructions personalized to the treatment?',
          answer:
            'Yes, you specify the treatment and the tips, and the AI crafts a personalized aftercare message for the customer.',
        },
      ],
      de: [
        {
          question: 'Welche Art von Nachsorge-Anweisungen kann ich senden?',
          answer:
            'Du kannst alle behandlungsrelevanten Pflegeanweisungen senden, wie Produktanwendungstipps, Aktivitaetseinschraenkungen oder Erinnerungen an Folgetermine.',
        },
        {
          question: 'Sind die Anweisungen auf die Behandlung zugeschnitten?',
          answer:
            'Ja, du gibst die Behandlung und die Tipps an, und die KI erstellt eine personalisierte Nachsorge-Nachricht fuer den Kunden.',
        },
      ],
      fr: [
        {
          question: 'Quel type d instructions de suivi puis-je envoyer ?',
          answer:
            'Tu peux envoyer toutes les instructions de soin pertinentes au traitement, comme des conseils d utilisation de produits, des restrictions d activite ou des rappels de rendez-vous de suivi.',
        },
        {
          question: 'Les instructions sont-elles personnalisees au traitement ?',
          answer:
            'Oui, tu specifies le traitement et les conseils, et l IA redige un message de suivi personnalise pour le client.',
        },
      ],
      es: [
        {
          question: 'Que tipo de instrucciones de cuidado posterior puedo enviar?',
          answer:
            'Puedes enviar cualquier instruccion de cuidado relevante al tratamiento, como consejos de uso de productos, restricciones de actividad o recordatorios de citas de seguimiento.',
        },
        {
          question: 'Las instrucciones son personalizadas al tratamiento?',
          answer:
            'Si, especificas el tratamiento y los consejos, y la IA elabora un mensaje de cuidado posterior personalizado para el cliente.',
        },
      ],
      ro: [
        {
          question: 'Ce tip de instructiuni de ingrijire pot trimite?',
          answer:
            'Poti trimite orice instructiuni de ingrijire relevante tratamentului, cum ar fi sfaturi de utilizare a produselor, restrictii de activitate sau memento-uri pentru programari de follow-up.',
        },
        {
          question: 'Instructiunile sunt personalizate tratamentului?',
          answer:
            'Da, specifici tratamentul si sfaturile, iar IA redacteaza un mesaj de ingrijire personalizat pentru client.',
        },
      ],
    },
  },

  'reorder-reminder': {
    keywords: {
      en: ['reorder', 'repurchase', 'product reminder', 'buy again', 'restock reminder', 'ai', 'ai-powered', 'automated', 'smart reminder', 'intelligent'],
      de: ['Nachbestellung', 'erneuter Kauf', 'Produkt-Erinnerung', 'nochmal kaufen', 'Nachfuell-Erinnerung', 'ki', 'ki-gestützt', 'automatisiert', 'smarte Erinnerung', 'intelligent'],
      fr: ['recommander', 'rachat', 'rappel de produit', 'racheter', 'rappel de reapprovisionnement', 'ia', 'ia propulsée', 'automatisé', 'rappel intelligent', 'agent ia'],
      es: ['reordenar', 'recompra', 'recordatorio de producto', 'comprar de nuevo', 'recordatorio de reabastecimiento', 'ia', 'con ia', 'automatizado', 'recordatorio inteligente', 'agente ia'],
      ro: ['recomanda', 'recumparare', 'memento de produs', 'cumpara din nou', 'memento de reaprovizionare', 'ia', 'bazat pe ia', 'automatizat', 'memento inteligent', 'agent ia'],
    },
    useCases: {
      en: ['Remind a customer to reorder their shampoo after 30 days', 'Send a repurchase reminder for a skincare product', 'Notify a client that their supplement supply is likely running low'],
      de: ['Einen Kunden an die Nachbestellung seines Shampoos nach 30 Tagen erinnern', 'Eine Nachkauf-Erinnerung fuer ein Hautpflegeprodukt senden', 'Einen Kunden benachrichtigen, dass sein Nahrungsergaenzungsmittel-Vorrat wahrscheinlich knapp wird'],
      fr: ['Rappeler a un client de recommander son shampoing apres 30 jours', 'Envoyer un rappel de rachat pour un produit de soin', 'Notifier un client que son stock de complement est probablement bas'],
      es: ['Recordar a un cliente que reordene su champu despues de 30 dias', 'Enviar un recordatorio de recompra para un producto de cuidado de piel', 'Notificar a un cliente que su suministro de suplementos probablemente se esta agotando'],
      ro: ['Aminteste unui client sa recomande samponul dupa 30 de zile', 'Trimite un memento de recumparare pentru un produs de ingrijire', 'Notifica un client ca stocul de suplimente este probabil pe sfarsit'],
    },
    category: 'engagement',
    faq: {
      en: [
        {
          question: 'How does the reorder reminder know when to send?',
          answer:
            'You trigger the reminder manually or can set it up to run based on typical product usage cycles. The last purchase date helps determine timing.',
        },
        {
          question: 'Can I customize the reminder message?',
          answer:
            'The AI generates a personalized reminder based on the product name and purchase history. The tone matches your business context.',
        },
      ],
      de: [
        {
          question: 'Woher weiss die Nachbestellungs-Erinnerung, wann sie senden soll?',
          answer:
            'Du loest die Erinnerung manuell aus oder kannst sie basierend auf typischen Produktnutzungszyklen einrichten. Das letzte Kaufdatum hilft bei der Timing-Bestimmung.',
        },
        {
          question: 'Kann ich die Erinnerungsnachricht anpassen?',
          answer:
            'Die KI generiert eine personalisierte Erinnerung basierend auf dem Produktnamen und der Kaufhistorie. Der Ton passt zu deinem Geschaeftskontext.',
        },
      ],
      fr: [
        {
          question: 'Comment le rappel de recommande sait-il quand envoyer ?',
          answer:
            'Tu declenches le rappel manuellement ou peux le configurer pour s executer selon les cycles d utilisation typiques du produit. La date du dernier achat aide a determiner le moment.',
        },
        {
          question: 'Puis-je personnaliser le message de rappel ?',
          answer:
            'L IA genere un rappel personnalise base sur le nom du produit et l historique d achat. Le ton correspond au contexte de ton entreprise.',
        },
      ],
      es: [
        {
          question: 'Como sabe el recordatorio de reorden cuando enviar?',
          answer:
            'Tu activas el recordatorio manualmente o puedes configurarlo para ejecutarse segun los ciclos tipicos de uso del producto. La fecha de la ultima compra ayuda a determinar el momento.',
        },
        {
          question: 'Puedo personalizar el mensaje de recordatorio?',
          answer:
            'La IA genera un recordatorio personalizado basado en el nombre del producto y el historial de compras. El tono coincide con el contexto de tu negocio.',
        },
      ],
      ro: [
        {
          question: 'Cum stie memento-ul de recomanda cand sa trimita?',
          answer:
            'Declansezi memento-ul manual sau il poti configura sa ruleze pe baza ciclurilor tipice de utilizare a produsului. Data ultimei achizitii ajuta la determinarea momentului.',
        },
        {
          question: 'Pot personaliza mesajul de memento?',
          answer:
            'IA genereaza un memento personalizat bazat pe numele produsului si istoricul de achizitii. Tonul se potriveste contextului afacerii tale.',
        },
      ],
    },
  },

  'check-in': {
    keywords: {
      en: ['check in', 'customer check-in', 'friendly follow-up', 'how are you', 'touch base', 'ai', 'ai-powered', 'automated', 'personalized', 'smart message'],
      de: ['Nachfragen', 'Kunden-Nachfrage', 'freundliches Follow-up', 'wie geht es', 'sich melden', 'ki', 'ki-gestützt', 'automatisiert', 'personalisiert', 'smarte Nachricht'],
      fr: ['prendre des nouvelles', 'suivi client', 'suivi amical', 'comment allez-vous', 'donner des nouvelles', 'ia', 'ia propulsée', 'automatisé', 'personnalisé', 'agent ia'],
      es: ['seguimiento', 'seguimiento de cliente', 'seguimiento amigable', 'como estas', 'ponerse en contacto', 'ia', 'con ia', 'automatizado', 'personalizado', 'agente ia'],
      ro: ['verificare', 'verificare client', 'follow-up prietenos', 'ce mai faci', 'a lua legatura', 'ia', 'bazat pe ia', 'automatizat', 'personalizat', 'agent ia'],
    },
    useCases: {
      en: ['Send a friendly check-in to a customer who visited 2 weeks ago', 'Reach out to see how a client is doing after their treatment', 'Send a personalized message to a customer with a custom note'],
      de: ['Eine freundliche Nachfrage an einen Kunden senden, der vor 2 Wochen da war', 'Sich erkundigen, wie es einem Kunden nach der Behandlung geht', 'Eine personalisierte Nachricht mit einer benutzerdefinierten Notiz an einen Kunden senden'],
      fr: ['Envoyer un message amical a un client qui a visite il y a 2 semaines', 'Prendre des nouvelles d un client apres son traitement', 'Envoyer un message personnalise a un client avec une note personnalisee'],
      es: ['Enviar un seguimiento amigable a un cliente que visito hace 2 semanas', 'Contactar para ver como esta un cliente despues de su tratamiento', 'Enviar un mensaje personalizado a un cliente con una nota personalizada'],
      ro: ['Trimite o verificare prietenoasa unui client care a vizitat acum 2 saptamani', 'Contacteaza pentru a vedea cum se simte un client dupa tratament', 'Trimite un mesaj personalizat unui client cu o nota personalizata'],
    },
    category: 'engagement',
    faq: {
      en: [
        {
          question: 'What is a check-in message used for?',
          answer:
            'A check-in is a friendly, no-pressure message to stay in touch with customers and show you care about their experience.',
        },
        {
          question: 'Can I add a custom message to the check-in?',
          answer:
            'Yes, you can include an optional custom message that the AI will incorporate into the check-in.',
        },
      ],
      de: [
        {
          question: 'Wofuer wird eine Nachfrage-Nachricht verwendet?',
          answer:
            'Eine Nachfrage ist eine freundliche, unverbindliche Nachricht, um mit Kunden in Kontakt zu bleiben und zu zeigen, dass dir ihre Erfahrung wichtig ist.',
        },
        {
          question: 'Kann ich eine benutzerdefinierte Nachricht zur Nachfrage hinzufuegen?',
          answer:
            'Ja, du kannst eine optionale benutzerdefinierte Nachricht hinzufuegen, die die KI in die Nachfrage einbaut.',
        },
      ],
      fr: [
        {
          question: 'A quoi sert un message de prise de nouvelles ?',
          answer:
            'Une prise de nouvelles est un message amical et sans pression pour rester en contact avec les clients et montrer que tu te soucies de leur experience.',
        },
        {
          question: 'Puis-je ajouter un message personnalise a la prise de nouvelles ?',
          answer:
            'Oui, tu peux inclure un message personnalise optionnel que l IA integrera dans la prise de nouvelles.',
        },
      ],
      es: [
        {
          question: 'Para que se usa un mensaje de seguimiento?',
          answer:
            'Un seguimiento es un mensaje amigable y sin presion para mantenerse en contacto con los clientes y mostrar que te importa su experiencia.',
        },
        {
          question: 'Puedo agregar un mensaje personalizado al seguimiento?',
          answer:
            'Si, puedes incluir un mensaje personalizado opcional que la IA incorporara en el seguimiento.',
        },
      ],
      ro: [
        {
          question: 'Pentru ce se foloseste un mesaj de verificare?',
          answer:
            'O verificare este un mesaj prietenos, fara presiune, pentru a ramane in contact cu clientii si a arata ca iti pasa de experienta lor.',
        },
        {
          question: 'Pot adauga un mesaj personalizat la verificare?',
          answer:
            'Da, poti include un mesaj personalizat optional pe care IA il va integra in verificare.',
        },
      ],
    },
  },

  'inactive-scan': {
    keywords: {
      en: ['inactive customers', 'lapsed customers', 'customer scan', 'dormant customers', 'find inactive', 'ai', 'ai agent', 'ai-powered', 'automated', 'intelligent', 'smart scan'],
      de: ['inaktive Kunden', 'abgewanderte Kunden', 'Kunden-Scan', 'ruhende Kunden', 'Inaktive finden', 'ki', 'ki-agent', 'ki-gestützt', 'automatisiert', 'intelligent', 'smarter Scan'],
      fr: ['clients inactifs', 'clients perdus', 'analyse des clients', 'clients dormants', 'trouver les inactifs', 'ia', 'agent ia', 'ia propulsée', 'automatisé', 'intelligent', 'analyse intelligente'],
      es: ['clientes inactivos', 'clientes perdidos', 'escaneo de clientes', 'clientes dormidos', 'encontrar inactivos', 'ia', 'agente ia', 'con ia', 'automatizado', 'inteligente', 'análisis inteligente'],
      ro: ['clienti inactivi', 'clienti pierduti', 'scanare clienti', 'clienti dormanti', 'gaseste inactivi', 'ia', 'agent ia', 'bazat pe ia', 'automatizat', 'inteligent', 'analiza inteligenta'],
    },
    useCases: {
      en: ['Automatically find all customers who haven\'t visited in 30+ days', 'Get a weekly list of inactive customers with suggested actions', 'Identify at-risk customers before they churn'],
      de: ['Automatisch alle Kunden finden, die seit 30+ Tagen nicht mehr da waren', 'Eine woechentliche Liste inaktiver Kunden mit vorgeschlagenen Aktionen erhalten', 'Gefaehrdete Kunden identifizieren, bevor sie abwandern'],
      fr: ['Trouver automatiquement tous les clients qui n ont pas visite depuis plus de 30 jours', 'Obtenir une liste hebdomadaire de clients inactifs avec des actions suggerees', 'Identifier les clients a risque avant qu ils ne partent'],
      es: ['Encontrar automaticamente todos los clientes que no han visitado en mas de 30 dias', 'Obtener una lista semanal de clientes inactivos con acciones sugeridas', 'Identificar clientes en riesgo antes de que se vayan'],
      ro: ['Gaseste automat toti clientii care nu au vizitat de peste 30 de zile', 'Primeste o lista saptamanala de clienti inactivi cu actiuni sugerate', 'Identifica clientii cu risc inainte sa plece'],
    },
    category: 'engagement',
    faq: {
      en: [
        {
          question: 'How often does the inactive scan run?',
          answer:
            'The scan runs automatically on a scheduled basis. No input is required — the agent checks customer visit data automatically.',
        },
        {
          question: 'What threshold is used for inactivity?',
          answer:
            'The default threshold is 30 days since the last visit. Customers who haven\'t visited within this period are flagged for follow-up.',
        },
      ],
      de: [
        {
          question: 'Wie oft laeuft der Inaktivitaets-Scan?',
          answer:
            'Der Scan laeuft automatisch nach Zeitplan. Es ist keine Eingabe noetig — der Agent prueft Kundenbesuchsdaten automatisch.',
        },
        {
          question: 'Welcher Schwellenwert wird fuer Inaktivitaet verwendet?',
          answer:
            'Der Standard-Schwellenwert liegt bei 30 Tagen seit dem letzten Besuch. Kunden, die innerhalb dieses Zeitraums nicht besucht haben, werden fuer ein Follow-up markiert.',
        },
      ],
      fr: [
        {
          question: 'A quelle frequence l analyse d inactivite s execute-t-elle ?',
          answer:
            'L analyse s execute automatiquement selon un calendrier. Aucune saisie n est requise — l agent verifie automatiquement les donnees de visite des clients.',
        },
        {
          question: 'Quel seuil est utilise pour l inactivite ?',
          answer:
            'Le seuil par defaut est de 30 jours depuis la derniere visite. Les clients qui n ont pas visite dans cette periode sont signales pour un suivi.',
        },
      ],
      es: [
        {
          question: 'Con que frecuencia se ejecuta el escaneo de inactividad?',
          answer:
            'El escaneo se ejecuta automaticamente de forma programada. No se requiere entrada — el agente verifica los datos de visita de los clientes automaticamente.',
        },
        {
          question: 'Que umbral se usa para la inactividad?',
          answer:
            'El umbral predeterminado es de 30 dias desde la ultima visita. Los clientes que no han visitado dentro de este periodo son marcados para seguimiento.',
        },
      ],
      ro: [
        {
          question: 'Cat de des ruleaza scanarea de inactivitate?',
          answer:
            'Scanarea ruleaza automat conform unui program. Nu este necesara nicio introducere — agentul verifica automat datele de vizita ale clientilor.',
        },
        {
          question: 'Ce prag este folosit pentru inactivitate?',
          answer:
            'Pragul implicit este de 30 de zile de la ultima vizita. Clientii care nu au vizitat in aceasta perioada sunt marcati pentru follow-up.',
        },
      ],
    },
  },

  'birthday-scan': {
    keywords: {
      en: ['birthday scan', 'upcoming birthdays', 'birthday list', 'birthday reminders', 'birthday check', 'ai', 'ai agent', 'ai-powered', 'automated', 'smart scan'],
      de: ['Geburtstags-Scan', 'bevorstehende Geburtstage', 'Geburtstagsliste', 'Geburtstags-Erinnerungen', 'Geburtstags-Check', 'ki', 'ki-agent', 'ki-gestützt', 'automatisiert', 'smarter Scan'],
      fr: ['analyse d anniversaires', 'anniversaires a venir', 'liste d anniversaires', 'rappels d anniversaire', 'verification d anniversaires', 'ia', 'agent ia', 'ia propulsée', 'automatisé', 'analyse intelligente'],
      es: ['escaneo de cumpleanos', 'cumpleanos proximos', 'lista de cumpleanos', 'recordatorios de cumpleanos', 'verificacion de cumpleanos', 'ia', 'agente ia', 'con ia', 'automatizado', 'análisis inteligente'],
      ro: ['scanare zile de nastere', 'zile de nastere viitoare', 'lista de zile de nastere', 'memento-uri de nastere', 'verificare zile de nastere', 'ia', 'agent ia', 'bazat pe ia', 'automatizat', 'analiza inteligenta'],
    },
    useCases: {
      en: ['Automatically get a list of customers with birthdays this week', 'Never miss a customer birthday with automatic scanning', 'Plan birthday greetings ahead of time with weekly birthday reports'],
      de: ['Automatisch eine Liste von Kunden mit Geburtstagen diese Woche erhalten', 'Keinen Kundengeburtstag mit automatischem Scanning verpassen', 'Geburtstagsgruesse im Voraus mit woechentlichen Geburtstagsberichten planen'],
      fr: ['Obtenir automatiquement une liste de clients avec des anniversaires cette semaine', 'Ne jamais manquer un anniversaire client avec l analyse automatique', 'Planifier les voeux d anniversaire a l avance avec des rapports hebdomadaires'],
      es: ['Obtener automaticamente una lista de clientes con cumpleanos esta semana', 'Nunca perder un cumpleanos de cliente con escaneo automatico', 'Planificar saludos de cumpleanos con anticipacion con informes semanales'],
      ro: ['Primeste automat o lista de clienti cu zile de nastere saptamana aceasta', 'Nu rata niciodata o zi de nastere a unui client cu scanarea automata', 'Planifica felicitarile de nastere din timp cu rapoarte saptamanale'],
    },
    category: 'engagement',
    faq: {
      en: [
        {
          question: 'How far ahead does the birthday scan look?',
          answer:
            'The scan identifies customers with birthdays in the next 7 days, giving you time to prepare and send greetings.',
        },
        {
          question: 'Does the scan send birthday messages automatically?',
          answer:
            'No, the scan only identifies upcoming birthdays. You can then use the Birthday greeting warp to send personalized messages.',
        },
      ],
      de: [
        {
          question: 'Wie weit im Voraus schaut der Geburtstags-Scan?',
          answer:
            'Der Scan identifiziert Kunden mit Geburtstagen in den naechsten 7 Tagen, damit du Zeit hast, Gruesse vorzubereiten und zu senden.',
        },
        {
          question: 'Sendet der Scan automatisch Geburtstagsnachrichten?',
          answer:
            'Nein, der Scan identifiziert nur bevorstehende Geburtstage. Du kannst dann den Geburtstagsgruss-Warp nutzen, um personalisierte Nachrichten zu senden.',
        },
      ],
      fr: [
        {
          question: 'Combien de temps a l avance l analyse d anniversaires regarde-t-elle ?',
          answer:
            'L analyse identifie les clients dont l anniversaire est dans les 7 prochains jours, te donnant le temps de preparer et d envoyer des voeux.',
        },
        {
          question: 'L analyse envoie-t-elle automatiquement des messages d anniversaire ?',
          answer:
            'Non, l analyse identifie seulement les anniversaires a venir. Tu peux ensuite utiliser le warp de voeu d anniversaire pour envoyer des messages personnalises.',
        },
      ],
      es: [
        {
          question: 'Con cuanta anticipacion mira el escaneo de cumpleanos?',
          answer:
            'El escaneo identifica clientes con cumpleanos en los proximos 7 dias, dandote tiempo para preparar y enviar saludos.',
        },
        {
          question: 'El escaneo envia mensajes de cumpleanos automaticamente?',
          answer:
            'No, el escaneo solo identifica cumpleanos proximos. Luego puedes usar el warp de saludo de cumpleanos para enviar mensajes personalizados.',
        },
      ],
      ro: [
        {
          question: 'Cat de departe in viitor se uita scanarea de zile de nastere?',
          answer:
            'Scanarea identifica clientii cu zile de nastere in urmatoarele 7 zile, oferindu-ti timp sa pregatesti si sa trimiti felicitari.',
        },
        {
          question: 'Scanarea trimite automat mesaje de ziua de nastere?',
          answer:
            'Nu, scanarea doar identifica zilele de nastere viitoare. Poti apoi folosi warp-ul de felicitare de nastere pentru a trimite mesaje personalizate.',
        },
      ],
    },
  },
}
