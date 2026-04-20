export function toCalendarDate(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

export function googleCalendarUrl(title: string, startAt: string, endAt: string, joinUrl?: string): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${toCalendarDate(startAt)}/${toCalendarDate(endAt)}`,
    ...(joinUrl ? { location: joinUrl } : {}),
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

export function outlookCalendarUrl(title: string, startAt: string, endAt: string, joinUrl?: string): string {
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: title,
    startdt: startAt,
    enddt: endAt,
    ...(joinUrl ? { location: joinUrl } : {}),
  })
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params}`
}

export function buildIcsContent(title: string, startAt: string, endAt: string, joinUrl?: string): string {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//JoAi//Appointment//EN',
    'BEGIN:VEVENT',
    `DTSTART:${toCalendarDate(startAt)}`,
    `DTEND:${toCalendarDate(endAt)}`,
    `SUMMARY:${title}`,
    joinUrl ? `LOCATION:${joinUrl}` : '',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).join('\r\n')
}

export function downloadIcs(title: string, startAt: string, endAt: string, joinUrl?: string): void {
  const blob = new Blob([buildIcsContent(title, startAt, endAt, joinUrl)], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'appointment.ics'
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 0)
}
