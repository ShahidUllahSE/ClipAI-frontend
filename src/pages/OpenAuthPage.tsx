import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthModal, type AuthMode } from '@/features/auth'
import { ROUTES } from '@/constants'

interface OpenAuthPageProps {
  mode: AuthMode
}

/** Opens the auth modal, then returns to home (keeps /login & /register links working). */
export function OpenAuthPage({ mode }: OpenAuthPageProps) {
  const { openAuth } = useAuthModal()
  const navigate = useNavigate()

  useEffect(() => {
    openAuth(mode)
    navigate(ROUTES.home, { replace: true })
  }, [mode, openAuth, navigate])

  return null
}
