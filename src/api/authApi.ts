import { apiFetch, clearToken, getToken, setToken } from './client'
import type { PlanId, User } from '@/types/app'

interface AuthResponse {
  user: User
  token: string
  devVerifyUrl?: string
}

interface UserResponse {
  user: User
}

export const authApi = {
  async register(input: {
    name: string
    email: string
    password: string
    planId?: PlanId
  }): Promise<User> {
    const data = await apiFetch<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(input),
    })
    setToken(data.token)
    return data.user
  },

  async login(input: { email: string; password: string }): Promise<User> {
    const data = await apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(input),
    })
    setToken(data.token)
    return data.user
  },

  async logout(): Promise<void> {
    try {
      if (getToken()) {
        await apiFetch('/auth/logout', { method: 'POST' })
      }
    } catch {
      // still clear local session
    }
    clearToken()
  },

  async getSession(): Promise<User | null> {
    if (!getToken()) return null
    try {
      const data = await apiFetch<UserResponse>('/auth/me')
      return data.user
    } catch {
      clearToken()
      return null
    }
  },

  async updateProfile(input: {
    name?: string
    email?: string
  }): Promise<User> {
    const data = await apiFetch<UserResponse>('/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(input),
    })
    return data.user
  },

  async changePassword(input: {
    currentPassword: string
    newPassword: string
  }): Promise<void> {
    await apiFetch('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(input),
    })
  },

  async requestPasswordReset(email: string): Promise<{
    message: string
    devResetUrl?: string
  }> {
    return apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await apiFetch('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    })
  },

  async verifyEmail(token: string): Promise<User> {
    const data = await apiFetch<UserResponse>('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    })
    return data.user
  },

  async resendVerification(): Promise<{
    message: string
    devVerifyUrl?: string
  }> {
    return apiFetch('/auth/resend-verification', { method: 'POST' })
  },

  async setPlan(planId: PlanId): Promise<User> {
    const data = await apiFetch<UserResponse>('/auth/plan', {
      method: 'POST',
      body: JSON.stringify({ planId }),
    })
    return data.user
  },

  async cancelSubscription(): Promise<User> {
    const data = await apiFetch<UserResponse>('/auth/cancel-subscription', {
      method: 'POST',
    })
    return data.user
  },

  async useEditCredit(): Promise<User> {
    const data = await apiFetch<UserResponse>('/auth/use-credit', {
      method: 'POST',
    })
    return data.user
  },

  async refreshUser(): Promise<User | null> {
    return this.getSession()
  },
}
