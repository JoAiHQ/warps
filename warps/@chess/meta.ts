import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  create: {
    keywords: {
      en: ['chess', 'on-chain chess', 'blockchain chess', 'create chess game', 'challenge opponent', 'multiversx chess'],
      de: ['Schach', 'On-Chain-Schach', 'Blockchain-Schach', 'Schachspiel erstellen', 'Gegner herausfordern', 'MultiversX Schach'],
    },
    useCases: {
      en: [
        'Start a new on-chain chess match and invite an opponent',
        'Challenge a friend to a blockchain-recorded chess game',
        'Create an open game and wait for someone to join',
      ],
      de: [
        'Starte ein neues On-Chain-Schachspiel und lade einen Gegner ein',
        'Fordere einen Freund zu einem auf der Blockchain gespeicherten Schachspiel heraus',
        'Erstelle ein offenes Spiel und warte auf einen Mitspieler',
      ],
    },
    category: 'social',
    faq: {
      en: [
        { question: 'How do I start a chess game?', answer: 'Click "New Game" to create a game. You play as white. Share the game link with your opponent so they can join as black.' },
        { question: 'Is the game fully on-chain?', answer: 'Yes. Every move is a blockchain transaction on MultiversX, making the entire game history immutable and verifiable.' },
        { question: 'Can I play against myself?', answer: 'No, you need a different wallet address as your opponent. Each game needs two distinct players.' },
      ],
      de: [
        { question: 'Wie starte ich ein Schachspiel?', answer: 'Klicke auf "Neues Spiel" um ein Spiel zu erstellen. Du spielst als Weiß. Teile den Spiel-Link mit deinem Gegner, damit er als Schwarz beitreten kann.' },
        { question: 'Läuft das Spiel komplett On-Chain?', answer: 'Ja. Jeder Zug ist eine Blockchain-Transaktion auf MultiversX. Der gesamte Spielverlauf ist unveränderlich und überprüfbar.' },
        { question: 'Kann ich gegen mich selbst spielen?', answer: 'Nein, du brauchst eine andere Wallet-Adresse als Gegner. Jedes Spiel braucht zwei verschiedene Spieler.' },
      ],
    },
  },
  game: {
    keywords: {
      en: ['play chess', 'chess board', 'make a move', 'on-chain chess game', 'chess move', 'checkmate'],
      de: ['Schach spielen', 'Schachbrett', 'Zug machen', 'On-Chain-Schachspiel', 'Schachzug', 'Schachmatt'],
    },
    useCases: {
      en: [
        'Play your turn in an active chess game with an interactive board',
        'View the current board position and move history',
        'Make legal moves with visual highlights and piece selection',
      ],
      de: [
        'Spiele deinen Zug in einem aktiven Schachspiel mit interaktivem Brett',
        'Sieh die aktuelle Brettstellung und den Zugverlauf',
        'Mache legale Züge mit visueller Hervorhebung und Figurenauswahl',
      ],
    },
    category: 'social',
    faq: {
      en: [
        { question: 'How do I make a move?', answer: 'Click on one of your pieces to select it, then click on a highlighted square to move. Legal destinations are shown automatically.' },
        { question: 'What happens when I capture the king?', answer: 'If a king is captured, the game ends immediately. The capturing player wins.' },
        { question: 'Does the contract validate my moves?', answer: 'Yes, the smart contract validates turn order, piece ownership, movement patterns, and path clearance for sliding pieces.' },
      ],
      de: [
        { question: 'Wie mache ich einen Zug?', answer: 'Klicke auf eine deiner Figuren um sie auszuwählen, dann klicke auf ein hervorgehobenes Feld zum Ziehen. Legale Zielfelder werden automatisch angezeigt.' },
        { question: 'Was passiert wenn ich den König schlage?', answer: 'Wenn ein König geschlagen wird, endet das Spiel sofort. Der schlagende Spieler gewinnt.' },
        { question: 'Validiert der Contract meine Züge?', answer: 'Ja, der Smart Contract validiert Zugreihenfolge, Figurenbesitz, Bewegungsmuster und Wegfreiheit für gleitende Figuren.' },
      ],
    },
  },
  list: {
    keywords: {
      en: ['my chess games', 'active games', 'game history', 'chess matches', 'ongoing chess'],
      de: ['meine Schachspiele', 'aktive Spiele', 'Spielverlauf', 'Schachpartien', 'laufende Spiele'],
    },
    useCases: {
      en: [
        'See all your chess games including active and finished ones',
        'Quickly find games where it is your turn to move',
        'Review completed game results',
      ],
      de: [
        'Sieh alle deine Schachspiele, sowohl aktive als auch beendete',
        'Finde schnell Spiele, in denen du am Zug bist',
        'Überprüfe abgeschlossene Spielergebnisse',
      ],
    },
    category: 'social',
    faq: {
      en: [
        { question: 'Can I see games I have already finished?', answer: 'Yes, all your games are listed including completed ones with their results.' },
        { question: 'How do I know when it is my turn?', answer: 'Active games where it is your turn are highlighted in the game list.' },
      ],
      de: [
        { question: 'Kann ich beendete Spiele sehen?', answer: 'Ja, alle deine Spiele werden aufgelistet, einschließlich der beendeten mit ihren Ergebnissen.' },
        { question: 'Wie erkenne ich, dass ich am Zug bin?', answer: 'Aktive Spiele, in denen du am Zug bist, werden in der Spielliste hervorgehoben.' },
      ],
    },
  },
  'move': {
    keywords: { en: ['chess move', 'submit move', 'on-chain move'], de: ['Schachzug', 'Zug senden', 'On-Chain-Zug'] },
    useCases: { en: ['Submit a chess move as an on-chain transaction'], de: ['Sende einen Schachzug als On-Chain-Transaktion'] },
    category: 'social',
    faq: {
      en: [{ question: 'How are moves recorded?', answer: 'Each move is a blockchain transaction, creating an immutable record of the entire game.' }],
      de: [{ question: 'Wie werden Züge gespeichert?', answer: 'Jeder Zug ist eine Blockchain-Transaktion und erzeugt einen unveränderlichen Eintrag des gesamten Spiels.' }],
    },
  },
  'join': {
    keywords: { en: ['join chess game', 'accept challenge', 'play black'], de: ['Schachspiel beitreten', 'Herausforderung annehmen', 'Schwarz spielen'] },
    useCases: { en: ['Join an open chess game and play as black'], de: ['Tritt einem offenen Schachspiel bei und spiele als Schwarz'] },
    category: 'social',
    faq: {
      en: [{ question: 'What side do I play when joining?', answer: 'The player who joins always plays as black, while the creator plays as white.' }],
      de: [{ question: 'Welche Seite spiele ich beim Beitreten?', answer: 'Der beitretende Spieler spielt immer als Schwarz, während der Ersteller als Weiß spielt.' }],
    },
  },
  'resign': {
    keywords: { en: ['resign chess', 'give up', 'forfeit game'], de: ['Schach aufgeben', 'Resignieren', 'Spiel forfeiten'] },
    useCases: { en: ['Resign from a chess game you cannot win'], de: ['Gib ein Schachspiel auf, das du nicht gewinnen kannst'] },
    category: 'social',
    faq: {
      en: [{ question: 'What happens when I resign?', answer: 'The game ends immediately and your opponent wins. The result is recorded on-chain permanently.' }],
      de: [{ question: 'Was passiert wenn ich resigniere?', answer: 'Das Spiel endet sofort und dein Gegner gewinnt. Das Ergebnis wird dauerhaft On-Chain gespeichert.' }],
    },
  },
  'open-games': {
    keywords: { en: ['open chess games', 'waiting games', 'find opponent', 'join game'], de: ['offene Schachspiele', 'wartende Spiele', 'Gegner finden', 'Spiel beitreten'] },
    useCases: { en: ['Browse open games waiting for an opponent', 'Quickly join a chess game'], de: ['Durchsuche offene Spiele, die auf einen Gegner warten', 'Tritt schnell einem Schachspiel bei'] },
    category: 'social',
    faq: {
      en: [{ question: 'How do I join an open game?', answer: 'Browse the list of open games and click "Join" on any game to start playing as black immediately.' }],
      de: [{ question: 'Wie trete ich einem offenen Spiel bei?', answer: 'Durchsuche die Liste der offenen Spiele und klicke auf "Beitreten" um sofort als Schwarz zu spielen.' }],
    },
  },
  'create-ai-game': {
    keywords: {
      en: ['play chess against ai', 'ai chess', 'chess bot', 'play against computer', 'ai opponent'],
      de: ['Schach gegen KI', 'KI-Schach', 'Schach-Bot', 'gegen Computer spielen', 'KI-Gegner'],
    },
    useCases: {
      en: [
        'Play a chess game against an AI opponent on-chain',
        'Practice chess with an AI that responds to every move',
        'Challenge the AI to test your chess skills',
      ],
      de: [
        'Spiele ein Schachspiel gegen einen KI-Gegner On-Chain',
        'Übe Schach mit einer KI, die auf jeden Zug antwortet',
        'Fordere die KI heraus um dein Schachspiel zu testen',
      ],
    },
    category: 'social',
    faq: {
      en: [
        { question: 'How does the AI play?', answer: 'After you make a move, the AI analyzes the board position and responds with its own move. Every move is recorded on the blockchain.' },
        { question: 'Do I need an opponent?', answer: 'No! The AI joins as black automatically when you create an AI game. Just make your first move.' },
      ],
      de: [
        { question: 'Wie spielt die KI?', answer: 'Nach deinem Zug analysiert die KI die Brettstellung und antwortet mit ihrem eigenen Zug. Jeder Zug wird auf der Blockchain gespeichert.' },
        { question: 'Brauche ich einen Gegner?', answer: 'Nein! Die KI tritt automatisch als Schwarz bei, wenn du ein KI-Spiel erstellst. Mache einfach deinen ersten Zug.' },
      ],
    },
  },
}
