import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'launch-task': {
    keywords: {
      en: ['Claude task', 'launch Claude task', 'Anthropic AI task', 'Claude agent', 'run AI task', 'start Claude job', 'Claude automation'],
      de: ['Claude Aufgabe', 'Claude Aufgabe starten', 'Anthropic KI-Aufgabe', 'Claude Agent', 'KI-Aufgabe ausführen', 'Claude Job starten', 'Claude Automatisierung'],
    },
    useCases: {
      en: ['Delegate a research summary to Claude while you focus on other work', 'Have Claude draft a blog post or report in the background', 'Run complex data analysis tasks without waiting at your desk'],
      de: ['Eine Recherche-Zusammenfassung an Claude delegieren, während du dich auf andere Arbeit konzentrierst', 'Claude im Hintergrund einen Blogbeitrag oder Bericht entwerfen lassen', 'Komplexe Datenanalysen ausführen, ohne am Schreibtisch zu warten'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'How do I launch a task with Claude?',
          answer:
            'Start a new background task with Claude by providing your instructions. Claude will work on it asynchronously and return results when complete.',
        },
        {
          question: 'What kind of tasks can Claude handle?',
          answer:
            'Claude can handle a wide range of tasks including writing, analysis, research, coding, and more. Tasks run in the background so you can continue with other work.',
        },
      ],
      de: [
        {
          question: 'Wie starte ich eine Aufgabe mit Claude?',
          answer:
            'Starte eine neue Hintergrundaufgabe mit Claude, indem du deine Anweisungen eingibst. Claude arbeitet asynchron daran und liefert die Ergebnisse nach Abschluss.',
        },
        {
          question: 'Welche Aufgaben kann Claude erledigen?',
          answer:
            'Claude kann eine Vielzahl von Aufgaben erledigen, darunter Schreiben, Analyse, Recherche, Programmierung und mehr. Aufgaben laufen im Hintergrund, sodass du mit anderer Arbeit fortfahren kannst.',
        },
      ],
    },
  },

  'cancel-task': {
    keywords: {
      en: ['cancel Claude task', 'stop Claude job', 'abort AI task', 'terminate Claude task'],
      de: ['Claude Aufgabe abbrechen', 'Claude Job stoppen', 'KI-Aufgabe abbrechen', 'Claude Aufgabe beenden'],
    },
    useCases: {
      en: ['Stop a task that was started with incorrect instructions', 'Cancel a long-running job you no longer need results from', 'Free up resources by terminating obsolete background tasks'],
      de: ['Eine Aufgabe stoppen, die mit falschen Anweisungen gestartet wurde', 'Einen lang laufenden Job abbrechen, dessen Ergebnisse nicht mehr benötigt werden', 'Ressourcen freigeben durch Beenden veralteter Hintergrundaufgaben'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'How do I cancel a running Claude task?',
          answer:
            'Provide the task ID to cancel it immediately. Any partial results generated before cancellation are discarded and cannot be retrieved.',
        },
        {
          question: 'What happens to partial results when I cancel a Claude task?',
          answer:
            'Partial output is not preserved after cancellation. If you need intermediate results, check the task status before cancelling to retrieve any available output.',
        },
      ],
      de: [
        {
          question: 'Wie breche ich eine laufende Claude-Aufgabe ab?',
          answer:
            'Gib die Aufgaben-ID an, um sie sofort abzubrechen. Teilergebnisse, die vor dem Abbruch erzeugt wurden, werden verworfen und können nicht abgerufen werden.',
        },
        {
          question: 'Was passiert mit Teilergebnissen, wenn ich eine Claude-Aufgabe abbreche?',
          answer:
            'Teilausgaben werden nach dem Abbruch nicht gespeichert. Wenn du Zwischenergebnisse brauchst, prüfe den Aufgabenstatus vor dem Abbrechen, um verfügbare Ausgaben abzurufen.',
        },
      ],
    },
  },

  'get-task-status': {
    keywords: {
      en: ['Claude task status', 'check task progress', 'task result', 'Claude job status'],
      de: ['Claude Aufgabenstatus', 'Aufgabenfortschritt prüfen', 'Aufgabenergebnis', 'Claude Job-Status'],
    },
    useCases: {
      en: ['Check if a background research task has finished', 'Retrieve the completed output of a Claude writing job', 'Monitor progress on a long-running analysis task'],
      de: ['Prüfen, ob eine Hintergrund-Rechercheaufgabe abgeschlossen ist', 'Die fertige Ausgabe eines Claude-Schreibauftrags abrufen', 'Den Fortschritt einer lang laufenden Analyseaufgabe überwachen'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'What are the possible statuses of a Claude task?',
          answer:
            'Tasks can be pending, in progress, completed, failed, or cancelled. Checking the status also returns any output generated so far.',
        },
        {
          question: 'How do I check the progress of my Claude task?',
          answer:
            'Query the task status using the task ID. You will see the current state and, once completed, the full result.',
        },
      ],
      de: [
        {
          question: 'Welche Status kann eine Claude-Aufgabe haben?',
          answer:
            'Aufgaben können ausstehend, in Bearbeitung, abgeschlossen, fehlgeschlagen oder abgebrochen sein. Die Statusabfrage liefert auch bisher erzeugte Ausgaben.',
        },
        {
          question: 'Wie prüfe ich den Fortschritt meiner Claude-Aufgabe?',
          answer:
            'Frage den Aufgabenstatus mit der Aufgaben-ID ab. Du siehst den aktuellen Zustand und nach Abschluss das vollständige Ergebnis.',
        },
      ],
    },
  },

  'add-followup': {
    keywords: {
      en: ['Claude followup', 'add followup message', 'continue Claude task', 'reply to Claude task'],
      de: ['Claude Nachfrage', 'Folgenachricht hinzufügen', 'Claude Aufgabe fortsetzen', 'auf Claude Aufgabe antworten'],
    },
    useCases: {
      en: ['Ask Claude to revise a draft based on new feedback', 'Provide additional context to improve task output', 'Request a different format or focus for completed results'],
      de: ['Claude bitten, einen Entwurf basierend auf neuem Feedback zu überarbeiten', 'Zusätzlichen Kontext liefern, um die Aufgabenausgabe zu verbessern', 'Ein anderes Format oder einen anderen Fokus für fertige Ergebnisse anfordern'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'Can I add more context to a Claude task after it started?',
          answer:
            'Yes, send a follow-up message with additional instructions or context. Claude incorporates the new information and continues working on the task.',
        },
      ],
      de: [
        {
          question: 'Kann ich einer laufenden Claude-Aufgabe nachträglich Kontext hinzufügen?',
          answer:
            'Ja, sende eine Folgenachricht mit zusätzlichen Anweisungen oder Kontext. Claude berücksichtigt die neuen Informationen und arbeitet an der Aufgabe weiter.',
        },
      ],
    },
  },

  'code-launch-task': {
    keywords: {
      en: ['Claude Code task', 'launch coding task', 'Claude Code agent', 'AI coding job', 'Claude developer task'],
      de: ['Claude Code Aufgabe', 'Programmieraufgabe starten', 'Claude Code Agent', 'KI-Programmierauftrag', 'Claude Entwickleraufgabe'],
    },
    useCases: {
      en: ['Have Claude Code implement a new feature in your codebase', 'Delegate bug fixes and code refactoring to an AI coding agent', 'Automate code reviews and test generation with Claude Code'],
      de: ['Claude Code ein neues Feature in der Codebasis implementieren lassen', 'Bug-Fixes und Code-Refactoring an einen KI-Programmieragenten delegieren', 'Code-Reviews und Testgenerierung mit Claude Code automatisieren'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'How do I launch a coding task with Claude Code from the CLI?',
          answer:
            'Use the Claude Code CLI to submit your coding instructions. The task runs in a sandboxed environment with access to your codebase and returns code changes when complete.',
        },
      ],
      de: [
        {
          question: 'Wie starte ich eine Programmieraufgabe mit Claude Code über die CLI?',
          answer:
            'Nutze die Claude Code CLI, um deine Programmieranweisungen einzureichen. Die Aufgabe läuft in einer Sandbox-Umgebung mit Zugriff auf deine Codebasis und liefert Codeänderungen nach Abschluss.',
        },
      ],
    },
  },

  'code-cancel-task': {
    keywords: {
      en: ['cancel Claude Code task', 'stop coding task', 'abort Claude Code job'],
      de: ['Claude Code Aufgabe abbrechen', 'Programmieraufgabe stoppen', 'Claude Code Job abbrechen'],
    },
    useCases: {
      en: ['Stop a coding task when requirements have changed', 'Abort a code generation job that is taking the wrong approach', 'Cancel a Claude Code task to restart with better instructions'],
      de: ['Eine Programmieraufgabe stoppen, wenn sich die Anforderungen geändert haben', 'Einen Code-Generierungsjob abbrechen, der den falschen Ansatz verfolgt', 'Eine Claude Code Aufgabe abbrechen, um mit besseren Anweisungen neu zu starten'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'Can I cancel a Claude Code task that is modifying files?',
          answer:
            'Yes, cancelling stops the task immediately. Any file changes already written remain in your working directory, so review and revert them if needed.',
        },
      ],
      de: [
        {
          question: 'Kann ich eine Claude Code Aufgabe abbrechen, die gerade Dateien ändert?',
          answer:
            'Ja, das Abbrechen stoppt die Aufgabe sofort. Bereits geschriebene Dateiänderungen bleiben in deinem Arbeitsverzeichnis, also prüfe und setze sie bei Bedarf zurück.',
        },
      ],
    },
  },

  'code-get-task-status': {
    keywords: {
      en: ['Claude Code task status', 'coding task progress', 'Claude Code result'],
      de: ['Claude Code Aufgabenstatus', 'Programmieraufgabe Fortschritt', 'Claude Code Ergebnis'],
    },
    useCases: {
      en: ['Check if Claude Code has finished implementing your feature', 'Review the generated code before merging changes', 'Monitor a complex refactoring task in progress'],
      de: ['Prüfen, ob Claude Code die Feature-Implementierung abgeschlossen hat', 'Den generierten Code vor dem Zusammenführen überprüfen', 'Eine komplexe Refactoring-Aufgabe im Fortschritt überwachen'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'How do I check if Claude Code finished implementing my feature?',
          answer:
            'Query the task status with the task ID to see whether it is still running or completed, along with a summary of files changed.',
        },
      ],
      de: [
        {
          question: 'Wie prüfe ich, ob Claude Code mein Feature fertig implementiert hat?',
          answer:
            'Frage den Aufgabenstatus mit der Aufgaben-ID ab, um zu sehen, ob die Aufgabe noch läuft oder abgeschlossen ist, samt einer Zusammenfassung der geänderten Dateien.',
        },
      ],
    },
  },

  'code-add-followup': {
    keywords: {
      en: ['Claude Code followup', 'continue coding task', 'reply to Claude Code task'],
      de: ['Claude Code Nachfrage', 'Programmieraufgabe fortsetzen', 'auf Claude Code Aufgabe antworten'],
    },
    useCases: {
      en: ['Ask Claude Code to add error handling to generated code', 'Request style or architecture changes mid-implementation', 'Provide clarifying details about edge cases during coding'],
      de: ['Claude Code bitten, Fehlerbehandlung zum generierten Code hinzuzufügen', 'Stil- oder Architekturänderungen während der Implementierung anfordern', 'Klärende Details zu Grenzfällen während des Programmierens liefern'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'Can I send follow-up instructions to a Claude Code task via CLI?',
          answer:
            'Yes, add a follow-up message referencing the task ID. Claude Code incorporates your feedback and continues modifying code accordingly.',
        },
      ],
      de: [
        {
          question: 'Kann ich einer Claude Code Aufgabe über die CLI Folgeanweisungen senden?',
          answer:
            'Ja, sende eine Folgenachricht mit der Aufgaben-ID. Claude Code berücksichtigt dein Feedback und ändert den Code entsprechend weiter.',
        },
      ],
    },
  },

  'joai-plugin-install': {
    keywords: {
      en: ['install plugin', 'add Claude plugin', 'Anthropic plugin setup', 'Claude MCP install', 'connect tool to Claude'],
      de: ['Plugin installieren', 'Claude Plugin hinzufügen', 'Anthropic Plugin einrichten', 'Claude MCP installieren', 'Tool mit Claude verbinden'],
    },
    useCases: {
      en: ['Add a blockchain plugin to interact with MultiversX from Claude', 'Install a communication plugin to send emails or messages via Claude', 'Extend Claude with a productivity tool for scheduling or task management'],
      de: ['Ein Blockchain-Plugin hinzufügen, um von Claude aus mit MultiversX zu interagieren', 'Ein Kommunikations-Plugin installieren, um E-Mails oder Nachrichten über Claude zu senden', 'Claude mit einem Produktivitäts-Tool für Terminplanung oder Aufgabenverwaltung erweitern'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'How do I install a plugin for Claude?',
          answer:
            'Install a new plugin to your Claude setup with just a few steps. The configuration and connection are handled automatically so the plugin is ready to use immediately.',
        },
        {
          question: 'What plugins are available for Claude?',
          answer:
            'A variety of plugins are available covering productivity, development, communication, and blockchain tools. Browse the plugin catalog to see what fits your workflow.',
        },
      ],
      de: [
        {
          question: 'Wie installiere ich ein Plugin für Claude?',
          answer:
            'Installiere ein neues Plugin für dein Claude-Setup in wenigen Schritten. Die Konfiguration und Verbindung werden automatisch übernommen, sodass das Plugin sofort einsatzbereit ist.',
        },
        {
          question: 'Welche Plugins sind für Claude verfügbar?',
          answer:
            'Es gibt eine Vielzahl von Plugins für Produktivität, Entwicklung, Kommunikation und Blockchain-Tools. Durchsuche den Plugin-Katalog, um passende für deinen Workflow zu finden.',
        },
      ],
    },
  },
}
