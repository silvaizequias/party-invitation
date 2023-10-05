import { UserType } from '@/types/user'
import { SignUpSchema, SignUpSchemaType } from '@/types/user/schema'
import { colorPalette } from '@/utils/color-palette'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function SignUpForm() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<SignUpSchemaType>({
    mode: 'all',
    resolver: zodResolver(SignUpSchema),
  })

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (inputs) => {
    try {
      await axios
        .post(`/api/users`, inputs)
        .then(async (res: any) => {
          if (res.status == 201) {
            reset({})
            toast.success(`${inputs.name}, será um prazer ter a sua presença!`)

            const user: UserType = await res.data
            const { email, document } = user
            await signIn('credentials', {
              redirect: false,
              email: email,
              document: document,
            }).then(async () => {
              toast.success(`Confira o seu cartão de presença!`)
              router.refresh()
            })
          }
          if (res.status == 409) {
            toast.error('este e-mail ou cpf já existe na lista de usuários!')
            reset({})
          }
        })
        .catch((error: any) => {
          toast.error(error?.message)
          console.error(error)
        })
    } catch (error: any) {
      toast.error(error?.message)
      console.error(error)
    }
  }

  return (
    <form data-test={'sign-up-form'} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <FormControl>
            <FormLabel id='favoriteColor' sx={{ fontSize: 'small' }}>
              Escolha sua cor favorita
            </FormLabel>
            <RadioGroup row id='favoriteColor'>
              {colorPalette.map((color: any) => (
                <FormControlLabel
                  {...register('favoriteColor')}
                  key={color.name}
                  control={
                    <Radio
                      id='favoriteColor'
                      value={color.value}
                      sx={{
                        color: color.hexa,
                        '&.Mui-checked': {
                          color: color.hexa,
                        },
                      }}
                    />
                  }
                  label={color.name}
                />
              ))}
            </RadioGroup>
            {errors.favoriteColor && (
              <FormHelperText className='error-message-favorite-color'>
                {errors.favoriteColor.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <Controller
              {...register('name')}
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  id='name'
                  label='Nome Completo'
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.name)}
                  placeholder='Seu Nome Completo'
                  size='small'
                />
              )}
            />
            {errors.name && (
              <FormHelperText className='error-message-name'>
                {errors.name.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={4}>
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
          <FormControl fullWidth>
            <Controller
              {...register('comments')}
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  id='comments'
                  label='Observações'
                  multiline
                  rows={4}
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.comments)}
                  placeholder='Observações'
                  size='small'
                />
              )}
            />
            {errors.comments && (
              <FormHelperText className='error-message-comments'>
                {errors.comments.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button
            id='create-user'
            fullWidth
            type='submit'
            variant='contained'
            color='primary'
          >
            Adicionar Usuário
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
