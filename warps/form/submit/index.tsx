import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App, useAppContext } from '../../../ui/lib/components'
import { FormSubmitInputs } from './warp.types'

type Step = 'form' | 'submitting' | 'success' | 'error'

function Main() {
  const { inputs, executeTool, t } = useAppContext<undefined, FormSubmitInputs>()

  const [values, setValues] = useState<Record<string, string>>({})
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [step, setStep] = useState<Step>('form')
  const [errorMsg, setErrorMsg] = useState('')

  const labels = {
    title: t({ en: 'Your details', de: 'Deine Angaben', fr: 'Vos coordonnees', es: 'Tus datos', ro: 'Datele tale' }),
    notesLabel: t({ en: 'Anything to add?', de: 'Noch etwas?', fr: 'Souhaitez-vous ajouter quelque chose ?', es: 'Algo mas que anadir?', ro: 'Mai vrei sa adaugi ceva?' }),
    notesPlaceholder: t({ en: 'Optional — helps us prepare.', de: 'Optional — wir freuen uns über jede Info.', fr: 'Facultatif — nous aide a preparer.', es: 'Opcional — nos ayuda a preparar.', ro: 'Optional — ne ajuta sa pregatim.' }),
    submit: t({ en: 'Submit', de: 'Absenden', fr: 'Envoyer', es: 'Enviar', ro: 'Trimite' }),
    submitting: t({ en: 'Submitting…', de: 'Wird gesendet…', fr: 'Envoi en cours…', es: 'Enviando…', ro: 'Se trimite…' }),
    successTitle: t({ en: 'Thanks!', de: 'Danke!', fr: 'Merci !', es: 'Gracias!', ro: 'Multumim!' }),
    errorTitle: t({ en: 'Something went wrong', de: 'Fehler', fr: 'Une erreur est survenue', es: 'Algo salio mal', ro: 'Ceva nu a mers bine' }),
    retry: t({ en: 'Try again', de: 'Nochmal versuchen', fr: 'Reessayer', es: 'Intentar de nuevo', ro: 'Incearca din nou' }),
    required: t({ en: 'Required', de: 'Pflichtfeld', fr: 'Obligatoire', es: 'Obligatorio', ro: 'Obligatoriu' }),
    name: t({ en: 'Name', de: 'Name', fr: 'Nom', es: 'Nombre', ro: 'Nume' }),
    namePlaceholder: t({ en: 'Your name', de: 'Dein Name', fr: 'Votre nom', es: 'Tu nombre', ro: 'Numele tau' }),
    email: t({ en: 'Email', de: 'E-Mail', fr: 'E-mail', es: 'Correo electronico', ro: 'E-mail' }),
    emailPlaceholder: t({ en: 'your@email.com', de: 'deine@email.com', fr: 'votre@email.com', es: 'tu@email.com', ro: 'email@tau.com' }),
    phone: t({ en: 'Phone', de: 'Telefon', fr: 'Telephone', es: 'Telefono', ro: 'Telefon' }),
    phonePlaceholder: t({ en: '+1 ... (optional)', de: '+43 ... (optional)', fr: '+33 ... (optionnel)', es: '+34 ... (opcional)', ro: '+40 ... (optional)' }),
    company: t({ en: 'Company', de: 'Unternehmen', fr: 'Entreprise', es: 'Empresa', ro: 'Companie' }),
    companyPlaceholder: t({ en: 'Company or organisation (optional)', de: 'Unternehmen oder Organisation (optional)', fr: 'Entreprise ou organisation (facultatif)', es: 'Empresa u organizacion (opcional)', ro: 'Companie sau organizatie (optional)' }),
  }

  type Field = { id: string; label: string; placeholder: string; type: string; required: boolean }
  const FIELDS: Field[] = [
    { id: 'name', label: labels.name, placeholder: labels.namePlaceholder, type: 'text', required: true },
    { id: 'email', label: labels.email, placeholder: labels.emailPlaceholder, type: 'email', required: true },
    { id: 'phone', label: labels.phone, placeholder: labels.phonePlaceholder, type: 'tel', required: false },
    { id: 'company', label: labels.company, placeholder: labels.companyPlaceholder, type: 'text', required: false },
  ]

  const handleChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }))
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: false }))
  }

  const validate = (): boolean => {
    const next: Record<string, boolean> = {}
    for (const f of FIELDS) {
      if (f.required && !values[f.id]?.trim()) next[f.id] = true
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setStep('submitting')
    try {
      await executeTool('joai-contact-create', {
        name: values.name?.trim() ?? '',
        email: values.email?.trim() ?? '',
        phone: values.phone?.trim() || undefined,
        company: values.company?.trim() || undefined,
        notes: notes.trim() || undefined,
        tags: inputs?.FORM_TAGS || undefined,
        customMessage: inputs?.CUSTOM_COMPLETE_MESSAGE || undefined,
      })
      setStep('success')
    } catch (e: any) {
      setErrorMsg(e?.message ?? '')
      setStep('error')
    }
  }

  if (step === 'success') {
    const custom = inputs?.CUSTOM_COMPLETE_MESSAGE
    const firstName = values.name?.split(' ')[0] ?? ''
    const defaultSuccessMsg = t({
      en: `Thanks ${firstName} — we'll be in touch soon.`,
      de: `Danke ${firstName} — wir melden uns bald.`,
      fr: `Merci ${firstName} — nous reviendrons vers vous bientot.`,
      es: `Gracias ${firstName} — te contactaremos pronto.`,
      ro: `Multumim ${firstName} — vom reveni catre tine in scurt timp.`,
    })
    return (
      <div className="flex flex-col items-center gap-5 p-6 text-center max-w-sm mx-auto">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 text-2xl">✓</div>
        <div>
          <h2 className="text-xl font-semibold">{labels.successTitle}</h2>
          <p className="text-sm text-gray-500 mt-2">{custom || defaultSuccessMsg}</p>
        </div>
      </div>
    )
  }

  if (step === 'error') {
    return (
      <div className="flex flex-col items-center gap-4 p-6 text-center max-w-sm mx-auto">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100 text-red-500 text-2xl">✕</div>
        <div>
          <h2 className="text-xl font-semibold">{labels.errorTitle}</h2>
          {errorMsg && <p className="text-sm text-gray-500 mt-1">{errorMsg}</p>}
        </div>
        <button
          onClick={() => setStep('form')}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:border-gray-400 transition-colors"
        >
          {labels.retry}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 p-4 w-full max-w-md mx-auto">
      <h2 className="text-base font-semibold">{labels.title}</h2>

      <div className="flex flex-col gap-3">
        {FIELDS.map((f) => (
          <div key={f.id}>
            <label className="block text-sm font-medium mb-1">
              {f.label}
              {f.required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <input
              type={f.type}
              placeholder={f.placeholder}
              value={values[f.id] ?? ''}
              onChange={(e) => handleChange(f.id, e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                errors[f.id] ? 'border-red-400' : 'border-gray-200'
              }`}
            />
            {errors[f.id] && (
              <p className="text-xs text-red-500 mt-0.5">{labels.required}</p>
            )}
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">{labels.notesLabel}</label>
        <textarea
          placeholder={labels.notesPlaceholder}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={step === 'submitting'}
        className="w-full rounded-lg bg-blue-600 text-white py-2.5 text-sm font-medium disabled:opacity-60 hover:bg-blue-700 transition-colors"
      >
        {step === 'submitting' ? labels.submitting : labels.submit}
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
