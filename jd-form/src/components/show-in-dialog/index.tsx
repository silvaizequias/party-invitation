import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'
import { ShowInDialogProps } from './types'
import { blue, red } from '@mui/material/colors'
import { MdDisabledByDefault } from 'react-icons/md'

export default function ShowInDialog(props: ShowInDialogProps) {
  const { children, onClose, open, title } = props

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: 500,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          justifyItems: 'center',
          p: 1.5,
        }}
      >
        <Tooltip title='Fechar'>
          <IconButton sx={{ p: 0, color: red[500] }} onClick={onClose}>
            <MdDisabledByDefault />
          </IconButton>
        </Tooltip>
      </Box>
      <DialogTitle sx={{ textAlign: 'center', mt: 0, pt: 0 }}>
        <Typography
          variant='h6'
          sx={{
            textTransform: 'uppercase',
            textAlign: 'center',
            fontWeight: '200',
            color: blue[600],
          }}
        >
          {title!}
        </Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
