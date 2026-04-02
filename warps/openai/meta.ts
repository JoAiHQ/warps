import type { WarpExtras } from '../types'

export const meta: Record<string, WarpExtras> = {
  'launch-task': {
    keywords: {
      en: ['OpenAI task', 'launch GPT task', 'ChatGPT task', 'run OpenAI job', 'start AI task', 'GPT automation'],
      de: ['OpenAI Aufgabe', 'GPT Aufgabe starten', 'ChatGPT Aufgabe', 'OpenAI Job ausführen', 'KI-Aufgabe starten', 'GPT Automatisierung'],
    },
    useCases: {
      en: ['Delegate a research summary to GPT while you focus on other work', 'Have OpenAI draft content or reports in the background', 'Run complex analysis tasks with GPT without waiting at your desk'],
      de: ['Eine Recherche-Zusammenfassung an GPT delegieren, während du dich auf andere Arbeit konzentrierst', 'OpenAI im Hintergrund Inhalte oder Berichte entwerfen lassen', 'Komplexe Analyseaufgaben mit GPT ausführen, ohne am Schreibtisch zu warten'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'How do I launch a task with OpenAI?',
          answer:
            'Start a new background task with OpenAI by providing your instructions. The model will work on it asynchronously and return results when complete.',
        },
        {
          question: 'What tasks can I run through OpenAI?',
          answer:
            'You can run writing, analysis, research, coding, and other tasks. They execute in the background so you can continue working while waiting for results.',
        },
      ],
      de: [
        {
          question: 'Wie starte ich eine Aufgabe mit OpenAI?',
          answer:
            'Starte eine neue Hintergrundaufgabe mit OpenAI, indem du deine Anweisungen eingibst. Das Modell arbeitet asynchron daran und liefert die Ergebnisse nach Abschluss.',
        },
        {
          question: 'Welche Aufgaben kann ich über OpenAI ausführen?',
          answer:
            'Du kannst Schreib-, Analyse-, Recherche-, Programmier- und andere Aufgaben ausführen. Sie laufen im Hintergrund, sodass du weiterarbeiten kannst, während du auf Ergebnisse wartest.',
        },
      ],
    },
  },

  'cancel-task': {
    keywords: {
      en: ['cancel OpenAI task', 'stop GPT job', 'abort OpenAI task', 'terminate AI task'],
      de: ['OpenAI Aufgabe abbrechen', 'GPT Job stoppen', 'OpenAI Aufgabe abbrechen', 'KI-Aufgabe beenden'],
    },
    useCases: {
      en: ['Stop a GPT task started with incorrect instructions', 'Cancel a long-running OpenAI job you no longer need', 'Free up resources by terminating obsolete background tasks'],
      de: ['Eine GPT-Aufgabe stoppen, die mit falschen Anweisungen gestartet wurde', 'Einen lang laufenden OpenAI-Job abbrechen, der nicht mehr benötigt wird', 'Ressourcen freigeben durch Beenden veralteter Hintergrundaufgaben'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'How do I cancel a running OpenAI task?',
          answer:
            'Provide the task ID to cancel it immediately. Partial results generated before cancellation are not preserved.',
        },
        {
          question: 'What happens when I cancel an OpenAI task?',
          answer:
            'The task stops processing and is marked as cancelled. If you need any output produced so far, check the task status before cancelling.',
        },
      ],
      de: [
        {
          question: 'Wie breche ich eine laufende OpenAI-Aufgabe ab?',
          answer:
            'Gib die Aufgaben-ID an, um sie sofort abzubrechen. Teilergebnisse, die vor dem Abbruch erzeugt wurden, werden nicht gespeichert.',
        },
        {
          question: 'Was passiert, wenn ich eine OpenAI-Aufgabe abbreche?',
          answer:
            'Die Aufgabe wird gestoppt und als abgebrochen markiert. Wenn du bisherige Ausgaben brauchst, prüfe den Aufgabenstatus vor dem Abbrechen.',
        },
      ],
    },
  },

  'get-task-status': {
    keywords: {
      en: ['OpenAI task status', 'check GPT task progress', 'task result', 'OpenAI job status'],
      de: ['OpenAI Aufgabenstatus', 'GPT Aufgabenfortschritt prüfen', 'Aufgabenergebnis', 'OpenAI Job-Status'],
    },
    useCases: {
      en: ['Check if a background GPT research task has finished', 'Retrieve the completed output of an OpenAI writing job', 'Monitor progress on a long-running analysis task'],
      de: ['Prüfen, ob eine GPT-Hintergrund-Rechercheaufgabe abgeschlossen ist', 'Die fertige Ausgabe eines OpenAI-Schreibauftrags abrufen', 'Den Fortschritt einer lang laufenden Analyseaufgabe überwachen'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'What statuses can an OpenAI task have?',
          answer:
            'Tasks can be queued, in progress, completed, failed, or cancelled. The status response includes any output generated so far.',
        },
        {
          question: 'How do I check if my OpenAI task is finished?',
          answer:
            'Query the task status with the task ID. A completed status means results are ready for retrieval.',
        },
      ],
      de: [
        {
          question: 'Welche Status kann eine OpenAI-Aufgabe haben?',
          answer:
            'Aufgaben können in Warteschlange, in Bearbeitung, abgeschlossen, fehlgeschlagen oder abgebrochen sein. Die Statusantwort enthält alle bisher erzeugten Ausgaben.',
        },
        {
          question: 'Wie prüfe ich, ob meine OpenAI-Aufgabe fertig ist?',
          answer:
            'Frage den Aufgabenstatus mit der Aufgaben-ID ab. Der Status "abgeschlossen" bedeutet, dass die Ergebnisse bereitstehen.',
        },
      ],
    },
  },

  'add-followup': {
    keywords: {
      en: ['OpenAI followup', 'add followup message', 'continue GPT task', 'reply to OpenAI task'],
      de: ['OpenAI Nachfrage', 'Folgenachricht hinzufügen', 'GPT Aufgabe fortsetzen', 'auf OpenAI Aufgabe antworten'],
    },
    useCases: {
      en: ['Ask GPT to revise a draft based on new feedback', 'Provide additional context to improve task output', 'Request a different format or focus for completed results'],
      de: ['GPT bitten, einen Entwurf basierend auf neuem Feedback zu überarbeiten', 'Zusätzlichen Kontext liefern, um die Aufgabenausgabe zu verbessern', 'Ein anderes Format oder einen anderen Fokus für fertige Ergebnisse anfordern'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'Can I send additional instructions to an OpenAI task after it started?',
          answer:
            'Yes, add a follow-up message with new context or revised instructions. The model incorporates the update and continues processing.',
        },
      ],
      de: [
        {
          question: 'Kann ich einer laufenden OpenAI-Aufgabe nachträglich Anweisungen senden?',
          answer:
            'Ja, sende eine Folgenachricht mit neuem Kontext oder überarbeiteten Anweisungen. Das Modell berücksichtigt die Aktualisierung und arbeitet weiter.',
        },
      ],
    },
  },

  'codex-launch-task': {
    keywords: {
      en: ['Codex task', 'launch Codex coding task', 'OpenAI Codex agent', 'AI coding job', 'Codex developer task'],
      de: ['Codex Aufgabe', 'Codex Programmieraufgabe starten', 'OpenAI Codex Agent', 'KI-Programmierauftrag', 'Codex Entwickleraufgabe'],
    },
    useCases: {
      en: ['Have Codex implement a new feature in your codebase', 'Delegate bug fixes and code refactoring to OpenAI Codex', 'Automate code reviews and test generation with Codex'],
      de: ['Codex ein neues Feature in der Codebasis implementieren lassen', 'Bug-Fixes und Code-Refactoring an OpenAI Codex delegieren', 'Code-Reviews und Testgenerierung mit Codex automatisieren'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'How do I start a coding task with Codex?',
          answer:
            'Submit your coding instructions through the Codex CLI. The task runs in a cloud sandbox with access to your repository and delivers code changes when done.',
        },
      ],
      de: [
        {
          question: 'Wie starte ich eine Programmieraufgabe mit Codex?',
          answer:
            'Reiche deine Programmieranweisungen über die Codex CLI ein. Die Aufgabe läuft in einer Cloud-Sandbox mit Zugriff auf dein Repository und liefert Codeänderungen nach Abschluss.',
        },
      ],
    },
  },

  'codex-cancel-task': {
    keywords: {
      en: ['cancel Codex task', 'stop Codex job', 'abort Codex coding task'],
      de: ['Codex Aufgabe abbrechen', 'Codex Job stoppen', 'Codex Programmieraufgabe abbrechen'],
    },
    useCases: {
      en: ['Stop a Codex task when requirements have changed', 'Abort a code generation job taking the wrong approach', 'Cancel a Codex task to restart with better instructions'],
      de: ['Eine Codex-Aufgabe stoppen, wenn sich die Anforderungen geändert haben', 'Einen Code-Generierungsjob abbrechen, der den falschen Ansatz verfolgt', 'Eine Codex-Aufgabe abbrechen, um mit besseren Anweisungen neu zu starten'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'Can I cancel a Codex task that is already writing code?',
          answer:
            'Yes, cancelling stops the task immediately. Incomplete code changes may remain in the sandbox, so review the output before applying anything.',
        },
      ],
      de: [
        {
          question: 'Kann ich eine Codex-Aufgabe abbrechen, die bereits Code schreibt?',
          answer:
            'Ja, das Abbrechen stoppt die Aufgabe sofort. Unvollständige Codeänderungen können in der Sandbox verbleiben, also prüfe die Ausgabe, bevor du etwas übernimmst.',
        },
      ],
    },
  },

  'codex-get-task-status': {
    keywords: {
      en: ['Codex task status', 'coding task progress', 'Codex result', 'Codex job status'],
      de: ['Codex Aufgabenstatus', 'Programmieraufgabe Fortschritt', 'Codex Ergebnis', 'Codex Job-Status'],
    },
    useCases: {
      en: ['Check if Codex has finished implementing your feature', 'Review generated code before merging changes', 'Monitor a complex refactoring task in progress'],
      de: ['Prüfen, ob Codex die Feature-Implementierung abgeschlossen hat', 'Den generierten Code vor dem Zusammenführen überprüfen', 'Eine komplexe Refactoring-Aufgabe im Fortschritt überwachen'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'How do I check whether my Codex coding task is done?',
          answer:
            'Query the task status using the task ID. A completed status means the code changes are ready for review and can be applied to your repository.',
        },
      ],
      de: [
        {
          question: 'Wie prüfe ich, ob meine Codex-Programmieraufgabe fertig ist?',
          answer:
            'Frage den Aufgabenstatus mit der Aufgaben-ID ab. Der Status "abgeschlossen" bedeutet, dass die Codeänderungen zur Überprüfung bereitstehen und auf dein Repository angewendet werden können.',
        },
      ],
    },
  },

  'codex-add-followup': {
    keywords: {
      en: ['Codex followup', 'continue Codex task', 'reply to Codex coding task'],
      de: ['Codex Nachfrage', 'Codex Aufgabe fortsetzen', 'auf Codex Programmieraufgabe antworten'],
    },
    useCases: {
      en: ['Ask Codex to add error handling to generated code', 'Request style or architecture changes mid-implementation', 'Provide clarifying details about edge cases during coding'],
      de: ['Codex bitten, Fehlerbehandlung zum generierten Code hinzuzufügen', 'Stil- oder Architekturänderungen während der Implementierung anfordern', 'Klärende Details zu Grenzfällen während des Programmierens liefern'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'Can I send follow-up instructions to a running Codex task?',
          answer:
            'Yes, add a follow-up with the task ID to provide new context or request changes. Codex adjusts its approach based on your updated instructions.',
        },
      ],
      de: [
        {
          question: 'Kann ich einer laufenden Codex-Aufgabe Folgeanweisungen senden?',
          answer:
            'Ja, sende eine Folgenachricht mit der Aufgaben-ID, um neuen Kontext bereitzustellen oder Änderungen anzufordern. Codex passt seinen Ansatz basierend auf deinen aktualisierten Anweisungen an.',
        },
      ],
    },
  },

  'joai-plugin-install': {
    keywords: {
      en: ['install plugin', 'add OpenAI plugin', 'GPT plugin setup', 'connect tool to ChatGPT', 'OpenAI MCP install'],
      de: ['Plugin installieren', 'OpenAI Plugin hinzufügen', 'GPT Plugin einrichten', 'Tool mit ChatGPT verbinden', 'OpenAI MCP installieren'],
    },
    useCases: {
      en: ['Add a blockchain plugin to interact with MultiversX from ChatGPT', 'Install a communication plugin to send emails or messages via GPT', 'Extend OpenAI with a productivity tool for scheduling or task management'],
      de: ['Ein Blockchain-Plugin hinzufügen, um von ChatGPT aus mit MultiversX zu interagieren', 'Ein Kommunikations-Plugin installieren, um E-Mails oder Nachrichten über GPT zu senden', 'OpenAI mit einem Produktivitäts-Tool für Terminplanung oder Aufgabenverwaltung erweitern'],
    },
    category: 'developer',
    faq: {
      en: [
        {
          question: 'How do I install a plugin for OpenAI?',
          answer:
            'Install a new plugin to your OpenAI setup with just a few steps. The configuration and connection are handled automatically so the plugin is ready to use right away.',
        },
        {
          question: 'What plugins can I add to OpenAI?',
          answer:
            'Many plugins are available covering productivity, development, communication, and blockchain tools. Browse the plugin catalog to find ones that fit your workflow.',
        },
      ],
      de: [
        {
          question: 'Wie installiere ich ein Plugin für OpenAI?',
          answer:
            'Installiere ein neues Plugin für dein OpenAI-Setup in wenigen Schritten. Die Konfiguration und Verbindung werden automatisch übernommen, sodass das Plugin sofort einsatzbereit ist.',
        },
        {
          question: 'Welche Plugins kann ich zu OpenAI hinzufügen?',
          answer:
            'Viele Plugins sind verfügbar, die Produktivität, Entwicklung, Kommunikation und Blockchain-Tools abdecken. Durchsuche den Plugin-Katalog, um passende für deinen Workflow zu finden.',
        },
      ],
    },
  },
}
