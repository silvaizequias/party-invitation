'use client'

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { useState } from 'react'
import ShowInDialog from '@/components/show-in-dialog'
import SignInForm from '../users/forms/SignInForm'
import SignUpForm from '../users/forms/SignUpForm'

export default function LandingView() {
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleDialog = () => {
    setOpenDialog(!openDialog)
  }

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              mx: 4,
              textAlign: { xs: 'center', sm: 'center', md: 'right' },
            }}
          >
            <Typography
              variant='h6'
              sx={{ mt: 4, textTransform: 'uppercase', color: grey[800] }}
            >
              confirme sua presença
            </Typography>
            <Typography
              variant='h2'
              sx={{ my: 4, fontWeight: 400, color: blue[800] }}
            >
              Você é o Meu Convidado Especial!
            </Typography>
            <Typography variant='body1'>
              Para confirmar sua presença preencha o formulário, escolhendo sua
              cor favoria para ir no dia do evento.
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item sm={12} md={6}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ mx: 4, my: 4, maxWidth: '740px' }}>
            <Card elevation={4}>
              <CardContent sx={{ p: 4 }}>
                <SignUpForm />
                <Box>
                  <Divider sx={{ m: 2 }} />
                  <Button fullWidth variant='outlined' onClick={handleDialog}>
                    Já confirmei presença
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
        <ShowInDialog open={openDialog} onClose={handleDialog} title='Verificar Informações'>
          <SignInForm />
        </ShowInDialog>
      </Grid>
    </Grid>
  )
}
