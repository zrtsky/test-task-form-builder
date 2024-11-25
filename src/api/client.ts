import ky from 'ky'

import { env } from '@/app/env'

export const api = ky.create({
  prefixUrl: env.VITE_BASE_URL,
})

export const fetcher = <T>(url: string) => api.get<T>(url).json()
