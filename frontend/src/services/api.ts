import axios, { type InternalAxiosRequestConfig } from 'axios'

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export const TOKEN_STORAGE_KEY = 'token'

export const api = axios.create({
  baseURL,
})

// Interceptor JWT: anexa "Authorization: Bearer <token>" sempre que houver
// um token salvo no localStorage.
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }

  return config
})
