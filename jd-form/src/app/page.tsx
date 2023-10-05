import { authOptions } from '@/libraries/next-auth'
import LandingView from '@/views/landing'
import UserView from '@/views/users'
import AdminView from '@/views/users/AdminView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Confirmação de Presença',
}

export default async function LandingPage() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      {!session ? (
        <LandingView />
      ) : session.user.role == 'administrator' ? (
        <AdminView session={session!} />
      ) : (
        <UserView session={session!} />
      )}
    </main>
  )
}
