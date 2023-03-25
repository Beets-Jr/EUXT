import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/react-query'
import Head from 'next/head'

import Header from '@/components/Header'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head><title>EUXT | Exploring User eXperience Tools </title></Head>
      <Header />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
