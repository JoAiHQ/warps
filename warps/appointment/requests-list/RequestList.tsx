import { Button } from '@openai/apps-sdk-ui/components/Button'
import { EmptyMessage } from '@openai/apps-sdk-ui/components/EmptyMessage'
import { useAppContext } from '../../../ui/lib/components'
import {
  formatDateShort,
  mapListItems,
  nestedName,
  truncateText,
  valueToDisplay,
} from '../../../ui/shared/joai'

type RequestItem = Record<string, unknown>

type Props = {
  items: RequestItem[]
}

export function mapAppointmentRequests(data: unknown): RequestItem[] {
  return mapListItems(data, (item) => item)
}

export function RequestList({ items }: Props) {
  const { executePrompt, copyToClipboard } = useAppContext()

  if (!items.length) {
    return (
      <div className="flex justify-center py-10">
        <EmptyMessage fill="none">
          <EmptyMessage.Title className="text-warp-fg">No appointment requests found.</EmptyMessage.Title>
        </EmptyMessage>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 p-1">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-warp-fg">Appointment requests ({items.length})</h3>
        <button
          type="button"
          onClick={() => copyToClipboard(JSON.stringify(items, null, 2))}
          className="rounded-md px-2 py-1 text-xs font-medium text-warp-fg-muted transition-colors hover:bg-warp-surface-secondary hover:text-warp-fg"
        >
          Copy
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((item, index) => {
          const id = String(item.id ?? index)
          const title = valueToDisplay(item.title)
          const status = valueToDisplay(item.status)
          const requester = [item.requesterName, item.requesterEmail].filter(Boolean).map(String).join(' · ')
          const service = nestedName(item.service)
          const createdAt = formatDateShort(item.createdAt)
          const windows = Array.isArray(item.preferredWindows) ? item.preferredWindows.length : 0
          const notes = truncateText(item.notes, 100)

          return (
            <div key={id} className="rounded-lg border border-warp-border bg-warp-surface px-3.5 py-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-warp-fg">{title}</div>
                  {requester && <div className="mt-0.5 text-xs text-warp-fg-secondary">{requester}</div>}
                </div>
                <span className="shrink-0 rounded-full bg-warp-surface-secondary px-2 py-0.5 text-[11px] font-medium text-warp-fg-secondary">
                  {status}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-warp-fg-muted">
                {service && <span>Service · {service}</span>}
                {typeof item.durationMinutes === 'number' && <span>Duration · {item.durationMinutes} min</span>}
                {windows > 0 && <span>Windows · {windows}</span>}
                {createdAt && <span>Created · {createdAt}</span>}
              </div>
              {notes && <p className="mt-2 text-xs text-warp-fg-secondary">{notes}</p>}

              <div className="mt-3">
                <Button
                  color="secondary"
                  onClick={() =>
                    executePrompt(
                      `Help me process appointment request ${id}: "${title}"` +
                        (requester ? ` from ${requester}` : '') +
                        (status !== '—' ? ` (status: ${status})` : '') +
                        '. Suggest the next best action.',
                    )
                  }
                >
                  Handle request
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
