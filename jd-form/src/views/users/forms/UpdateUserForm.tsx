import { UpdateUserSchema, UpdateUserSchemaType } from '@/types/user/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { UserDetailProps } from './types'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function UpdateUserForm(props: UserDetailProps) {
  const { user, onClose } = props
  const userId = user?.id!

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<UpdateUserSchemaType>({
    mode: 'all',
    resolver: zodResolver(UpdateUserSchema),
  })

  const router = useRouter()

  const handleSoftDelete = async () => {
    await axios
      .put(`/api/users/${userId}`)
      .then(() => {
        toast.success(`${user.name} foi removido(a) da lista!`)
        onClose()
      })
      .catch((error: any) => {
        toast.error(error?.message)
        console.error(error)
      })
  }

  const onSubmit: SubmitHandler<UpdateUserSchemaType> = async (inputs) => {
    try {
      await axios
        .patch(`/api/users/${userId}`, inputs)
        .then(() => {
          router.replace('/')
          toast.success(`as informações de ${user.name} foram atualizadas!`)
          onClose()
        })
        .catch((error: any) => {
          toast.error(error?.message)
        })
    } catch (error: any) {
      toast.error(error?.message)
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} marginY={2}>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <Controller
              {...register('name')}
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  id='name'
                  label='Nome Completo'
                  value={value}
                  defaultValue={user?.name!}
                  onChange={onChange}
                  error={Boolean(errors.name)}
                  placeholder={user.name}
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
                  defaultValue={user?.comments!}
                  onChange={onChange}
                  error={Boolean(errors.comments)}
                  placeholder={user.comments}
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
          <Button id='update-user' fullWidth type='submit' variant='contained'>
            Atualizar Informações
          </Button>
          <Divider sx={{ p: 2 }}>ou</Divider>
          <Button
            id='soft-delete-user'
            fullWidth
            variant='outlined'
            color='warning'
            onClick={handleSoftDelete}
          >
            Remover da Lista
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
