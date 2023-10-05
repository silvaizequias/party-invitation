import { Box } from '@mui/material'
import { LayoutProps } from './types'
import { Suspense } from 'react'
import Spinner from '@/components/spinner'

export default function DefaultLayout(props: LayoutProps) {
  const { children } = props

  const unsplashRandom = process.env.NEXT_PUBLIC_UNSPLASH_URL!

  return (
    <main>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          bgcolor: `rgb(255 255 255 / 0.7)`,
          backgroundBlendMode: 'color',
          backgroundImage: `url(${unsplashRandom})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Box
          sx={{
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Suspense fallback={<Spinner />}>{children}</Suspense>
        </Box>
      </Box>
    </main>
  )
}
