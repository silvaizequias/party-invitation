import * as z from 'zod'

const COLORS = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
] as const

export const CreateUserSchema = z.object({
  name: z
    .string({ required_error: 'campo obrigatório' })
    .min(5, { message: 'precisa ter mais de 5 caracteres' })
    .max(255, { message: 'suporta até 255 caracteres' }),
  email: z
    .string({ required_error: 'campo obrigatório' })
    .email({ message: 'precisa ser um e-mail válido' }),
  document: z
    .string({ required_error: 'campo obrigatório' })
    .length(11, { message: 'precisa ter 11 números' }),
  favoriteColor: z.enum(COLORS, {
    required_error: 'precisa escolher uma cor',
    invalid_type_error: 'precisa escolher uma cor',
  }),
  comments: z
    .string({ required_error: 'campo obrigatório' })
    .min(5, { message: 'precisa ter mais de 5 caracteres' }),
})
export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>

export const UpdateUserSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'precisa ter mais de 5 caracteres' })
    .max(255, { message: 'suporta até 255 caracteres' })
    .optional(),
  comments: z
    .string()
    .min(5, { message: 'precisa ter mais de 5 caracteres' })
    .optional(),
})
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>

export const SignInSchema = z.object({
  email: z
    .string({ required_error: 'campo obrigatório' })
    .email({ message: 'precisa ser um e-mail válido' }),
  document: z
    .string({ required_error: 'campo obrigatório' })
    .length(11, { message: 'precisa ter 11 números' }),
})
export type SignInSchemaType = z.infer<typeof SignInSchema>

export const SignUpSchema = z.object({
  name: z
    .string({ required_error: 'campo obrigatório' })
    .min(5, { message: 'precisa ter mais de 5 caracteres' })
    .max(255, { message: 'suporta até 255 caracteres' }),
  email: z
    .string({ required_error: 'campo obrigatório' })
    .email({ message: 'precisa ser um e-mail válido' }),
  document: z
    .string({ required_error: 'campo obrigatório' })
    .length(11, { message: 'precisa ter 11 números' }),
  favoriteColor: z.enum(COLORS, {
    required_error: 'precisa escolher uma cor',
    invalid_type_error: 'precisa escolher uma cor',
  }),
  comments: z
    .string({ required_error: 'campo obrigatório' })
    .min(5, { message: 'precisa ter mais de 5 caracteres' }),
})
export type SignUpSchemaType = z.infer<typeof SignUpSchema>
