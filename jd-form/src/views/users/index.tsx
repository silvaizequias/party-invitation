'use client'

import { PageViewProps } from '@/layouts/types'
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import { signOut } from 'next-auth/react'
import toast from 'react-hot-toast'

export default function UserView(props: PageViewProps) {
  const { user }: any = props.session!
  const handleLogOut = () => {
    signOut()
    toast.success('Até logo!')
  }

  const userColor = user.favoriteColor

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={12}>
        <Box sx={{ mx: 4, my: 4, maxWidth: '380px' }}>
          <Card
            elevation={4}
            sx={{
              bgcolor: userColor,
              color: userColor == 'yellow' ? 'black' : 'white',
            }}
          >
            <CardContent>
              <Typography
                variant='h4'
                sx={{
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  fontWeight: 200,
                }}
              >
                {user.name}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                variant='h6'
                sx={{
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontWeight: 200,
                }}
              >
                Sua presença está confirmada, e este cartão tem sua cor favorita
                para usar no dia do evento!
              </Typography>
            </CardContent>
            <CardContent>
              <Button fullWidth variant='contained' onClick={handleLogOut}>
                Encerrar Sessão
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  )
}
