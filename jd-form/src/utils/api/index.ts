import axios from 'axios'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const api = axios.create({
  baseURL: NEXTAUTH_URL,
})
