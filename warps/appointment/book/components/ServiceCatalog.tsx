import { formatTokenAmount } from '../helpers/format'
import { useTranslations } from '../../../../ui/lib/hooks'
import { translations } from '../../i18n'
import type { ShopService } from '../warp.types'

type Props = {
  services: ShopService[]
  token: string | null
  onSelect: (service: ShopService) => void
  onSkip: () => void
}

export function ServiceCatalog({ services, token, onSelect, onSkip }: Props) {
  const tr = useTranslations(translations).book

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex flex-col gap-2">
        {services.map((service) => (
          <button
            key={service.slug}
            onClick={() => onSelect(service)}
            className="w-full text-left rounded-xl border border-gray-200 dark:border-gray-700 p-3 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{service.name}</p>
                {service.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{service.description}</p>
                )}
              </div>
              <div className="flex flex-col items-end shrink-0 gap-0.5">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{formatTokenAmount(service.price, token)}</span>
                <span className="text-xs text-gray-400">{service.duration_minutes} {tr.serviceDuration}</span>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{tr.bookService}</span>
            </div>
          </button>
        ))}
      </div>
      <button
        onClick={onSkip}
        className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors self-center py-1"
      >
        {tr.noSpecificService}
      </button>
    </div>
  )
}
