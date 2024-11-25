import { api } from '@/api/client'

export enum FieldType {
  LIST,
  STRING,
  DATE,
}

interface ListValue {
  code: string
  value: string
}

export interface Field {
  id: string
  title: string
  type: keyof typeof FieldType
  value?: Array<ListValue>
  mandatory: boolean
  dependsOn?: (typeof fieldsData)[number]['id']
  validation?: string
}

export type FieldCodes = (typeof fieldsData)[number]['id'] // this won't work to narrow string type defined in Field interface

export const fieldsData: readonly Field[] = [
  {
    id: 'country',
    title: 'Country',
    type: 'LIST',
    value: [
      {
        code: 'il',
        value: 'Israel',
      },
      {
        code: 'pl',
        value: 'Poland',
      },
      {
        code: 'uk',
        value: 'United Kingdom',
      },
      {
        code: 'br',
        value: 'Brasil',
      },
    ],
    mandatory: true,
  },
  {
    id: 'businessField',
    title: 'Business field',
    type: 'LIST',
    value: [
      {
        code: '13',
        value: 'Retail',
      },
      {
        code: '122',
        value: 'Sales',
      },
      {
        code: '78',
        value: 'Finance',
      },
    ],
    mandatory: true,
  },
  {
    id: 'address',
    title: 'Address',
    type: 'STRING',
    mandatory: false,
    dependsOn: 'businessField2',
  },
  {
    id: 'phone',
    title: 'phone',
    type: 'STRING',
    mandatory: true,
    dependsOn: 'businessField',
    validation: '^[0-9()-]+$',
  },
  {
    id: 'date',
    title: 'date',
    type: 'DATE',
    mandatory: true,
    dependsOn: 'businessField',
    validation: '^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$',
  },
]

export const getFormFields = async () => api.get<Field[]>('form-data').json()
