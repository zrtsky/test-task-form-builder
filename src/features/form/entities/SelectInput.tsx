import { Select, SelectItem } from '@nextui-org/select'
import { capitalize } from 'lodash'
import { FC } from 'react'

import { useFormStore } from '@/features/form/stores'
import { shallowPick } from '@/shared/utils/stores'

type SelectInputProps = {
  options: {
    code: string
    value: string
  }[]
  title: string
  id: string
}

export const SelectInput: FC<SelectInputProps> = ({ options, title, id }) => {
  const { onChange, validateById, getFieldById } = useFormStore(
    shallowPick('onChange', 'validateById', 'getFieldById'),
  )
  const error = useFormStore((store) => store.getErrorById(id))

  return (
    <Select
      label={capitalize(title)}
      className="w-full"
      onSelectionChange={(ev) => onChange(id, ev.currentKey as string)}
      errorMessage={error ? error : ''}
      isInvalid={!!error}
      onClose={() => validateById(id)}
      isRequired={getFieldById(id)?.mandatory}
    >
      {options.map(({ code, value }) => (
        <SelectItem key={code}>{value}</SelectItem>
      ))}
    </Select>
  )
}
