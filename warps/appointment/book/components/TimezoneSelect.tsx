import { useEffect, useRef, useState } from 'react'

const ALL_TIMEZONES: string[] = (() => {
  try {
    return (Intl as any).supportedValuesOf('timeZone') as string[]
  } catch {
    return ['UTC', 'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Vienna', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Kolkata', 'Australia/Sydney']
  }
})()

type Props = {
  value: string
  label: string
  onChange: (tz: string) => void
}

export function TimezoneSelect({ value, label, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const filtered = search.trim()
    ? ALL_TIMEZONES.filter((tz) => tz.toLowerCase().includes(search.toLowerCase()))
    : ALL_TIMEZONES

  const handleOpen = () => {
    setOpen(true)
    setSearch('')
  }

  const handleSelect = (tz: string) => {
    onChange(tz)
    setOpen(false)
    setSearch('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false)
      setSearch('')
    }
  }

  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 0)
      const idx = filtered.indexOf(value)
      if (idx >= 0 && listRef.current) {
        const item = listRef.current.children[idx] as HTMLElement
        item?.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [open])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div ref={containerRef} className="relative flex items-center gap-1 mt-0.5">
      <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">{label}:</span>
      <button
        type="button"
        onClick={handleOpen}
        className="text-xs text-blue-600 dark:text-blue-400 hover:underline truncate max-w-[200px]"
      >
        {value}
      </button>

      {open && (
        <div className="absolute top-5 left-0 z-50 w-64 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
          <div className="p-2 border-b border-gray-100 dark:border-gray-800">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search timezone..."
              className="w-full text-xs px-2 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-blue-500"
            />
          </div>
          <ul ref={listRef} className="max-h-48 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-xs text-gray-400">No results</li>
            ) : (
              filtered.map((tz) => (
                <li key={tz}>
                  <button
                    type="button"
                    onClick={() => handleSelect(tz)}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      tz === value ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {tz}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
