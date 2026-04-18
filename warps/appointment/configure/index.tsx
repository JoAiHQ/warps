import { Button } from '@openai/apps-sdk-ui/components/Button'
import { CheckCircle } from '@openai/apps-sdk-ui/components/Icon'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { useTranslations } from '../../../ui/lib/hooks'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import { translations } from '../i18n'
import { BookingRules } from './BookingRules'
import { OfficeHours } from './OfficeHours'
import { ServicesList } from './ServicesList'
import { AppointmentConfigureData, AppointmentPolicy, AppointmentService } from './warp.types'

type ServiceEntry = AppointmentService & { _id: string }

function withId(service: AppointmentService): ServiceEntry {
  return { ...service, _id: crypto.randomUUID() }
}

function stripId({ _id: _, ...service }: ServiceEntry): AppointmentService {
  return service
}

function emptyPolicy(): AppointmentPolicy {
  return {
    availability: {},
    minNoticeMinutes: null,
    bufferMinutes: null,
    maxDaysAhead: null,
    slotIntervalMinutes: null,
    blockedDates: [],
    holidays: [],
    services: [],
  }
}

function Main() {
  const { data, executeWarp } = useAppContext<AppointmentConfigureData>()
  const tr = useTranslations(translations).configure
  const [policy, setPolicy] = useState<AppointmentPolicy>(emptyPolicy())
  const [services, setServices] = useState<ServiceEntry[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (data?.policy && !initializedRef.current) {
      initializedRef.current = true
      setPolicy(data.policy)
      setServices((data.policy.services ?? []).map(withId))
    }
  }, [data])

  if (!data) {
    return <EmptyMessageSkeleton />
  }

  const markDirty = () => setSaved(false)

  const updatePolicy = (patch: Partial<AppointmentPolicy>) => {
    markDirty()
    setPolicy((prev) => ({ ...prev, ...patch }))
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      await executeWarp('appointment-upsert-policy', {
        policy: JSON.stringify({
          availability: policy.availability ?? {},
          minNoticeMinutes: policy.minNoticeMinutes ?? null,
          bufferMinutes: policy.bufferMinutes ?? null,
          maxDaysAhead: policy.maxDaysAhead ?? null,
          slotIntervalMinutes: policy.slotIntervalMinutes ?? null,
          blockedDates: policy.blockedDates ?? [],
          holidays: policy.holidays ?? [],
          services: services.filter((s) => s.slug.trim() !== '').map(stripId),
        }),
      })
      setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4 w-full">
      <h1 className="heading-lg">{tr.title}</h1>

      <OfficeHours
        availability={policy.availability ?? {}}
        onChange={(day, ranges) => {
          markDirty()
          setPolicy((prev) => ({
            ...prev,
            availability: { ...prev.availability, [day]: ranges },
          }))
        }}
      />

      <BookingRules policy={policy} onChange={updatePolicy} />

      <ServicesList
        services={services}
        onAdd={() => {
          markDirty()
          setServices((prev) => [...prev, withId({ slug: '', name: '' })])
        }}
        onUpdate={(id, updated) => {
          markDirty()
          setServices((prev) => prev.map((s) => (s._id === id ? { ...updated, _id: id } : s)))
        }}
        onRemove={(id) => {
          markDirty()
          setServices((prev) => prev.filter((s) => s._id !== id))
        }}
      />

      <Button color="primary" block onClick={handleSave} disabled={saving}>
        {saved ? (
          <>
            <CheckCircle />
            {tr.saved}
          </>
        ) : saving ? (
          tr.saving
        ) : (
          tr.save
        )}
      </Button>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App>
        <Main />
      </App>
    </React.StrictMode>
  )
}
