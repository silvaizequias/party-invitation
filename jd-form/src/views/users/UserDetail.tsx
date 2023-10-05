'use client'

import { Avatar, IconButton, Stack, Tooltip } from '@mui/material'
import { UserDetailProps } from './forms/types'
import { useState } from 'react'
import ShowInDialog from '@/components/show-in-dialog'
import UpdateUserForm from './forms/UpdateUserForm'

export default function UserDetail(props: UserDetailProps) {
  const { user } = props

  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleDialog = () => {
    setOpenDialog(!openDialog)
  }

  return (
    <Stack>
      <Tooltip title={user.name}>
        <IconButton onClick={handleDialog}>
          <Avatar
            alt={user?.name}
            sx={{
              bgcolor: user?.favoriteColor,
              width: 120,
              height: 120,
            }}
          />
        </IconButton>
      </Tooltip>
      <ShowInDialog
        open={openDialog}
        onClose={handleDialog}
        title={`Detalhes de ${user.name}`}
      >
        <UpdateUserForm user={user!} onClose={handleDialog} />
      </ShowInDialog>
    </Stack>
  )
}
