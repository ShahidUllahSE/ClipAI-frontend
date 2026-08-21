import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AuthModal } from './AuthModal'

export type AuthMode = 'login' | 'register'

interface AuthModalContextValue {
  mode: AuthMode | null
  isOpen: boolean
  openAuth: (mode: AuthMode) => void
  closeAuth: () => void
  switchMode: (mode: AuthMode) => void
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null)

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AuthMode | null>(null)

  const openAuth = useCallback((next: AuthMode) => {
    setMode(next)
  }, [])

  const closeAuth = useCallback(() => {
    setMode(null)
  }, [])

  const switchMode = useCallback((next: AuthMode) => {
    setMode(next)
  }, [])

  const value = useMemo(
    () => ({
      mode,
      isOpen: mode !== null,
      openAuth,
      closeAuth,
      switchMode,
    }),
    [mode, openAuth, closeAuth, switchMode],
  )

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <AuthModal />
    </AuthModalContext.Provider>
  )
}

export function useAuthModal() {
  const context = useContext(AuthModalContext)
  if (!context) {
    throw new Error('useAuthModal must be used within AuthModalProvider')
  }
  return context
}
