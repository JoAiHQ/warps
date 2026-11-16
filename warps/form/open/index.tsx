import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { EmptyMessageSkeleton } from '../../../ui/lib/skeletons'
import type { FormField, FormFieldOption, FormPublicData, FormSubmitPrefill } from './warp.types'

type Step = 'form' | 'submitting' | 'success' | 'error'

const pick = (value: unknown, locale: string): string => {
  if (typeof value === 'string') return value
  if (!value || typeof value !== 'object') return ''
  const record = value as Record<string, string>
  return record[locale] ?? record.de ?? record.en ?? Object.values(record).find((item) => typeof item === 'string' && item.trim()) ?? ''
}

const fieldKey = (field: FormField): string => field.as || field.name
const fieldLabel = (field: FormField, locale: string): string => pick(field.label, locale) || field.name
const fieldType = (field: FormField): string => (field.type || 'string').toLowerCase()

const optionsFor = (field: FormField, locale: string): Array<{ value: string; label: string }> =>
  (field.options ?? []).map((option) => {
    if (typeof option === 'string') return { value: option, label: option }
    return { value: option.value, label: pick(option.label, locale) || option.value }
  })

const isHidden = (field: FormField): boolean => field.source === 'hidden'
const isRequired = (field: FormField): boolean => field.required === true

const initialValues = (inputs: FormSubmitPrefill | undefined): Record<string, string> => {
  const values: Record<string, string> = {}
  for (const [key, value] of Object.entries(inputs?.values ?? {})) {
    if (value === undefined || value === null) continue
    values[key] = String(value)
  }
  if (inputs?.name && !values.name) values.name = inputs.name
  if (inputs?.email && !values.email) values.email = inputs.email
  if (inputs?.phone && !values.phone) values.phone = inputs.phone
  if (inputs?.message && !values.message) values.message = inputs.message
  return values
}

