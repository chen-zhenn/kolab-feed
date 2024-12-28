import {  ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import { system } from '@/presentation/theme'
import { IProvider } from './types'

export function UIProvider({ children } : IProvider) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute='class' disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ChakraProvider>
  )
}
