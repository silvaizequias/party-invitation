import type { Metadata } from 'next'
import Providers from './providers'
import { LayoutProps } from '@/layouts/types'
import DefaultLayout from '@/layouts'

export const metadata: Metadata = {
  title: { default: 'Festa do John', template: `%s | Festa do John` },
  description: 'Challenge eteg',
}

export default function RootLayout(props: LayoutProps) {
  const { children } = props

  return (
    <html lang='en'>
      <body>
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  )
}
