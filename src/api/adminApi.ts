import { apiFetch } from './client'
import type { BillingStatus, PlanId, User, UserRole } from '@/types/app'

export interface AdminStats {
  totals: {
    users: number
    activeUsers: number
    disabledUsers: number
    admins: number
    verifiedUsers: number
  }
  byPlan: Record<string, number>
  byBilling: Record<string, number>
  recentUsers: User[]
}

export interface AdminUsersResponse {
  items: User[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface AdminUserFilters {
  page?: number
  limit?: number
  q?: string
  planId?: PlanId
  billingStatus?: BillingStatus
  role?: UserRole
  isActive?: boolean
}

export interface AdminUserUpdate {
  name?: string
  email?: string
  planId?: PlanId
  remainingEdits?: number
  billingStatus?: BillingStatus
  role?: UserRole
  isActive?: boolean
  emailVerified?: boolean
}

function toQuery(filters: AdminUserFilters = {}) {
  const params = new URLSearchParams()
  if (filters.page) params.set('page', String(filters.page))
  if (filters.limit) params.set('limit', String(filters.limit))
  if (filters.q) params.set('q', filters.q)
  if (filters.planId) params.set('planId', filters.planId)
  if (filters.billingStatus) params.set('billingStatus', filters.billingStatus)
  if (filters.role) params.set('role', filters.role)
  if (filters.isActive !== undefined) {
    params.set('isActive', String(filters.isActive))
  }
  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

export const adminApi = {
  async getStats(): Promise<AdminStats> {
    return apiFetch<AdminStats>('/admin/stats')
  },

  async listUsers(filters?: AdminUserFilters): Promise<AdminUsersResponse> {
    return apiFetch<AdminUsersResponse>(`/admin/users${toQuery(filters)}`)
  },

  async getUser(id: string): Promise<User> {
    const data = await apiFetch<{ user: User }>(`/admin/users/${id}`)
    return data.user
  },

  async updateUser(id: string, input: AdminUserUpdate): Promise<User> {
    const data = await apiFetch<{ user: User }>(`/admin/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    })
    return data.user
  },

  async deleteUser(id: string): Promise<void> {
    await apiFetch(`/admin/users/${id}`, { method: 'DELETE' })
  },

  async verifyUserEmail(id: string): Promise<User> {
    const data = await apiFetch<{ user: User }>(
      `/admin/users/${id}/verify-email`,
      { method: 'POST' },
    )
    return data.user
  },
}
