import { Spinner } from '@nextui-org/spinner'
import { ShieldCross } from 'iconsax-react'
import { useQuery } from 'react-query'

import { QueryKeys } from '@/api/consts'
import { getFormFields } from '@/api/queries/form-data'
import { MainPageForm } from '@/widgets/main-page-form'

export const Main = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: QueryKeys.FORM_DATA,
    queryFn: getFormFields,
  })

  if (error)
    return (
      <div className="h-dvh flex justify-center items-center flex-col gap-4">
        <ShieldCross size="64" color="#FF8A65" />
        <h4>Error, something went wrong</h4>
      </div>
    )

  if (isLoading)
    return (
      <div className="h-dvh flex justify-center items-center flex-col gap-4">
        <Spinner label="Loading" color="primary" labelColor="primary" size="lg" />
      </div>
    )

  return (
    <div className="container">
      <MainPageForm fields={data!} />
    </div>
  )
}
