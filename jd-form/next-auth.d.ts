import 'next-auth/jwt'
import { DefaultSession } from 'next-auth'
import { UserRole } from '@prisma/client'

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: UserRole
    favoriteColor: string
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string
      role: UserRole
      favoriteColor: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    role: UserRole
    favoriteColor: string
  }
}
