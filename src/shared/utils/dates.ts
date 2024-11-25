import { formatDate } from 'date-fns'

export const formateDate = (date: Date) => {
  return formatDate(date, 'dd.MM.yyyy')
}
