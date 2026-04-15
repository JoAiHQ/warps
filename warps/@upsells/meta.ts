import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'recommend': {
    keywords: {
      en: ['recommend products', 'product recommendations', 'upsell', 'cross-sell', 'suggest products'],
      de: ['Produkte empfehlen', 'Produktempfehlungen', 'Upselling', 'Cross-Selling', 'Produkte vorschlagen'],
      fr: ['recommander des produits', 'recommandations de produits', 'vente additionnelle', 'vente croisee', 'suggerer des produits'],
      es: ['recomendar productos', 'recomendaciones de productos', 'venta adicional', 'venta cruzada', 'sugerir productos'],
      ro: ['recomanda produse', 'recomandari de produse', 'upselling', 'cross-selling', 'sugereaza produse'],
    },
    useCases: {
      en: ['Suggest complementary products after a haircut', 'Recommend skincare products based on treatment history', 'Generate personalized offers for a returning customer'],
      de: ['Ergaenzende Produkte nach einem Haarschnitt vorschlagen', 'Hautpflegeprodukte basierend auf der Behandlungshistorie empfehlen', 'Personalisierte Angebote fuer einen wiederkehrenden Kunden generieren'],
      fr: ['Suggerer des produits complementaires apres une coupe de cheveux', 'Recommander des produits de soin selon l historique de traitement', 'Generer des offres personnalisees pour un client fidele'],
      es: ['Sugerir productos complementarios despues de un corte de pelo', 'Recomendar productos de cuidado basados en el historial de tratamientos', 'Generar ofertas personalizadas para un cliente recurrente'],
      ro: ['Sugereaza produse complementare dupa o tunsoare', 'Recomanda produse de ingrijire pe baza istoricului de tratamente', 'Genereaza oferte personalizate pentru un client fidel'],
    },
    category: 'sales',
    faq: {
      en: [
        {
          question: 'How does the recommendation engine work?',
          answer:
            'The AI analyzes customer purchase history, treatment records, and preferences to suggest the most relevant products or services.',
        },
        {
          question: 'Can I add context to improve recommendations?',
          answer:
            'Yes, you can provide additional context such as what service the customer just received to get more targeted suggestions.',
        },
      ],
      de: [
        {
          question: 'Wie funktioniert die Empfehlungslogik?',
          answer:
            'Die KI analysiert Kaufhistorie, Behandlungsverlaeufe und Praeferenzen des Kunden, um die relevantesten Produkte oder Dienstleistungen vorzuschlagen.',
        },
        {
          question: 'Kann ich Kontext hinzufuegen, um Empfehlungen zu verbessern?',
          answer:
            'Ja, du kannst zusaetzlichen Kontext angeben, z.B. welche Dienstleistung der Kunde gerade erhalten hat, um gezieltere Vorschlaege zu erhalten.',
        },
      ],
      fr: [
        {
          question: 'Comment fonctionne le moteur de recommandation ?',
          answer:
            'L IA analyse l historique d achat, les traitements et les preferences du client pour suggerer les produits ou services les plus pertinents.',
        },
        {
          question: 'Puis-je ajouter du contexte pour ameliorer les recommandations ?',
          answer:
            'Oui, tu peux fournir un contexte supplementaire comme le service que le client vient de recevoir pour obtenir des suggestions plus ciblees.',
        },
      ],
      es: [
        {
          question: 'Como funciona el motor de recomendaciones?',
          answer:
            'La IA analiza el historial de compras, los registros de tratamientos y las preferencias del cliente para sugerir los productos o servicios mas relevantes.',
        },
        {
          question: 'Puedo agregar contexto para mejorar las recomendaciones?',
          answer:
            'Si, puedes proporcionar contexto adicional como el servicio que el cliente acaba de recibir para obtener sugerencias mas dirigidas.',
        },
      ],
      ro: [
        {
          question: 'Cum functioneaza motorul de recomandari?',
          answer:
            'IA analizeaza istoricul de achizitii, inregistrarile de tratamente si preferintele clientului pentru a sugera cele mai relevante produse sau servicii.',
        },
        {
          question: 'Pot adauga context pentru a imbunatati recomandarile?',
          answer:
            'Da, poti furniza context suplimentar, cum ar fi serviciul pe care clientul tocmai l-a primit, pentru a obtine sugestii mai tintite.',
        },
      ],
    },
  },

  'after-visit': {
    keywords: {
      en: ['post-visit', 'after appointment', 'follow-up upsell', 'after treatment', 'visit follow-up'],
      de: ['nach dem Besuch', 'nach dem Termin', 'Follow-up-Upsell', 'nach der Behandlung', 'Besuch-Nachfassung'],
      fr: ['apres la visite', 'apres le rendez-vous', 'vente additionnelle de suivi', 'apres le traitement', 'suivi de visite'],
      es: ['despues de la visita', 'despues de la cita', 'venta adicional de seguimiento', 'despues del tratamiento', 'seguimiento de visita'],
      ro: ['dupa vizita', 'dupa programare', 'upsell de follow-up', 'dupa tratament', 'follow-up vizita'],
    },
    useCases: {
      en: ['Send product recommendations after a facial treatment via WhatsApp', 'Follow up with home care products after a massage', 'Upsell retail products after a salon visit via email'],
      de: ['Produktempfehlungen nach einer Gesichtsbehandlung per WhatsApp senden', 'Mit Heimpflegeprodukten nach einer Massage nachfassen', 'Einzelhandelsprodukte nach einem Salonbesuch per E-Mail upsellen'],
      fr: ['Envoyer des recommandations de produits apres un soin du visage via WhatsApp', 'Relancer avec des produits de soin a domicile apres un massage', 'Vendre des produits en complement apres une visite au salon par email'],
      es: ['Enviar recomendaciones de productos despues de un tratamiento facial por WhatsApp', 'Hacer seguimiento con productos de cuidado en casa despues de un masaje', 'Vender productos adicionales despues de una visita al salon por email'],
      ro: ['Trimite recomandari de produse dupa un tratament facial prin WhatsApp', 'Urmareste cu produse de ingrijire la domiciliu dupa un masaj', 'Upsell produse retail dupa o vizita la salon prin email'],
    },
    category: 'sales',
    faq: {
      en: [
        {
          question: 'When is the post-visit message sent?',
          answer:
            'The message is sent after you trigger it, typically right after a customer visit. You choose the channel (WhatsApp, SMS, or email).',
        },
        {
          question: 'What kind of recommendations are included?',
          answer:
            'Recommendations are based on the service the customer just received, their purchase history, and what products complement their treatment.',
        },
      ],
      de: [
        {
          question: 'Wann wird die Nachricht nach dem Besuch gesendet?',
          answer:
            'Die Nachricht wird gesendet, nachdem du sie ausloest, typischerweise direkt nach einem Kundenbesuch. Du waehlst den Kanal (WhatsApp, SMS oder E-Mail).',
        },
        {
          question: 'Welche Art von Empfehlungen sind enthalten?',
          answer:
            'Empfehlungen basieren auf der Dienstleistung, die der Kunde gerade erhalten hat, seiner Kaufhistorie und welche Produkte seine Behandlung ergaenzen.',
        },
      ],
      fr: [
        {
          question: 'Quand le message post-visite est-il envoye ?',
          answer:
            'Le message est envoye apres que tu le declenches, generalement juste apres la visite d un client. Tu choisis le canal (WhatsApp, SMS ou email).',
        },
        {
          question: 'Quel type de recommandations sont incluses ?',
          answer:
            'Les recommandations sont basees sur le service que le client vient de recevoir, son historique d achat et les produits qui completent son traitement.',
        },
      ],
      es: [
        {
          question: 'Cuando se envia el mensaje post-visita?',
          answer:
            'El mensaje se envia despues de que lo actives, normalmente justo despues de la visita del cliente. Tu eliges el canal (WhatsApp, SMS o email).',
        },
        {
          question: 'Que tipo de recomendaciones se incluyen?',
          answer:
            'Las recomendaciones se basan en el servicio que el cliente acaba de recibir, su historial de compras y los productos que complementan su tratamiento.',
        },
      ],
      ro: [
        {
          question: 'Cand este trimis mesajul dupa vizita?',
          answer:
            'Mesajul este trimis dupa ce il declansezi, de obicei imediat dupa vizita clientului. Tu alegi canalul (WhatsApp, SMS sau email).',
        },
        {
          question: 'Ce tip de recomandari sunt incluse?',
          answer:
            'Recomandarile se bazeaza pe serviciul pe care clientul tocmai l-a primit, istoricul de achizitii si produsele care completeaza tratamentul sau.',
        },
      ],
    },
  },

  'product-alert': {
    keywords: {
      en: ['product alert', 'product notification', 'product recommendation', 'notify customer', 'product suggestion'],
      de: ['Produktbenachrichtigung', 'Produkthinweis', 'Produktempfehlung', 'Kunden benachrichtigen', 'Produktvorschlag'],
      fr: ['alerte produit', 'notification produit', 'recommandation de produit', 'notifier le client', 'suggestion de produit'],
      es: ['alerta de producto', 'notificacion de producto', 'recomendacion de producto', 'notificar al cliente', 'sugerencia de producto'],
      ro: ['alerta de produs', 'notificare de produs', 'recomandare de produs', 'notifica clientul', 'sugestie de produs'],
    },
    useCases: {
      en: ['Alert a customer about a new product that matches their preferences', 'Notify a regular client about a restocked favorite item', 'Send a personalized product recommendation to a VIP customer'],
      de: ['Einen Kunden ueber ein neues Produkt informieren, das seinen Praeferenzen entspricht', 'Einen Stammkunden ueber einen wieder verfuegbaren Lieblingsartikel benachrichtigen', 'Eine personalisierte Produktempfehlung an einen VIP-Kunden senden'],
      fr: ['Alerter un client sur un nouveau produit correspondant a ses preferences', 'Notifier un client regulier d un article favori de nouveau en stock', 'Envoyer une recommandation de produit personnalisee a un client VIP'],
      es: ['Alertar a un cliente sobre un nuevo producto que coincide con sus preferencias', 'Notificar a un cliente regular sobre un articulo favorito reabastecido', 'Enviar una recomendacion de producto personalizada a un cliente VIP'],
      ro: ['Alerteaza un client despre un produs nou care se potriveste preferintelor sale', 'Notifica un client fidel despre un articol favorit revenit in stoc', 'Trimite o recomandare de produs personalizata unui client VIP'],
    },
    category: 'sales',
    faq: {
      en: [
        {
          question: 'How targeted are product alerts?',
          answer:
            'Product alerts are sent to specific customers with a specific product and reason, making them highly personalized and relevant.',
        },
        {
          question: 'Can I explain why the product is relevant?',
          answer:
            'Yes, you can provide a reason for the recommendation, such as "matches your skin type" or "complements your last treatment".',
        },
      ],
      de: [
        {
          question: 'Wie gezielt sind Produktbenachrichtigungen?',
          answer:
            'Produktbenachrichtigungen werden an bestimmte Kunden mit einem bestimmten Produkt und Grund gesendet, was sie hochpersonalisiert und relevant macht.',
        },
        {
          question: 'Kann ich erklaeren, warum das Produkt relevant ist?',
          answer:
            'Ja, du kannst einen Grund fuer die Empfehlung angeben, z.B. "passt zu deinem Hauttyp" oder "ergaenzt deine letzte Behandlung".',
        },
      ],
      fr: [
        {
          question: 'A quel point les alertes produit sont-elles ciblees ?',
          answer:
            'Les alertes produit sont envoyees a des clients specifiques avec un produit et une raison precis, ce qui les rend hautement personnalisees et pertinentes.',
        },
        {
          question: 'Puis-je expliquer pourquoi le produit est pertinent ?',
          answer:
            'Oui, tu peux fournir une raison pour la recommandation, comme "correspond a ton type de peau" ou "complete ton dernier traitement".',
        },
      ],
      es: [
        {
          question: 'Que tan dirigidas son las alertas de productos?',
          answer:
            'Las alertas de productos se envian a clientes especificos con un producto y razon especificos, lo que las hace altamente personalizadas y relevantes.',
        },
        {
          question: 'Puedo explicar por que el producto es relevante?',
          answer:
            'Si, puedes proporcionar una razon para la recomendacion, como "coincide con tu tipo de piel" o "complementa tu ultimo tratamiento".',
        },
      ],
      ro: [
        {
          question: 'Cat de tintite sunt alertele de produs?',
          answer:
            'Alertele de produs sunt trimise catre clienti specifici cu un produs si un motiv specific, facandu-le foarte personalizate si relevante.',
        },
        {
          question: 'Pot explica de ce produsul este relevant?',
          answer:
            'Da, poti furniza un motiv pentru recomandare, cum ar fi "se potriveste tipului tau de piele" sau "completeaza ultimul tau tratament".',
        },
      ],
    },
  },

  'bundle-suggest': {
    keywords: {
      en: ['bundle', 'package deal', 'service package', 'combo offer', 'bundled services'],
      de: ['Paket', 'Paketangebot', 'Dienstleistungspaket', 'Kombi-Angebot', 'gebuendelte Dienste'],
      fr: ['forfait', 'offre groupee', 'forfait de services', 'offre combo', 'services groupes'],
      es: ['paquete', 'oferta combinada', 'paquete de servicios', 'oferta combo', 'servicios combinados'],
      ro: ['pachet', 'oferta pachet', 'pachet de servicii', 'oferta combo', 'servicii combinate'],
    },
    useCases: {
      en: ['Suggest a haircut and color bundle to a regular client', 'Offer a spa day package combining massage and facial', 'Propose a maintenance package with discounted follow-up visits'],
      de: ['Einem Stammkunden ein Haarschnitt-und-Faerbe-Paket vorschlagen', 'Ein Spa-Tagespaket mit Massage und Gesichtsbehandlung anbieten', 'Ein Wartungspaket mit ermaessigten Folgeterminen vorschlagen'],
      fr: ['Suggerer un forfait coupe et couleur a un client regulier', 'Offrir un forfait journee spa combinant massage et soin du visage', 'Proposer un forfait entretien avec des visites de suivi a prix reduit'],
      es: ['Sugerir un paquete de corte y color a un cliente regular', 'Ofrecer un paquete de dia de spa combinando masaje y facial', 'Proponer un paquete de mantenimiento con visitas de seguimiento con descuento'],
      ro: ['Sugereaza un pachet de tuns si vopsit unui client fidel', 'Ofera un pachet de zi la spa combinand masaj si tratament facial', 'Propune un pachet de mentenanta cu vizite de follow-up la pret redus'],
    },
    category: 'sales',
    faq: {
      en: [
        {
          question: 'How are bundles created?',
          answer:
            'You specify the services to include, and the AI creates a compelling bundle offer with a suggested discount for the customer.',
        },
        {
          question: 'Can I customize which services go into a bundle?',
          answer:
            'Yes, you provide a comma-separated list of services, and the AI crafts a personalized bundle proposal.',
        },
      ],
      de: [
        {
          question: 'Wie werden Pakete erstellt?',
          answer:
            'Du gibst die zu enthaltenden Dienstleistungen an, und die KI erstellt ein ueberzeugendes Paketangebot mit einem vorgeschlagenen Rabatt fuer den Kunden.',
        },
        {
          question: 'Kann ich anpassen, welche Dienstleistungen in ein Paket kommen?',
          answer:
            'Ja, du gibst eine kommagetrennte Liste von Dienstleistungen an, und die KI erstellt einen personalisierten Paketvorschlag.',
        },
      ],
      fr: [
        {
          question: 'Comment les forfaits sont-ils crees ?',
          answer:
            'Tu specifies les services a inclure, et l IA cree une offre de forfait convaincante avec une reduction suggeree pour le client.',
        },
        {
          question: 'Puis-je personnaliser quels services composent un forfait ?',
          answer:
            'Oui, tu fournis une liste de services separes par des virgules, et l IA elabore une proposition de forfait personnalisee.',
        },
      ],
      es: [
        {
          question: 'Como se crean los paquetes?',
          answer:
            'Tu especificas los servicios a incluir, y la IA crea una oferta de paquete convincente con un descuento sugerido para el cliente.',
        },
        {
          question: 'Puedo personalizar que servicios van en un paquete?',
          answer:
            'Si, proporcionas una lista de servicios separados por comas, y la IA elabora una propuesta de paquete personalizada.',
        },
      ],
      ro: [
        {
          question: 'Cum sunt create pachetele?',
          answer:
            'Specifici serviciile de inclus, iar IA creeaza o oferta de pachet convingatoare cu o reducere sugerata pentru client.',
        },
        {
          question: 'Pot personaliza ce servicii intra intr-un pachet?',
          answer:
            'Da, furnizezi o lista de servicii separate prin virgula, iar IA elaboreaza o propunere de pachet personalizata.',
        },
      ],
    },
  },

  'weekly-opportunities': {
    keywords: {
      en: ['weekly upsell', 'upsell report', 'sales opportunities', 'weekly sales', 'upsell opportunities'],
      de: ['woechentlicher Upsell', 'Upsell-Bericht', 'Verkaufschancen', 'woechentliche Verkaeufe', 'Upsell-Moeglichkeiten'],
      fr: ['vente additionnelle hebdomadaire', 'rapport de vente additionnelle', 'opportunites de vente', 'ventes hebdomadaires', 'opportunites de vente additionnelle'],
      es: ['venta adicional semanal', 'informe de venta adicional', 'oportunidades de venta', 'ventas semanales', 'oportunidades de venta adicional'],
      ro: ['upsell saptamanal', 'raport de upsell', 'oportunitati de vanzare', 'vanzari saptamanale', 'oportunitati de upsell'],
    },
    useCases: {
      en: ['Receive a weekly overview of the best upsell opportunities', 'Get notified about high-value customers visiting this week', 'Identify which upcoming appointments have upsell potential'],
      de: ['Einen woechentlichen Ueberblick ueber die besten Upsell-Chancen erhalten', 'Ueber hochwertige Kunden benachrichtigt werden, die diese Woche kommen', 'Identifizieren, welche anstehenden Termine Upsell-Potenzial haben'],
      fr: ['Recevoir un apercu hebdomadaire des meilleures opportunites de vente additionnelle', 'Etre notifie des clients a haute valeur visitant cette semaine', 'Identifier quels rendez-vous a venir ont un potentiel de vente additionnelle'],
      es: ['Recibir un resumen semanal de las mejores oportunidades de venta adicional', 'Ser notificado sobre clientes de alto valor que visitan esta semana', 'Identificar que citas proximas tienen potencial de venta adicional'],
      ro: ['Primeste o prezentare saptamanala a celor mai bune oportunitati de upsell', 'Fii notificat despre clientii de valoare mare care viziteaza saptamana aceasta', 'Identifica ce programari viitoare au potential de upsell'],
    },
    category: 'sales',
    faq: {
      en: [
        {
          question: 'How often is the report generated?',
          answer:
            'The report is generated automatically once per week. No input is required — the agent analyzes upcoming appointments and customer data.',
        },
        {
          question: 'What information is included in the report?',
          answer:
            'The report highlights customers with upsell potential, recommended products for each, and the reasoning behind each opportunity.',
        },
      ],
      de: [
        {
          question: 'Wie oft wird der Bericht generiert?',
          answer:
            'Der Bericht wird automatisch einmal pro Woche generiert. Es ist keine Eingabe noetig — der Agent analysiert anstehende Termine und Kundendaten.',
        },
        {
          question: 'Welche Informationen sind im Bericht enthalten?',
          answer:
            'Der Bericht hebt Kunden mit Upsell-Potenzial hervor, empfohlene Produkte fuer jeden und die Begruendung hinter jeder Chance.',
        },
      ],
      fr: [
        {
          question: 'A quelle frequence le rapport est-il genere ?',
          answer:
            'Le rapport est genere automatiquement une fois par semaine. Aucune saisie n est requise — l agent analyse les rendez-vous a venir et les donnees clients.',
        },
        {
          question: 'Quelles informations sont incluses dans le rapport ?',
          answer:
            'Le rapport met en evidence les clients avec un potentiel de vente additionnelle, les produits recommandes pour chacun et le raisonnement derriere chaque opportunite.',
        },
      ],
      es: [
        {
          question: 'Con que frecuencia se genera el informe?',
          answer:
            'El informe se genera automaticamente una vez por semana. No se requiere entrada — el agente analiza las citas proximas y los datos de los clientes.',
        },
        {
          question: 'Que informacion se incluye en el informe?',
          answer:
            'El informe destaca clientes con potencial de venta adicional, productos recomendados para cada uno y el razonamiento detras de cada oportunidad.',
        },
      ],
      ro: [
        {
          question: 'Cat de des este generat raportul?',
          answer:
            'Raportul este generat automat o data pe saptamana. Nu este necesara nicio introducere — agentul analizeaza programarile viitoare si datele clientilor.',
        },
        {
          question: 'Ce informatii sunt incluse in raport?',
          answer:
            'Raportul evidentiaza clientii cu potential de upsell, produsele recomandate pentru fiecare si rationamentul din spatele fiecarei oportunitati.',
        },
      ],
    },
  },
}
