import axios from 'axios'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!

export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        document: { type: 'text' },
      },
      async authorize(credentials) {
        const res = await axios.post(`${NEXTAUTH_URL}/api/sign-in`, {
          email: credentials?.email!,
          document: credentials?.document!,
        })

        const user = await res.data
        if (res.data && user) {
          return {
            ...user.data,
            authorization: user.Authorization!,
          }
        } else {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 15 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (!user) {
        const user = await (
          await axios.get(`${NEXTAUTH_URL}/api/users/email/${token.email}`)
        ).data
        if (user) {
          token.email = user.email
        }
        return token
      }

      return {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
        favoriteColor: user.favoriteColor,
      }
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.name = token.name
        session.user.email = token.email
        session.user.favoriteColor = token.favoriteColor
      }
      return session
    },
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
  },
}
