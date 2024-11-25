import { Button } from '@nextui-org/button'
import { FC, FormEvent } from 'react'

import { Field } from '@/api/queries/form-data'
import { DateInput, FieldVisibleWrapper, SelectInput, TextInput } from '@/features/form/entities'

type FormProps = {
  fields: Field[]
  isLoading: boolean
  onSubmit?: () => void
}

export const Form: FC<FormProps> = ({ fields, isLoading, onSubmit }) => {
  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    onSubmit?.()
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <FieldVisibleWrapper key={field.id} id={field.id}>
          {field.type === 'STRING' && <TextInput {...field} />}
          {field.type === 'LIST' && <SelectInput options={field.value!} title={field.title} id={field.id} />}
          {field.type === 'DATE' && <DateInput title={field.title} id={field.id} />}
        </FieldVisibleWrapper>
      ))}
      <Button type="submit" color="primary" size="lg" isLoading={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  )
}
