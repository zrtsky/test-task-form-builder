import { api } from '@/api/client'
import { fieldsData } from '@/api/queries/form-data'

type FieldDataElement = (typeof fieldsData)[number]
type FieldIds = FieldDataElement['id']

export type FieldsDataMap = {
  [K in FieldIds]: string
}

export const submitForm = async (data: FieldsDataMap) => {
  return api
    .post<Record<string, string>>('form-submit', {
      body: JSON.stringify(data),
    })
    .json()
}
