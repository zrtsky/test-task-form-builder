import { NextUIProvider } from '@nextui-org/system'
import { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export const queryClient = new QueryClient()

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <main className="dark text-foreground bg-background min-h-dvh">{children}</main>
    </NextUIProvider>
  </QueryClientProvider>
)
