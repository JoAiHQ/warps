import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'running-onboard': {
    keywords: {
      en: [
        'running setup', 'running profile', 'running plan', 'running goal', 'running onboarding',
        'start running', 'beginner running', '5k plan', '10k plan', 'half marathon plan',
        'running training plan', 'running coach setup', 'running schedule', 'training for a race',
        'couch to 5k', 'learn to run', 'running for beginners', 'improve running',
      ],
      de: [
        'Laufprofil einrichten', 'Laufziel festlegen', 'Trainingsplan starten', 'Lauf-Onboarding',
        'Laufen anfangen', 'Anfänger Laufen', '5km Plan', '10km Plan', 'Halbmarathon Plan',
        'Lauftrainingsplan', 'Lauf-Coach einrichten', 'Trainingsplan für Lauf',
        'Laufen lernen', 'Laufen verbessern', 'mit Laufen beginnen',
      ],
    },
    useCases: {
      en: [
        'Set up a personalized training plan for a first 5K or 10K race',
        'Configure a running coach with your current fitness level and available days',
        'Start a structured running plan as a complete beginner',
        'Train for a specific race with a custom schedule built around your goal and timeline',
        'Build a running habit with a plan that adapts to how many days you can commit to',
      ],
      de: [
        'Einen persönlichen Trainingsplan für den ersten 5K- oder 10K-Lauf einrichten',
        'Den Lauf-Coach mit deinem aktuellen Fitnesslevel und verfügbaren Tagen konfigurieren',
        'Als kompletter Anfänger mit einem strukturierten Laufplan beginnen',
        'Für einen bestimmten Wettkampf mit einem auf Ziel und Zeitplan abgestimmten Plan trainieren',
        'Eine Laufgewohnheit aufbauen mit einem Plan, der sich an deine verfügbaren Tage anpasst',
      ],
    },
    category: 'health',
    faq: {
      en: [
        {
          question: 'Do I need to know my exact pace?',
          answer: 'No — pace is optional. Even a rough estimate helps, but the coach can work with just your current distance and goal.',
        },
        {
          question: 'Can I change my goal or race date later?',
          answer: 'Yes. Run the setup again at any time and the coach will rebuild your plan from your new starting point.',
        },
        {
          question: 'I have never run before — can I still use this?',
          answer: 'Absolutely. Set your current distance to 0 and the plan will start from the very beginning.',
        },
        {
          question: 'What goals are supported?',
          answer: 'Finish a 5K, 10K, or half marathon — or just get fit and stay active. The coach builds different plans for each.',
        },
      ],
      de: [
        {
          question: 'Muss ich mein genaues Tempo kennen?',
          answer: 'Nein — das Tempo ist optional. Auch eine grobe Schätzung hilft, aber der Coach kann auch nur mit Distanz und Ziel arbeiten.',
        },
        {
          question: 'Kann ich Ziel oder Renndatum später ändern?',
          answer: 'Ja. Starte das Setup jederzeit erneut und der Coach erstellt deinen Plan neu.',
        },
        {
          question: 'Ich habe noch nie gelaufen — kann ich das trotzdem nutzen?',
          answer: 'Absolut. Setze deine aktuelle Distanz auf 0 und der Plan beginnt ganz von vorne.',
        },
        {
          question: 'Welche Ziele werden unterstützt?',
          answer: '5K, 10K oder Halbmarathon abschließen — oder einfach fit werden und aktiv bleiben. Der Coach erstellt für jedes Ziel einen anderen Plan.',
        },
      ],
    },
  },

  'running-log': {
    keywords: {
      en: [
        'log run', 'record run', 'track run', 'add run', 'running entry', 'ran today',
        'running journal', 'running tracker', 'running diary', 'running progress',
        'mark run complete', 'post-run feedback', 'running distance', 'running pace',
        'training log', 'running session', 'ran this morning', 'ran km today',
      ],
      de: [
        'Lauf eintragen', 'Lauf aufzeichnen', 'Lauf tracken', 'heute gelaufen',
        'Lauftagebuch', 'Lauf-Tracker', 'Laufdistanz eintragen', 'Lauftempo aufzeichnen',
        'Training protokollieren', 'Laufeinheit eintragen', 'heute Morgen gelaufen',
        'Fortschritt verfolgen', 'Lauf abschließen', 'Feedback nach dem Lauf',
      ],
    },
    useCases: {
      en: [
        'Log a completed run after a morning session and get coached feedback',
        'Record distance and time after a long run to track weekly volume',
        'Track a tempo or interval run with effort level for intensity monitoring',
        'Check whether you are on track with your training plan after each session',
        'Build a running history to see pace and distance improvements over time',
      ],
      de: [
        'Einen abgeschlossenen Lauf nach einer Morgeneinheit eintragen und Coaching-Feedback erhalten',
        'Distanz und Zeit nach einem langen Lauf aufzeichnen, um das Wochenvolumen zu verfolgen',
        'Einen Tempo- oder Intervallauf mit Anstrengungslevel für die Intensitätsüberwachung tracken',
        'Nach jeder Einheit prüfen, ob du mit dem Trainingsplan auf Kurs bist',
        'Eine Laufhistorie aufbauen, um Tempo- und Distanzverbesserungen im Zeitverlauf zu sehen',
      ],
    },
    category: 'health',
    faq: {
      en: [
        {
          question: 'What does the coach do with my run data?',
          answer: 'It calculates your pace, checks if you\'re on track with the plan, adjusts upcoming sessions if needed, and gives honest feedback on effort and progress.',
        },
        {
          question: 'Do I need to log every single run?',
          answer: 'The more you log, the more accurate the coaching gets. But even logging just your long runs once a week gives the coach enough to work with.',
        },
        {
          question: 'What if I ran slower or shorter than planned?',
          answer: 'Log it honestly. The coach will tell you what it means for your plan and what to adjust — not judge you for it.',
        },
        {
          question: 'Can I add notes about how the run felt?',
          answer: 'Yes — there\'s an optional notes field for terrain, weather, how your legs felt, or anything else relevant. The coach uses this context.',
        },
      ],
      de: [
        {
          question: 'Was macht der Coach mit meinen Laufdaten?',
          answer: 'Er berechnet dein Tempo, prüft ob du planmäßig liegst, passt kommende Einheiten bei Bedarf an und gibt ehrliches Feedback zu Anstrengung und Fortschritt.',
        },
        {
          question: 'Muss ich jeden einzelnen Lauf eintragen?',
          answer: 'Je mehr du einträgst, desto genauer wird das Coaching. Aber selbst nur die langen Läufe einmal pro Woche zu loggen gibt dem Coach genug Daten.',
        },
        {
          question: 'Was, wenn ich langsamer oder kürzer als geplant gelaufen bin?',
          answer: 'Trag es ehrlich ein. Der Coach erklärt dir, was das für deinen Plan bedeutet und was anzupassen ist — ohne zu urteilen.',
        },
        {
          question: 'Kann ich Notizen darüber machen, wie der Lauf sich angefühlt hat?',
          answer: 'Ja — es gibt ein optionales Notizfeld für Gelände, Wetter, Beingefühl oder anderes Relevantes. Der Coach nutzt diesen Kontext.',
        },
      ],
    },
  },
}
