export type FormFieldOption = {
  value: string
  label?: Record<string, string> | string | null
}

export type FormField = {
  as?: string
  name: string
  label?: Record<string, string> | string | null
  description?: Record<string, string> | string | null
  type?: string
  source?: string
  required?: boolean
  default?: unknown
  options?: Array<string | FormFieldOption>
}

export type FormDefinition = {
  title?: Record<string, string> | string | null
  description?: Record<string, string> | string | null
  definition?: {
    actions?: Array<{
      type?: string
      inputs?: FormField[]
    }>
  }
}

export type FormPublicData = {
  FORM: FormDefinition | null
}

export type FormSubmitPrefill = {
  formId?: string
  teamSlug?: string
  title?: string
  values?: Record<string, unknown>
  name?: string
  email?: string
  phone?: string
  message?: string
}
