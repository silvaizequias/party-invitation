import { SignInSchema, SignInSchemaType } from '@/types/user/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from '@mui/material'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function SignInForm() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<SignInSchemaType>({
    mode: 'all',
    resolver: zodResolver(SignInSchema),
  })

  const onSubmit: SubmitHandler<SignInSchemaType> = async (inputs) => {
    const { email, document } = inputs
    try {
      await signIn('credentials', {
        redirect: false,
        email: email,
        document: document,
      }).then(async (res: any) => {
        if (!res.error && res.url) {
          reset({})
          toast.success(`Presença Confirmada!`)
          router.refresh()
        } else {
          toast.error(res.error)
        }
      })
    } catch (error: any) {
      toast.error(error?.message)
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              {...register('email')}
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  id='email'
                  label='E-mail'
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.email)}
                  placeholder='seu@email.com'
                  size='small'
                />
              )}
            />
            {errors.email && (
              <FormHelperText>{errors.email.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Controller
              {...register('document')}
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  id='document'
                  label='CPF'
                  type='number'
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.document)}
                  placeholder='098.765.432-10'
                  size='small'
                />
              )}
            />
            {errors.document && (
              <FormHelperText className='error-message-document'>
                {errors.document.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            id='signin-user'
            fullWidth
            type='submit'
            variant='contained'
            color='primary'
          >
            Iniciar Sessão
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
