import { Button } from '@nextui-org/button'
import { Card, CardBody } from '@nextui-org/card'
import confetti from 'canvas-confetti'
import { FC } from 'react'
import { useMount } from 'react-use'

type SuccessListProps = {
  list: {
    label: string
    value: string
  }[]
  onClick: () => void
}

export const SuccessList: FC<SuccessListProps> = ({ list, onClick }) => {
  useMount(() => {
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 140,
        origin: { y: 0.4 },
        decay: 0.9,
      })
    }, 100)
  })

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">🎉 Data submitted successfully</h1>
      {list.map(({ label, value }) => (
        <Card key={value}>
          <CardBody>
            <p className="text-gray-600 text-xs mb-2">{label}</p>
            <p className="text-md font-semibold">{value}</p>
          </CardBody>
        </Card>
      ))}
      <Button size="lg" onClick={onClick} className="w-full" color="success">
        Submit again
      </Button>
    </div>
  )
}
