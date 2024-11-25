import { AnimatePresence, motion } from 'framer-motion'
import { FC, useCallback, useMemo } from 'react'
import { useMutation } from 'react-query'
import { useBoolean, useMount, useUnmount } from 'react-use'

import { Field } from '@/api/queries/form-data'
import { FieldsDataMap, submitForm } from '@/api/queries/form-submit'
import { SuccessList } from '@/entities'
import { Form } from '@/features/form'
import { useFormStore } from '@/features/form/stores'
import { shallowPick } from '@/shared/utils/stores'

type MainPageFormProps = {
  fields: Field[]
}

export const MainPageForm: FC<MainPageFormProps> = ({ fields }) => {
  const [isSubmitted, setIsSubmitted] = useBoolean(false)
  const { mutate, isLoading, data } = useMutation({
    mutationFn: (data: FieldsDataMap) => submitForm(data),
    onSuccess: () => setIsSubmitted(true),
  })

  const { clearAll, setFields, formData, validateAll } = useFormStore(
    shallowPick('setFields', 'clearAll', 'formData', 'validateAll'),
  )

  useMount(() => setFields(fields))
  useUnmount(clearAll)

  const handleSubmit = useCallback(() => {
    if (!validateAll()) return
    mutate(Object.fromEntries(formData))
  }, [formData])

  const formattedData = useMemo(() => {
    if (!data) return []
    return Object.entries(data).map(([key, value]) => ({
      label: key,
      value,
    }))
  }, [data])

  return (
    <div className="py-10 max-w-lg mx-auto">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={String(isSubmitted)}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.35 }}
        >
          {!isSubmitted && <Form fields={fields} isLoading={isLoading} onSubmit={handleSubmit} />}
          {isSubmitted && <SuccessList list={formattedData} onClick={() => setIsSubmitted(false)} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
