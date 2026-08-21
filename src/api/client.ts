/**
 * HTTP client for the ClipAI API.
 * Dev: Vite proxies /api and /uploads → http://localhost:4000
 */
export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '/api'

const TOKEN_KEY = 'clipai_token'

export class ApiError extends Error {
  status: number

  constructor(message: string, status = 400) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export async function apiDelay(ms = 400) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken()
  const headers = new Headers(init?.headers)
  const isFormData =
    typeof FormData !== 'undefined' && init?.body instanceof FormData

  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) headers.set('Authorization', `Bearer ${token}`)

  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers })
  } catch {
    throw new ApiError(
      'Cannot reach the API. Start the backend with: cd backend && npm run dev',
      503,
    )
  }

  const data = (await response.json().catch(() => ({}))) as {
    message?: string
  } & T

  if (!response.ok) {
    throw new ApiError(data.message || 'Request failed.', response.status)
  }
  return data
}
