import { Alert } from '@openai/apps-sdk-ui/components/Alert'
import { Button } from '@openai/apps-sdk-ui/components/Button'

type Props = {
  title: string
  description: string
  paymentUrl: string
}

export function UpgradePrompt(props: Props) {
  const title = props.title ?? 'Upgrade to unlock this feature'
  const message = props.description ?? 'Upgrade to get premium features and higher limits in seconds.'

  const handlePaymentClick = () => {
    if (!props.paymentUrl) return
    window.open(props.paymentUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <Alert
      variant="soft"
      color="discovery"
      title={title}
      description={message}
      actions={
        <Button color="primary" onClick={handlePaymentClick} disabled={!props.paymentUrl} variant="soft">
          Upgrade now
        </Button>
      }
    />
  )
}
