import { useTheme } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { Typography } from '@mui/material'

export default function Spinner({ sx }: { sx?: BoxProps['sx'] }) {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx,
      }}
    >
      <CircularProgress disableShrink sx={{ my: 6 }} />
      <Typography
        variant='body1'
        textTransform={'uppercase'}
        textAlign={'center'}
      >
        Carregando informações....
      </Typography>
    </Box>
  )
}
