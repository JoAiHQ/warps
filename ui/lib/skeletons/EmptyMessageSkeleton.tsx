type Props = {
  className?: string
  descriptionLines?: number
}

export function EmptyMessageSkeleton(props: Props) {
  const lines = Math.max(1, props.descriptionLines ?? 2)

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 p-6 text-center animate-pulse ${
        props.className ?? ''
      }`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="h-6 w-44 bg-surface-secondary rounded" />
      <div className="flex flex-col gap-2">
        {Array.from({ length: lines }).map((_, idx) => (
          <div
            key={idx}
            className={`h-3 bg-surface-secondary rounded ${
              idx % 2 === 0 ? 'w-56' : 'w-48'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
