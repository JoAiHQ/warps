import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'create-post': {
    keywords: {
      en: ['create post', 'social media post', 'Instagram post', 'Facebook post', 'LinkedIn post', 'make a post'],
      de: ['Post erstellen', 'Social-Media-Post', 'Instagram-Post', 'Facebook-Post', 'LinkedIn-Post', 'Beitrag erstellen'],
    },
    useCases: {
      en: ['Create a branded Instagram post announcing a new product', 'Generate a Facebook post for a seasonal campaign', 'Make a LinkedIn post sharing a business milestone'],
      de: ['Einen gebrandeten Instagram-Post fuer ein neues Produkt erstellen', 'Einen Facebook-Post fuer eine saisonale Kampagne generieren', 'Einen LinkedIn-Post ueber einen Geschaeftserfolg erstellen'],
    },
    category: 'marketing',
    faq: {
      en: [
        {
          question: 'What platforms are supported for post creation?',
          answer:
            'You can create posts for Instagram, Facebook, and LinkedIn. The AI adapts the format and tone to each platform automatically.',
        },
        {
          question: 'Can I customize the style of the generated post?',
          answer:
            'Yes, you can specify a style or mood such as minimal, bold, elegant, or playful to guide the visual and textual direction.',
        },
      ],
      de: [
        {
          question: 'Welche Plattformen werden fuer die Post-Erstellung unterstuetzt?',
          answer:
            'Du kannst Posts fuer Instagram, Facebook und LinkedIn erstellen. Die KI passt Format und Tonalitaet automatisch an jede Plattform an.',
        },
        {
          question: 'Kann ich den Stil des generierten Posts anpassen?',
          answer:
            'Ja, du kannst einen Stil oder eine Stimmung wie minimalistisch, auffaellig, elegant oder verspielt angeben, um die visuelle und textliche Richtung zu steuern.',
        },
      ],
    },
  },

  'create-story': {
    keywords: {
      en: ['create story', 'Instagram story', 'reel', 'TikTok', 'vertical video', 'stories'],
      de: ['Story erstellen', 'Instagram Story', 'Reel', 'TikTok', 'vertikales Video', 'Stories'],
    },
    useCases: {
      en: ['Create an Instagram story for a daily special', 'Generate a vertical reel showcasing a new service', 'Make a TikTok-style story for a behind-the-scenes look'],
      de: ['Eine Instagram Story fuer ein Tagesangebot erstellen', 'Ein vertikales Reel fuer einen neuen Service generieren', 'Eine TikTok-Story fuer einen Blick hinter die Kulissen erstellen'],
    },
    category: 'marketing',
    faq: {
      en: [
        {
          question: 'What format are stories created in?',
          answer:
            'Stories are created in vertical 9:16 format, optimized for Instagram Stories, Facebook Stories, and TikTok.',
        },
        {
          question: 'Can I create stories for TikTok?',
          answer:
            'Yes, TikTok is available as a target platform alongside Instagram and Facebook.',
        },
      ],
      de: [
        {
          question: 'In welchem Format werden Stories erstellt?',
          answer:
            'Stories werden im vertikalen 9:16-Format erstellt, optimiert fuer Instagram Stories, Facebook Stories und TikTok.',
        },
        {
          question: 'Kann ich Stories fuer TikTok erstellen?',
          answer:
            'Ja, TikTok ist als Zielplattform neben Instagram und Facebook verfuegbar.',
        },
      ],
    },
  },

  'suggest-ideas': {
    keywords: {
      en: ['content ideas', 'post ideas', 'content inspiration', 'content plan', 'what to post'],
      de: ['Content-Ideen', 'Post-Ideen', 'Content-Inspiration', 'Content-Plan', 'was posten'],
    },
    useCases: {
      en: ['Get a week of content ideas for a beauty salon', 'Generate monthly post topics for a restaurant', 'Find inspiration for upcoming holiday content'],
      de: ['Eine Woche Content-Ideen fuer einen Schoenheitssalon erhalten', 'Monatliche Post-Themen fuer ein Restaurant generieren', 'Inspiration fuer kommenden Feiertagscontent finden'],
    },
    category: 'marketing',
    faq: {
      en: [
        {
          question: 'How many ideas are generated at once?',
          answer:
            'The number of ideas depends on the timeframe you select. A weekly plan typically includes 5-7 ideas, while a monthly plan provides 15-20.',
        },
        {
          question: 'Are the ideas tailored to my business?',
          answer:
            'Yes, ideas are based on your business niche and the agent context. You can also specify an industry to get more targeted suggestions.',
        },
      ],
      de: [
        {
          question: 'Wie viele Ideen werden auf einmal generiert?',
          answer:
            'Die Anzahl der Ideen haengt vom gewaehlten Zeitraum ab. Ein Wochenplan enthaelt typischerweise 5-7 Ideen, ein Monatsplan 15-20.',
        },
        {
          question: 'Sind die Ideen auf mein Geschaeft zugeschnitten?',
          answer:
            'Ja, die Ideen basieren auf deiner Branche und dem Agentenkontext. Du kannst auch eine Branche angeben, um gezieltere Vorschlaege zu erhalten.',
        },
      ],
    },
  },

  'create-promotion': {
    keywords: {
      en: ['promotion', 'sale post', 'discount post', 'offer', 'promotional content', 'campaign'],
      de: ['Promotion', 'Angebots-Post', 'Rabatt-Post', 'Aktion', 'Werbecontent', 'Kampagne'],
    },
    useCases: {
      en: ['Create an Easter promotion post with 20% discount', 'Generate a Black Friday campaign visual', 'Make a grand opening announcement for social media'],
      de: ['Einen Oster-Aktionspost mit 20% Rabatt erstellen', 'Ein Black-Friday-Kampagnenvisual generieren', 'Eine Eroeffnungsankuendigung fuer Social Media erstellen'],
    },
    category: 'marketing',
    faq: {
      en: [
        {
          question: 'Can I specify an occasion for the promotion?',
          answer:
            'Yes, you can set an occasion such as Easter, Black Friday, Grand Opening, or Anniversary to tailor the visual and messaging.',
        },
        {
          question: 'Does the promotion include both image and text?',
          answer:
            'Yes, the AI generates both a promotional image and an accompanying caption optimized for the selected platform.',
        },
      ],
      de: [
        {
          question: 'Kann ich einen Anlass fuer die Aktion angeben?',
          answer:
            'Ja, du kannst einen Anlass wie Ostern, Black Friday, Eroeffnung oder Jubilaeum angeben, um Bild und Text anzupassen.',
        },
        {
          question: 'Beinhaltet die Promotion sowohl Bild als auch Text?',
          answer:
            'Ja, die KI generiert sowohl ein Werbebild als auch einen passenden Text, optimiert fuer die gewaehlte Plattform.',
        },
      ],
    },
  },

  'weekly-suggestions': {
    keywords: {
      en: ['weekly content', 'weekly suggestions', 'content schedule', 'weekly plan', 'auto content'],
      de: ['woechentlicher Content', 'woechentliche Vorschlaege', 'Content-Zeitplan', 'Wochenplan', 'automatischer Content'],
    },
    useCases: {
      en: ['Receive automatic weekly content suggestions every Monday', 'Get a push notification with content ideas for the week', 'Let the agent plan content on a weekly schedule'],
      de: ['Automatisch woechentliche Content-Vorschlaege jeden Montag erhalten', 'Eine Push-Benachrichtigung mit Content-Ideen fuer die Woche erhalten', 'Den Agenten Content nach Wochenplan erstellen lassen'],
    },
    category: 'marketing',
    faq: {
      en: [
        {
          question: 'How often are weekly suggestions sent?',
          answer:
            'Suggestions are generated once per week automatically. No input is required — the agent uses your business context.',
        },
        {
          question: 'Can I customize what topics the weekly suggestions cover?',
          answer:
            'The suggestions are based on your business niche and past content. Over time, the agent learns what works best for your audience.',
        },
      ],
      de: [
        {
          question: 'Wie oft werden woechentliche Vorschlaege gesendet?',
          answer:
            'Vorschlaege werden einmal pro Woche automatisch generiert. Es ist keine Eingabe noetig — der Agent nutzt deinen Geschaeftskontext.',
        },
        {
          question: 'Kann ich anpassen, welche Themen die woechentlichen Vorschlaege abdecken?',
          answer:
            'Die Vorschlaege basieren auf deiner Branche und bisherigem Content. Mit der Zeit lernt der Agent, was bei deiner Zielgruppe am besten funktioniert.',
        },
      ],
    },
  },

  'monthly-report': {
    keywords: {
      en: ['monthly report', 'content report', 'content summary', 'performance report', 'monthly recap'],
      de: ['Monatsbericht', 'Content-Bericht', 'Content-Zusammenfassung', 'Performance-Bericht', 'monatliche Zusammenfassung'],
    },
    useCases: {
      en: ['Get a monthly summary of all content created', 'Review content performance insights at the end of the month', 'Receive an automatic monthly content recap'],
      de: ['Eine monatliche Zusammenfassung aller erstellten Inhalte erhalten', 'Content-Performance am Monatsende ueberpruefen', 'Einen automatischen monatlichen Content-Rueckblick erhalten'],
    },
    category: 'marketing',
    faq: {
      en: [
        {
          question: 'What does the monthly report include?',
          answer:
            'The report summarizes all content created during the month, including post types, platforms used, and general performance insights.',
        },
        {
          question: 'Is the monthly report generated automatically?',
          answer:
            'Yes, the report is generated automatically at the end of each month with no input required.',
        },
      ],
      de: [
        {
          question: 'Was beinhaltet der Monatsbericht?',
          answer:
            'Der Bericht fasst alle im Monat erstellten Inhalte zusammen, einschliesslich Post-Typen, verwendeter Plattformen und allgemeiner Performance-Einblicke.',
        },
        {
          question: 'Wird der Monatsbericht automatisch generiert?',
          answer:
            'Ja, der Bericht wird am Ende jedes Monats automatisch generiert, ohne dass eine Eingabe noetig ist.',
        },
      ],
    },
  },
}
