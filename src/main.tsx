import '@/app/global.css'

import { FC, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Providers } from '@/app/providers'
import { Main } from '@/pages'
const { worker } = await import('@/mocks/browser')

const root = document.getElementById('root')!

const App: FC = () => (
  <StrictMode>
    <Providers>
      <Main />
    </Providers>
  </StrictMode>
)

worker.start().then(() => createRoot(root).render(<App />))
