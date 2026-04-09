import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'challenge-create': {
    keywords: {
      en: ['challenge', 'stake', 'bet', 'commitment', 'accountability', 'prove', 'egld', 'usdc', 'stablecoin'],
      de: ['challenge', 'einsatz', 'wette', 'verpflichtung', 'verantwortlichkeit', 'beweisen', 'egld', 'usdc', 'stablecoin'],
    },
    useCases: {
      en: [
        'Create a gym challenge and stake EGLD or USDC on showing up',
        'Stake stablecoins on completing a reading goal this week',
        'Put tokens on a cold shower streak',
        'Hold yourself accountable for a diet commitment',
      ],
      de: [
        'Erstelle eine Fitnessstudio-Challenge und setze EGLD oder USDC darauf, dass du erscheinst',
        'Setze Stablecoins auf das Erreichen eines Leseziels diese Woche',
        'Setze Token auf eine Kalt-Dusch-Streak',
        'Halte dich für eine Diät-Verpflichtung verantwortlich',
      ],
    },
    category: 'productivity',
    faq: {
      en: [
        {
          question: 'What happens if I complete the challenge?',
          answer: 'Both you and your challenger get your stakes returned. No one loses money — it\'s pure accountability.',
        },
        {
          question: 'What if I fail?',
          answer: 'Your stake goes to whoever accepted the challenge. That\'s the incentive to follow through.',
        },
        {
          question: 'How is completion verified?',
          answer: 'You submit proof (photo, screenshot, or app data), and the JoAi agent verifies it before resolving the outcome on-chain.',
        },
        {
          question: 'Can I cancel after creating?',
          answer: 'Yes — you can cancel before anyone accepts. Your stake is returned immediately.',
        },
      ],
      de: [
        {
          question: 'Was passiert, wenn ich die Challenge abschließe?',
          answer: 'Du und dein Challenger bekommen eure Einsätze zurück. Niemand verliert Geld — es geht nur um Verantwortlichkeit.',
        },
        {
          question: 'Was, wenn ich scheitere?',
          answer: 'Dein Einsatz geht an denjenigen, der die Challenge angenommen hat. Das ist der Anreiz, durchzuhalten.',
        },
        {
          question: 'Wie wird der Abschluss überprüft?',
          answer: 'Du reichst einen Beweis ein (Foto, Screenshot oder App-Daten), und der JoAi-Agent überprüft ihn, bevor er das Ergebnis on-chain auflöst.',
        },
        {
          question: 'Kann ich nach der Erstellung abbrechen?',
          answer: 'Ja — du kannst abbrechen, bevor jemand annimmt. Dein Einsatz wird sofort zurückgegeben.',
        },
      ],
    },
  },
  'challenge-accept': {
    keywords: {
      en: ['accept', 'match', 'bet', 'take the bet', 'challenge', 'stake'],
      de: ['annehmen', 'angleichen', 'wette', 'wette annehmen', 'challenge', 'einsatz'],
    },
    useCases: {
      en: [
        'Accept a friend\'s gym challenge and bet they will skip',
        'Take the other side of a reading bet',
      ],
      de: [
        'Nimm die Fitnessstudio-Challenge eines Freundes an und wette, dass er aufgibt',
        'Nimm die andere Seite einer Lese-Wette ein',
      ],
    },
    category: 'productivity',
  },
  'challenge-list': {
    keywords: {
      en: ['browse', 'challenges', 'open', 'live', 'available'],
      de: ['entdecken', 'challenges', 'offen', 'live', 'verfügbar'],
    },
    useCases: {
      en: ['Browse open challenges to accept', 'Find challenges to bet against'],
      de: ['Offene Challenges zum Annehmen entdecken', 'Challenges zum Dagegen-Wetten finden'],
    },
    category: 'productivity',
  },
  'challenge-view': {
    keywords: {
      en: ['view', 'challenge', 'details', 'status', 'stake'],
      de: ['ansehen', 'challenge', 'details', 'status', 'einsatz'],
    },
    useCases: {
      en: ['Check the details of a specific challenge', 'See the stake amount before accepting'],
      de: ['Details einer bestimmten Challenge prüfen', 'Einsatzhöhe vor dem Annehmen prüfen'],
    },
    category: 'productivity',
  },
}
