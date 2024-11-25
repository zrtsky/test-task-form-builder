import { Input } from '@nextui-org/input'
import capitalize from 'lodash/capitalize'
import { FC } from 'react'

import { useFormStore } from '@/features/form/stores'
import { shallowPick } from '@/shared/utils/stores'

type TextInputProps = {
  id: string
  title: string
}

export const TextInput: FC<TextInputProps> = ({ id, title }) => {
  const { onChange, getFieldById, validateById } = useFormStore(
    shallowPick('onChange', 'getFieldById', 'validateById'),
  )

  const error = useFormStore((store) => store.getErrorById(id))

  return (
    <Input
      id={id}
      label={capitalize(title)}
      onChange={(ev) => onChange(id, ev.target.value)}
      onBlur={() => validateById(id)}
      isInvalid={!!error}
      errorMessage={error ? error : ''}
      isRequired={getFieldById(id)?.mandatory}
    />
  )
}
