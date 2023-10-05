import { prisma } from '@/libraries/prisma'
import { Prisma } from '@prisma/client'

import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const user = await prisma.user.findFirst({
      where: { role: 'administrator', document: '00000000000' },
    })
    if (!user) {
      const data: Prisma.UserCreateInput = {
        role: 'administrator',
        isActive: true,
        name: 'Anfitrião',
        email: 'admin@email.com',
        document: '00000000000',
        favoriteColor: 'blue',
      }

      return new NextResponse(
        JSON.stringify(await prisma.user.create({ data })),
        { status: 201 },
      )
    }

    return new Response('O anfitrião já existe!')
  } catch (error: any) {
    return new NextResponse(error?.message || error, { status: 400 })
  }
}
