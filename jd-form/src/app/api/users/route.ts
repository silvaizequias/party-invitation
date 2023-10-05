import { authOptions } from '@/libraries/next-auth'
import { prisma } from '@/libraries/prisma'
import { UserType } from '@/types/user'
import { CreateUserSchema, CreateUserSchemaType } from '@/types/user/schema'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  const session = await getServerSession(authOptions)

  try {
    if (!session || session?.user.role !== 'administrator')
      return new NextResponse(
        'você não possui privilégios para realizar essa ação',
        { status: 403 },
      )

    return new NextResponse(
      JSON.stringify(
        await prisma.user.findMany({
          where: { softDeleted: false },
          orderBy: {
            name: 'asc',
          },
        }),
      ),
    )
  } catch (error: any) {
    return new NextResponse(error?.message || error, { status: 400 })
  }
}

export const POST = async (request: Request): Promise<UserType | any> => {
  try {
    const inputs: CreateUserSchemaType = await request.json()
    if (await CreateUserSchema.parseAsync(inputs)) {
      const { email, document } = inputs

      return new NextResponse(
        JSON.stringify(await prisma.user.create({ data: inputs })),
        { status: 201 },
      )
    }
  } catch (error: any) {
    return new NextResponse(error?.message || error, { status: 400 })
  }
}
