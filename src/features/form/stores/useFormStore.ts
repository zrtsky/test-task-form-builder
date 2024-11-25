import { formatDate } from 'date-fns'
import { create } from 'zustand'

import { Field } from '@/api/queries/form-data'

type FormStore = {
  formData: Map<string, string>
  onChange: (id: string, value: string) => void
  errors: Map<string, string>
  fields: Field[]
  setFields: (fields: Field[]) => void
  getFieldById: (id: string) => Field | undefined
  clearAll: () => void
  validateById: (id: string) => void
  isVisible: (id: string) => boolean
  validateAll: () => boolean
  getErrorById: (id: string) => string | undefined
}

const initialState = {
  fields: [],
  formData: new Map<string, string>(),
  errors: new Map<string, string>(),
  visibleIds: new Map<string, boolean>(),
}

export const useFormStore = create<FormStore>((set, get) => ({
  ...initialState,

  setFields: (fields) => {
    set({ fields })
  },

  getFieldById: (id) => {
    return get().fields.find((field) => field.id === id)
  },

  validateById: (id) => {
    const { getFieldById, formData, errors } = get()
    const formValue = formData.get(id)

    const field = getFieldById(id)
    if (!field) return
    const { mandatory, validation, type } = field

    errors.set(id, '')

    if (mandatory && !formValue) {
      errors.set(id, 'Field is required')
    }

    const value =
      type === 'DATE' && formValue ? formatDate(new Date(formValue), 'dd.MM.yyyy') : formValue || ''

    const validationRegex = new RegExp(validation || '')
    if (!!validation && !!value && !validationRegex.test(value)) {
      errors.set(id, 'Invalid value')
    }

    set({ errors })
  },

  isVisible: (id) => {
    const { formData, getFieldById } = get()
    const field = getFieldById(id)

    if (!field) return false

    if (!field.dependsOn) return true
    if (!formData.get(field.dependsOn)) return false

    return true
  },

  validateAll: () => {
    const { fields, errors, validateById, isVisible } = get()

    fields.forEach(({ id }) => {
      if (isVisible(id)) validateById(id)
    })

    return !Array.from(errors.values()).some((error) => !!error)
  },

  getErrorById: (id) => {
    const { errors } = get()
    return errors.get(id)
  },

  onChange: (id, value) => {
    const { formData, validateById } = get()
    const newData = formData.set(id, value)
    set({ formData: newData })
    validateById(id)
  },
  clearAll: () => set(initialState),
}))
