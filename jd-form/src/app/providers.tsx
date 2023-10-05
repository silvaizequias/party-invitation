import ToastProvider from '@/components/toast-provider'
import themeOptions from '@/theme'
import NextAppDirEmotionCacheProvider from '@/theme/EmotionCache'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={themeOptions}>
        <CssBaseline />
        {children}
        <ToastProvider />
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  )
}
