import { ReactNode } from 'react'

export interface ShowInDialogProps {
  children: ReactNode
  onClose: () => void
  open: boolean
  title?: string
}
