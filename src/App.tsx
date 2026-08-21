import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminProtectedRoute } from '@/components/layout/AdminProtectedRoute'
import { AdminShell } from '@/components/layout/AdminShell'
import { AppLayout } from '@/components/layout/AppLayout'
import { AppShell } from '@/components/layout/AppShell'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import { AuthProvider } from '@/context/AuthContext'
import { AuthModalProvider } from '@/features/auth'
import {
  AboutPage,
  FeaturesPage,
  ForgotPasswordPage,
  HomePage,
  HowItWorksPage,
  ModesPage,
  OpenAuthPage,
  PricingPage,
  ResetPasswordPage,
  ServicesPage,
  VerifyEmailPage,
} from '@/pages'
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'
import { AdminUserDetailPage } from '@/pages/admin/AdminUserDetailPage'
import { AdminUsersPage } from '@/pages/admin/AdminUsersPage'
import { AccountPage } from '@/pages/app/AccountPage'
import { DashboardPage } from '@/pages/app/DashboardPage'
import { NewProjectPage } from '@/pages/app/NewProjectPage'
import { ProjectDetailPage } from '@/pages/app/ProjectDetailPage'
import { SubscriptionPage } from '@/pages/app/SubscriptionPage'
import { ROUTES } from '@/constants'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthModalProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="features" element={<FeaturesPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="modes" element={<ModesPage />} />
              <Route path="how" element={<HowItWorksPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />
              <Route path="verify-email" element={<VerifyEmailPage />} />
              <Route path="login" element={<OpenAuthPage mode="login" />} />
              <Route path="register" element={<OpenAuthPage mode="register" />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="app" element={<AppShell />}>
                <Route index element={<DashboardPage />} />
                <Route path="projects/new" element={<NewProjectPage />} />
                <Route path="projects/:id" element={<ProjectDetailPage />} />
                <Route path="account" element={<AccountPage />} />
                <Route path="subscription" element={<SubscriptionPage />} />
              </Route>
            </Route>

            <Route element={<AdminProtectedRoute />}>
              <Route path="admin" element={<AdminShell />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="users/:id" element={<AdminUserDetailPage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
          </Routes>
        </AuthModalProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
