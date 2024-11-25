import { AnimatePresence, motion } from 'framer-motion'
import { FC, PropsWithChildren } from 'react'

import { useFormStore } from '@/features/form/stores'

type FieldVisibleWrapperProps = PropsWithChildren<{
  id: string
}>

export const FieldVisibleWrapper: FC<FieldVisibleWrapperProps> = ({ id, children }) => {
  const isVisible = useFormStore((store) => store.isVisible(id))

  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
