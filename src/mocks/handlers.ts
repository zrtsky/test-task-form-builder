import { http, HttpResponse } from 'msw'

import { fieldsData } from '@/api/queries/form-data'
import { env } from '@/app/env'
import { sleep } from '@/shared/utils/time'

const baseUrl = env.VITE_BASE_URL

export const handlers = [
  http.get(`${baseUrl}/form-data`, async () => {
    await sleep(2000)

    return HttpResponse.json(fieldsData)
  }),

  http.post(`${baseUrl}/form-submit`, async ({ request }) => {
    await sleep(1000)
    const data = await request.json()

    return HttpResponse.json(data, { status: 201 })
  }),
]
