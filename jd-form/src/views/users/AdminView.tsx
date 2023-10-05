'use client'

import {
  AppBar,
  Container,
  Fab,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { Suspense, useState } from 'react'
import toast from 'react-hot-toast'
import { MdLogout, MdOutlineAdd } from 'react-icons/md'
import { PageViewProps } from '@/layouts/types'
import { signOut } from 'next-auth/react'
import { UserType } from '@/types/user'
import { useFetch } from '@/hooks/useFetch'
import UserDetail from './UserDetail'
import ShowInDialog from '@/components/show-in-dialog'
import CreateUserForm from './forms/CreateUserForm'
import Spinner from '@/components/spinner'

export default function AdminView(props: PageViewProps) {
  const { session } = props
  const { data: users } = useFetch('/api/users')

  const [userDetailDialog, setUserDetailDialog] = useState<boolean>(false)
  const [openAddUserDialog, setOpenAddUserDialog] = useState<boolean>(false)

  const handleUserDetailDialog = () => {
    setUserDetailDialog(!userDetailDialog)
  }

  const handleAddUserDialog = () => {
    setOpenAddUserDialog(!openAddUserDialog)
  }

  const amountPeople: number = users?.length || 0

  const handleLogOut = () => {
    signOut()
    toast.success('Até logo!')
  }

  return session.user.role == 'administrator' ? (
    <Suspense fallback={<Spinner />}>
      <AppBar
        position='fixed'
        elevation={0}
        sx={{ bgcolor: `rgb(0 0 0 / 0.5)`, position: 'absolute', top: 0 }}
      >
        <Container
          maxWidth='xl'
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Toolbar>
            <Typography
              variant='h4'
              sx={{
                textAlign: 'center',
                textTransform: 'uppercase',
                color: grey[50],
              }}
            >
              {amountPeople < 2
                ? 'Ninguém confirmou presença em sua festa!'
                : amountPeople + ' pessoas confirmaram presença em sua festa!'}
            </Typography>
          </Toolbar>
          <Toolbar>
            <Tooltip title='Encerrar Sessão'>
              <IconButton sx={{ color: grey[50] }} onClick={handleLogOut}>
                <MdLogout />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          {users?.map((user: UserType) => (
            <Grid key={user?.id} item xs={4} sm={3} md={2}>
              <UserDetail user={user!} onClose={handleUserDetailDialog} />
            </Grid>
          ))}
        </Grid>
        <Fab
          sx={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            color: 'common.white',
            bgcolor: blue[400],
            '&:hover': {
              bgcolor: blue[600],
            },
            fontSize: 24,
          }}
          onClick={handleAddUserDialog}
        >
          <MdOutlineAdd />
        </Fab>
        <ShowInDialog
          open={openAddUserDialog}
          onClose={handleAddUserDialog}
          title={'Adicionar usuário na lista'}
        >
          <CreateUserForm onClose={handleAddUserDialog} />
        </ShowInDialog>
      </Container>
    </Suspense>
  ) : null
}
