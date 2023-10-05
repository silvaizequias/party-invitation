import { prisma } from '@/libraries/prisma'
import { NextResponse } from 'next/server'

export const GET = async (
  request: Request,
  { params }: { params: { email: string } },
) => {
  const { email } = params
  try {
    return new NextResponse(
      JSON.stringify(
        await prisma.user.findFirst({
          where: { email: email, softDeleted: false },
          select: {
            id: true,
            isActive: true,
            role: true,
            name: true,
            email: true,
            favoriteColor: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    return new NextResponse(error?.message || error, { status: 400 })
  }
}
