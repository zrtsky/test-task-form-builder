import { DatePicker } from '@nextui-org/date-picker'
import capitalize from 'lodash/capitalize'
import { FC } from 'react'

import { useFormStore } from '@/features/form/stores'
import { shallowPick } from '@/shared/utils/stores'

export type DateInputProps = {
  title: string
  id: string
}

export const DateInput: FC<DateInputProps> = ({ title, id }) => {
  const { getFieldById, onChange, validateById } = useFormStore(
    shallowPick('onChange', 'getFieldById', 'validateById'),
  )

  const error = useFormStore((store) => store.getErrorById(id))

  return (
    <DatePicker
      label={capitalize(title)}
      isRequired={getFieldById(id)?.mandatory}
      onChange={(value) => onChange(id, value.toString())}
      onBlur={() => validateById(id)}
      errorMessage={error ? error : ''}
      isInvalid={!!error}
    />
  )
}
