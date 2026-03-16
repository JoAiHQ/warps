import { Alert } from '@openai/apps-sdk-ui/components/Alert'
import { Button } from '@openai/apps-sdk-ui/components/Button'

type Props = {
  title: string
  description: string
  actionLabel?: string
  paymentUrl: string
  current?: number
  limit?: number
}

export function UpgradePrompt(props: Props) {
  const title = props.title ?? 'Upgrade to unlock this feature'
  const description = props.description ?? 'Upgrade to get premium features and higher limits in seconds.'
  const actionLabel = props.actionLabel ?? 'Upgrade now'
  const hasUsage = props.current != null && props.limit != null

  const handlePaymentClick = () => {
    if (!props.paymentUrl) return
    window.open(props.paymentUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <Alert
      variant="soft"
      color="discovery"
      title={title}
      description={
        <div className="flex flex-col gap-2">
          <span>{description}</span>
          {hasUsage && (
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-purple-500"
                  style={{ width: `${Math.min(100, ((props.current ?? 0) / (props.limit ?? 1)) * 100)}%` }}
                />
              </div>
              <span className="text-xs opacity-60 tabular-nums">{props.current}/{props.limit}</span>
            </div>
          )}
        </div>
      }
      actionsPlacement="bottom"
      actions={
        <Button color="primary" onClick={handlePaymentClick} disabled={!props.paymentUrl} variant="soft">
          {actionLabel}
        </Button>
      }
    />
  )
}
