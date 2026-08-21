import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { authApi } from '@/api'
import type { PlanId, User } from '@/types/app'

interface AuthContextValue {
  user: User | null
  loading: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<User>
  register: (name: string, email: string, password: string) => Promise<User>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  updateProfile: (input: { name?: string; email?: string }) => Promise<void>
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>
  setPlan: (planId: PlanId) => Promise<void>
  cancelSubscription: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    authApi
      .getSession()
      .then((session) => {
        if (mounted) setUser(session)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const next = await authApi.login({ email, password })
    setUser(next)
    return next
  }, [])

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const next = await authApi.register({ name, email, password })
      setUser(next)
      return next
    },
    [],
  )

  const logout = useCallback(async () => {
    await authApi.logout()
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    const next = await authApi.refreshUser()
    setUser(next)
  }, [])

  const updateProfile = useCallback(
    async (input: { name?: string; email?: string }) => {
      const next = await authApi.updateProfile(input)
      setUser(next)
    },
    [],
  )

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      await authApi.changePassword({ currentPassword, newPassword })
    },
    [],
  )

  const setPlan = useCallback(async (planId: PlanId) => {
    const next = await authApi.setPlan(planId)
    setUser(next)
  }, [])

  const cancelSubscription = useCallback(async () => {
    const next = await authApi.cancelSubscription()
    setUser(next)
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
      refreshUser,
      updateProfile,
      changePassword,
      setPlan,
      cancelSubscription,
    }),
    [
      user,
      loading,
      login,
      register,
      logout,
      refreshUser,
      updateProfile,
      changePassword,
      setPlan,
      cancelSubscription,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
