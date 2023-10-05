import { api } from '@/utils/api'
import { AxiosRequestConfig } from 'axios'
import useSWR from 'swr'

export function useFetch<Data = any, Error = any>(
  url: string,
  options?: AxiosRequestConfig,
) {
  const { data, error, mutate } = useSWR<Data, Error>(url, async (url: any) => {
    const response = await api.get(url, options)

    return response.data
  })

  return { data, error, mutate }
}
