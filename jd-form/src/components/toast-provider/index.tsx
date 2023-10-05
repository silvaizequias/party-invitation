import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
  return (
    <Toaster
      position={'top-center'}
      toastOptions={{ className: 'react-hot-toast' }}
    />
  )
}
