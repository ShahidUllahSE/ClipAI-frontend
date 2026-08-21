import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { ROUTES } from '@/constants'

export function AdminProtectedRoute() {
  const { user, loading, isAdmin } = useAuth()
  const location = useLocation()

  if (loading) return null

  if (!user) {
    return (
      <Navigate to={ROUTES.home} replace state={{ from: location.pathname }} />
    )
  }

  if (!isAdmin) {
    return <Navigate to={ROUTES.dashboard} replace />
  }

  return <Outlet />
}
