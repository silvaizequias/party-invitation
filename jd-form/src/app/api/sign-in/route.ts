import { prisma } from '@/libraries/prisma'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import { SignInSchema, SignInSchemaType } from '@/types/user/schema'

export const POST = async (request: Request): Promise<any> => {
  const NEXT_PUBLIC_JWT_SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY!
  const inputs: SignInSchemaType = await request.json()
  try {
    if (await SignInSchema.parseAsync(inputs)) {
      const { email, document } = inputs

      const user = await prisma.user.findFirst({
        where: { email: email, document: document },
      })
      if (!user)
        return new NextResponse(
          `O E-mail ou CPF não existe em nosso sistema!`,
          { status: 404 },
        )

      const encryptedToken = jwt.sign(
        {
          email: user?.email!,
          role: user?.role!,
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
        },
        NEXT_PUBLIC_JWT_SECRET_KEY,
      )

      return new NextResponse(
        JSON.stringify({
          expiresIn: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
          Authorization: encryptedToken,
          data: {
            id: user?.id!,
            name: user?.name!,
            email: user?.email!,
            favoriteColor: user?.favoriteColor!,
            role: user?.role!,
            isActive: user?.isActive!,
          },
        }),
        { status: 201 },
      )
    }
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}
