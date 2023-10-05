import { UserType } from '@/types/user'

export interface UserDetailProps {
  user: UserType
  onClose: () => void
}

export interface CreateUserFormProps {
  onClose: () => void
}
