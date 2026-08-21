import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { ProjectsProvider } from '@/context/ProjectsContext'
import { ROUTES } from '@/constants'

export function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return null
  }

  if (!user) {
    return (
      <Navigate to={ROUTES.home} replace state={{ from: location.pathname }} />
    )
  }

  return (
    <ProjectsProvider>
      <Outlet />
    </ProjectsProvider>
  )
}
