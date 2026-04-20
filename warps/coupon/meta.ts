import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'coupon-create': {
    keywords: {
      en: ['coupon', 'discount', 'promo', 'code', 'create', 'on-chain', 'commerce', 'sale', 'ai', 'ai agent', 'ai-powered', 'automated', 'smart'],
      de: ['gutschein', 'rabatt', 'promo', 'code', 'erstellen', 'on-chain', 'handel', 'sale', 'ki', 'ki-agent', 'ki-gestützt', 'automatisiert', 'smart'],
      fr: ['coupon', 'remise', 'promo', 'code', 'créer', 'on-chain', 'commerce', 'solde', 'ia', 'agent ia', 'ia propulsée', 'automatisé', 'intelligent'],
      es: ['cupón', 'descuento', 'promo', 'código', 'crear', 'on-chain', 'comercio', 'oferta', 'ia', 'agente ia', 'con ia', 'automatizado', 'inteligente'],
      ro: ['cupon', 'reducere', 'promo', 'cod', 'creează', 'on-chain', 'comerț', 'vânzare', 'ia', 'agent ia', 'bazat pe ia', 'automatizat', 'inteligent'],
    },
    useCases: {
      en: [
        'Create a 20% discount coupon for your online store',
        'Issue a single-use promo code for a product launch',
        'Set up time-limited discount codes for a seasonal sale',
        'Generate verifiable on-chain coupons for loyal customers',
      ],
      de: [
        '20%-Rabattgutschein für deinen Online-Shop erstellen',
        'Einmaligen Promo-Code für einen Produktlaunch ausstellen',
        'Zeitlich begrenzte Rabattcodes für einen Saisonschlussverkauf einrichten',
        'Verifizierbare On-Chain-Gutscheine für treue Kunden erstellen',
      ],
      fr: [
        'Créer un coupon 20% pour votre boutique en ligne',
        'Émettre un code promo à usage unique pour un lancement produit',
        'Mettre en place des codes de réduction saisonniers',
        'Générer des coupons on-chain vérifiables pour les clients fidèles',
      ],
      es: [
        'Crear un cupón del 20% para tu tienda online',
        'Emitir un código promo de un solo uso para el lanzamiento de un producto',
        'Configurar códigos de descuento de temporada',
        'Generar cupones on-chain verificables para clientes fieles',
      ],
      ro: [
        'Creează un cupon de 20% pentru magazinul tău online',
        'Emite un cod promoțional de unică folosință pentru lansarea unui produs',
        'Configurează coduri de reducere sezoniere',
        'Generează cupoane on-chain verificabile pentru clienți fideli',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'How are coupon codes stored?',
          answer: 'The coupon code, discount percentage, usage limits, expiry, and all redemption records are stored directly on the MultiversX blockchain — immutable and verifiable by anyone.',
        },
        {
          question: 'Can I limit how many times a coupon can be used?',
          answer: 'Yes — set a max uses limit when creating. Use 0 for unlimited redemptions. The contract enforces the limit automatically.',
        },
        {
          question: 'Can I set an expiry date?',
          answer: 'Yes — choose a validity period (7 days, 30 days, up to 1 year) when creating the coupon. After the expiry the contract rejects all redemption attempts.',
        },
        {
          question: 'Can I revoke a coupon?',
          answer: 'Yes — you can revoke any active coupon you created at any time. It will immediately become invalid for all future redemptions.',
        },
      ],
      de: [
        {
          question: 'Wie werden Gutscheincodes gespeichert?',
          answer: 'Gutscheincode, Rabattprozentsatz, Nutzungslimits, Ablaufdatum und alle Einlösungen werden direkt auf der MultiversX-Blockchain gespeichert — unveränderlich und für jeden prüfbar.',
        },
        {
          question: 'Kann ich einschränken, wie oft ein Gutschein verwendet werden kann?',
          answer: 'Ja — setze beim Erstellen ein Nutzungslimit. Verwende 0 für unbegrenzte Einlösungen. Der Contract erzwingt das Limit automatisch.',
        },
        {
          question: 'Kann ich ein Ablaufdatum festlegen?',
          answer: 'Ja — wähle beim Erstellen eine Gültigkeitsdauer (7 Tage, 30 Tage, bis zu 1 Jahr). Nach Ablauf lehnt der Contract alle Einlösungsversuche ab.',
        },
        {
          question: 'Kann ich einen Gutschein widerrufen?',
          answer: 'Ja — du kannst jeden aktiven Gutschein, den du erstellt hast, jederzeit widerrufen. Er wird sofort für alle zukünftigen Einlösungen ungültig.',
        },
      ],
    },
  },
  'coupon-redeem': {
    keywords: {
      en: ['redeem', 'coupon', 'discount', 'code', 'use', 'apply', 'on-chain', 'checkout'],
      de: ['einlösen', 'gutschein', 'rabatt', 'code', 'verwenden', 'anwenden', 'on-chain', 'checkout'],
      fr: ['utiliser', 'coupon', 'réduction', 'code', 'appliquer', 'on-chain', 'paiement'],
      es: ['canjear', 'cupón', 'descuento', 'código', 'usar', 'aplicar', 'on-chain', 'pago'],
      ro: ['folosește', 'cupon', 'reducere', 'cod', 'aplică', 'on-chain', 'plată'],
    },
    useCases: {
      en: [
        'Redeem a discount coupon code at checkout',
        'Apply an on-chain promo code to a purchase',
        'Use a coupon code issued by a merchant',
        'Verify and record coupon redemption on-chain',
      ],
      de: [
        'Rabattgutscheincode beim Checkout einlösen',
        'On-Chain-Promo-Code für einen Kauf anwenden',
        'Vom Händler ausgestellten Gutscheincode verwenden',
        'Gutscheineinlösung on-chain verifizieren und aufzeichnen',
      ],
      fr: [
        "Utiliser un code promo au moment du paiement",
        "Appliquer un code on-chain à un achat",
        "Utiliser un code coupon émis par un commerçant",
        "Enregistrer l'utilisation d'un coupon on-chain",
      ],
      es: [
        'Canjear un código de descuento al pagar',
        'Aplicar un código on-chain a una compra',
        'Usar un código de cupón emitido por un comerciante',
        'Verificar y registrar el canje on-chain',
      ],
      ro: [
        'Folosește un cod de reducere la plată',
        'Aplică un cod on-chain la o achiziție',
        'Folosește un cod de cupon emis de un comerciant',
        'Verifică și înregistrează folosirea on-chain',
      ],
    },
    category: 'commerce',
    faq: {
      en: [
        {
          question: 'Is redemption recorded on-chain?',
          answer: 'Yes — every redemption is stored on the MultiversX blockchain, providing an immutable audit trail for both merchants and customers.',
        },
        {
          question: 'What happens after I redeem?',
          answer: 'The contract verifies the coupon is valid, increments the usage counter, and returns the discount percentage so you can confirm your saving.',
        },
      ],
      de: [
        {
          question: 'Wird die Einlösung on-chain gespeichert?',
          answer: 'Ja — jede Einlösung wird auf der MultiversX-Blockchain gespeichert und bietet einen unveränderlichen Prüfpfad für Händler und Kunden.',
        },
        {
          question: 'Was passiert nach der Einlösung?',
          answer: 'Der Contract prüft die Gültigkeit des Gutscheins, erhöht den Nutzungszähler und gibt den Rabattprozentsatz zurück.',
        },
      ],
    },
  },
  'coupon-view': {
    keywords: {
      en: ['view', 'coupon', 'details', 'discount', 'status', 'uses', 'remaining', 'expiry'],
      de: ['ansehen', 'gutschein', 'details', 'rabatt', 'status', 'nutzungen', 'verbleibend', 'ablauf'],
      fr: ['voir', 'coupon', 'détails', 'réduction', 'statut', 'utilisations', 'restantes', 'expiration'],
      es: ['ver', 'cupón', 'detalles', 'descuento', 'estado', 'usos', 'restantes', 'vencimiento'],
      ro: ['vezi', 'cupon', 'detalii', 'reducere', 'status', 'utilizări', 'rămase', 'expirare'],
    },
    useCases: {
      en: [
        'Check the discount percentage and remaining uses of a coupon',
        'Verify a coupon is still active before redeeming',
        'See when a coupon expires',
        'Confirm a coupon has not been revoked',
      ],
      de: [
        'Rabattprozentsatz und verbleibende Nutzungen eines Gutscheins prüfen',
        'Vor dem Einlösen prüfen, ob ein Gutschein noch aktiv ist',
        'Ablaufdatum eines Gutscheins einsehen',
        'Bestätigen, dass ein Gutschein nicht widerrufen wurde',
      ],
      fr: [
        "Vérifier le pourcentage de réduction et les utilisations restantes",
        "Vérifier qu'un coupon est encore actif avant de l'utiliser",
        "Voir la date d'expiration d'un coupon",
        "Confirmer qu'un coupon n'a pas été révoqué",
      ],
      es: [
        'Verificar el porcentaje de descuento y usos restantes de un cupón',
        'Comprobar que un cupón sigue activo antes de canjearlo',
        'Ver cuándo caduca un cupón',
        'Confirmar que un cupón no ha sido revocado',
      ],
      ro: [
        'Verifică procentul de reducere și utilizările rămase ale unui cupon',
        'Verifică că un cupon este încă activ înainte de a-l folosi',
        'Vezi când expiră un cupon',
        'Confirmă că un cupon nu a fost revocat',
      ],
    },
    category: 'commerce',
  },
  'coupon-list': {
    keywords: {
      en: ['list', 'my coupons', 'manage', 'owner', 'dashboard', 'on-chain', 'commerce'],
      de: ['liste', 'meine gutscheine', 'verwalten', 'inhaber', 'dashboard', 'on-chain', 'handel'],
      fr: ['liste', 'mes coupons', 'gérer', 'propriétaire', 'tableau de bord', 'on-chain'],
      es: ['lista', 'mis cupones', 'gestionar', 'propietario', 'panel', 'on-chain'],
      ro: ['listă', 'cupoanele mele', 'gestionează', 'proprietar', 'panou', 'on-chain'],
    },
    useCases: {
      en: [
        'See all discount coupons you have created',
        'Get an overview of your active coupons',
        'Look up coupon codes to view or revoke',
      ],
      de: [
        'Alle erstellten Rabattgutscheine ansehen',
        'Überblick über aktive Gutscheine erhalten',
        'Gutscheincodes zum Ansehen oder Widerrufen nachschlagen',
      ],
      fr: [
        'Voir tous les coupons de réduction que vous avez créés',
        'Obtenir un aperçu de vos coupons actifs',
        'Rechercher des codes pour les consulter ou les révoquer',
      ],
      es: [
        'Ver todos los cupones de descuento que has creado',
        'Obtener una visión general de tus cupones activos',
        'Buscar códigos de cupón para verlos o revocarlos',
      ],
      ro: [
        'Vezi toate cupoanele de reducere pe care le-ai creat',
        'Obține o privire de ansamblu a cupoanelor tale active',
        'Caută coduri de cupon pentru a le vizualiza sau revoca',
      ],
    },
    category: 'commerce',
  },
  'coupon-revoke': {
    keywords: {
      en: ['revoke', 'deactivate', 'cancel', 'coupon', 'on-chain', 'owner', 'commerce'],
      de: ['widerrufen', 'deaktivieren', 'stornieren', 'gutschein', 'on-chain', 'inhaber'],
      fr: ['révoquer', 'désactiver', 'annuler', 'coupon', 'on-chain', 'propriétaire'],
      es: ['revocar', 'desactivar', 'cancelar', 'cupón', 'on-chain', 'propietario'],
      ro: ['revocă', 'dezactivează', 'anulează', 'cupon', 'on-chain', 'proprietar'],
    },
    useCases: {
      en: [
        'Deactivate a coupon that is no longer valid',
        'Stop a coupon campaign early',
        'Revoke a compromised or leaked coupon code',
      ],
      de: [
        'Einen nicht mehr gültigen Gutschein deaktivieren',
        'Eine Gutscheinkampagne vorzeitig beenden',
        'Einen kompromittierten oder durchgesickerten Gutscheincode widerrufen',
      ],
      fr: [
        "Désactiver un coupon qui n'est plus valide",
        'Arrêter une campagne de coupons prématurément',
        'Révoquer un code coupon compromis ou divulgué',
      ],
      es: [
        'Desactivar un cupón que ya no es válido',
        'Detener anticipadamente una campaña de cupones',
        'Revocar un código de cupón comprometido o filtrado',
      ],
      ro: [
        'Dezactivează un cupon care nu mai este valid',
        'Oprești o campanie de cupoane anticipat',
        'Revocă un cod de cupon compromis sau scurs',
      ],
    },
    category: 'commerce',
  },
}