function Main() {
  const { data, inputs, executeWarp, locale } = useAppContext<FormPublicData, FormSubmitPrefill>()
  const [values, setValues] = useState<Record<string, string>>(() => initialValues(inputs))
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [step, setStep] = useState<Step>('form')
  const [errorMsg, setErrorMsg] = useState('')
  const [queued, setQueued] = useState(false)
  const appliedPrefill = useRef(false)

  useEffect(() => {
    if (appliedPrefill.current || !inputs) return
    const next = initialValues(inputs)
    if (Object.keys(next).length > 0) setValues((current) => ({ ...next, ...current }))
    appliedPrefill.current = true
  }, [inputs])

  const form = data?.FORM ?? null
  const actions = form?.definition?.actions ?? []
  const allFields = useMemo(
    () => actions.filter((action) => action.type === 'collect').flatMap((action) => action.inputs ?? []),
    [actions],
  )
  const fields = allFields.filter((field) => !isHidden(field))
  const hiddenValues = useMemo(() => {
    const result: Record<string, string> = {}
    for (const field of allFields.filter(isHidden)) {
      if (typeof field.default === 'string' && !field.default.includes('{{')) result[fieldKey(field)] = field.default
    }
    return result
  }, [allFields])

  const copy = locale.startsWith('de')
    ? {
        submit: 'Absenden',
        submitting: 'Wird gesendet…',
        success: 'Danke!',
        successQueued: 'Zur Freigabe eingereicht. Du wirst den Abschluss in Kürze sehen.',
        error: 'Etwas ist schiefgelaufen',
        retry: 'Nochmal versuchen',
        required: 'Pflichtfeld',
        formMissing: 'Formular nicht gefunden.',
      }
    : {
        submit: 'Submit',
        submitting: 'Submitting…',
        success: 'Thanks!',
        successQueued: 'Submitted for approval. You will see the result shortly.',
        error: 'Something went wrong',
        retry: 'Try again',
        required: 'Required',
        formMissing: 'Form not found.',
      }

  const setValue = (key: string, value: string) => {
    setValues((current) => ({ ...current, [key]: value }))
    if (errors[key]) setErrors((current) => ({ ...current, [key]: false }))
  }

  const validate = (): boolean => {
    const next: Record<string, boolean> = {}
    for (const field of fields) {
      if (!isRequired(field)) continue
      const key = fieldKey(field)
      const type = fieldType(field)
      if (type === 'boolean' || type === 'bool') {
        if (values[key] !== 'true') next[key] = true
      } else if (!values[key]?.trim()) {
        next[key] = true
      }
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async () => {
    if (!validate()) return
    setStep('submitting')
    setErrorMsg('')
    try {
      const payload: Record<string, unknown> = { ...hiddenValues, ...values }
      for (const field of fields) {
        const key = fieldKey(field)
        const type = fieldType(field)
        if (type === 'boolean' || type === 'bool') {
          payload[key] = values[key] === 'true'
        } else if (type === 'number' && values[key] !== undefined && values[key] !== '') {
          payload[key] = Number(values[key])
        } else if (type === 'json' && values[key]) {
          try { payload[key] = JSON.parse(values[key]) } catch { payload[key] = values[key] }
        }
      }
      const result = (await executeWarp('form-submit', {
        formId: inputs?.formId,
        inputs: payload,
        locale,
      })) as { queued?: boolean } | undefined
      setQueued(Boolean(result?.queued))
      setStep('success')
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : '')
      setStep('error')
    }
  }

  if (!data) return <EmptyMessageSkeleton />
  if (!form) return <div className="p-6 text-sm text-red-500">{copy.formMissing}</div>

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center gap-5 p-6 text-center max-w-sm mx-auto">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 text-2xl">✓</div>
        <div>
          <h2 className="text-xl font-semibold">{copy.success}</h2>
          {queued && <p className="text-sm text-gray-500 mt-2">{copy.successQueued}</p>}
        </div>
      </div>
    )
  }

  if (step === 'error') {
    return (
      <div className="flex flex-col items-center gap-4 p-6 text-center max-w-sm mx-auto">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100 text-red-500 text-2xl">✕</div>
        <div>
          <h2 className="text-xl font-semibold">{copy.error}</h2>
          {errorMsg && <p className="text-sm text-gray-500 mt-1">{errorMsg}</p>}
        </div>
        <button
          onClick={() => setStep('form')}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:border-gray-400 transition-colors"
        >
          {copy.retry}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 p-4 w-full max-w-md mx-auto">
      <div>
        <h2 className="text-lg font-semibold">{pick(form.title, locale) || inputs?.title || 'Form'}</h2>
        {pick(form.description, locale) && <p className="text-sm text-gray-500 mt-1">{pick(form.description, locale)}</p>}
      </div>

      <div className="flex flex-col gap-3">
        {fields.map((field) => {
          const key = fieldKey(field)
          const type = fieldType(field)
          const options = optionsFor(field, locale)
          const label = fieldLabel(field, locale)
          const description = pick(field.description, locale)
          const boolean = type === 'boolean' || type === 'bool'

          return (
            <div key={key}>
              {!boolean && (
                <label className="block text-sm font-medium mb-1">
                  {label}
                  {isRequired(field) && <span className="text-red-500 ml-0.5">*</span>}
                </label>
              )}
              {description && !boolean && <p className="text-xs text-gray-500 mb-1">{description}</p>}

              {type === 'textarea' ? (
                <textarea
                  value={values[key] ?? ''}
                  onChange={(event) => setValue(key, event.target.value)}
                  rows={4}
                  className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none ${errors[key] ? 'border-red-400' : 'border-gray-200'}`}
                />
              ) : boolean ? (
                <label className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={values[key] === 'true'}
                    onChange={(event) => setValue(key, event.target.checked ? 'true' : 'false')}
                    className="mt-0.5 h-4 w-4"
                  />
                  <span>
                    {label}
                    {isRequired(field) && <span className="text-red-500 ml-0.5">*</span>}
                  </span>
                </label>
              ) : options.length > 0 ? (
                <select
                  value={values[key] ?? ''}
                  onChange={(event) => setValue(key, event.target.value)}
                  className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${errors[key] ? 'border-red-400' : 'border-gray-200'}`}
                >
                  <option value="">—</option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={type === 'number' || type === 'uint64' ? 'number' : type === 'email' ? 'email' : type === 'date' ? 'date' : 'text'}
                  value={values[key] ?? ''}
                  onChange={(event) => setValue(key, event.target.value)}
                  className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${errors[key] ? 'border-red-400' : 'border-gray-200'}`}
                />
              )}

              {errors[key] && <p className="text-xs text-red-500 mt-0.5">{copy.required}</p>}
            </div>
          )
        })}
      </div>

      <button
        onClick={submit}
        disabled={step === 'submitting'}
        className="w-full rounded-lg bg-blue-600 text-white py-2.5 text-sm font-medium disabled:opacity-60 hover:bg-blue-700 transition-colors"
      >
        {step === 'submitting' ? copy.submitting : copy.submit}
      </button>
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
