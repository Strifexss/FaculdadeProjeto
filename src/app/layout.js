"use client"
import './globals.css'

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

export default function RootLayout({ children }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
    <html lang="en">
      <body>{children}</body>
    </html>
    </QueryClientProvider>
    </>
  )
}
