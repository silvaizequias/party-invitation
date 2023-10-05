import { authOptions } from '@/libraries/next-auth'
import { prisma } from '@/libraries/prisma'
import { UserType } from '@/types/user'
import { UpdateUserSchema, UpdateUserSchemaType } from '@/types/user/schema'
import { Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params
  const session = await getServerSession(authOptions)

  try {
    if (!session || session?.user.role !== 'administrator')
      return new NextResponse(
        'você não possui privilégios para realizar essa ação',
        { status: 403 },
      )

    return new NextResponse(
      JSON.stringify(
        await prisma.user.findFirst({
          where: { id: id, softDeleted: false },
        }),
      ),
    )
  } catch (error: any) {
    return new NextResponse(error?.message || error, { status: 400 })
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
): Promise<UserType | any> => {
  const { id } = params
  const session = await getServerSession(authOptions)

  try {
    if (!session || session?.user.role !== 'administrator')
      return new NextResponse(
        'você não possui privilégios para realizar essa ação',
        { status: 403 },
      )

    const inputs: UpdateUserSchemaType = await request.json()
    if (await UpdateUserSchema.parseAsync(inputs)) {
      return new NextResponse(
        JSON.stringify(
          await prisma.user.update({ where: { id }, data: inputs }),
        ),
        { status: 201 },
      )
    }
  } catch (error: any) {
    return new NextResponse(error?.message || error, { status: 400 })
  }
}

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } },
): Promise<UserType | any> => {
  const { id } = params
  const session = await getServerSession(authOptions)

  try {
    if (!session || session?.user.role !== 'administrator')
      return new NextResponse(
        'você não possui privilégios para realizar essa ação',
        { status: 403 },
      )
    const user = await prisma.user.findFirst({
      where: { id: id, softDeleted: false },
    })
    if (!user)
      return new NextResponse('o usuário não foi encontrado na lista!', {
        status: 404,
      })

    const data: Prisma.UserUpdateInput = {
      isActive: false,
      softDeleted: true,
    }
    await prisma.user.update({ where: { id: id }, data })

    return new NextResponse(
      JSON.stringify('o usuário foi retirado da lista!'),
      { status: 201 },
    )
  } catch (error: any) {
    return new NextResponse(error?.message || error, { status: 400 })
  }
}

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } },
): Promise<any> => {
  const { id } = params
  const session = await getServerSession(authOptions)

  try {
    if (!session || session?.user.role !== 'administrator')
      return new NextResponse(
        'você não possui privilégios para realizar essa ação',
        { status: 403 },
      )
    const user = await prisma.user.findFirst({
      where: { id: id, softDeleted: true },
    })
    if (!user)
      return new NextResponse('o usuário não foi encontrado na lista!', {
        status: 404,
      })

    await prisma.user.delete({ where: { id: id } })

    return new NextResponse(
      JSON.stringify('o usuário foi removido permanentemente da lista!'),
      { status: 201 },
    )
  } catch (error: any) {
    return new NextResponse(error?.message || error, { status: 400 })
  }
}
