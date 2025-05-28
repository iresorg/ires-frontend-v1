import axios from 'axios'
import type { ApiResponse } from '@/types'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Attempt to refresh token
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken) {
          const response = await api.post<ApiResponse<{ token: string }>>('/auth/refresh', {
            refreshToken,
          })

          const { token } = response.data.data
          localStorage.setItem('auth_token', token)

          // Retry the original request
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem('auth_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/auth/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api 