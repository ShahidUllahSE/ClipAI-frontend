import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { Button } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { APP_NAME, ROUTES } from '@/constants'
import { useAuthModal } from './AuthModalContext'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(0.75rem) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.space.lg};
  background: rgba(30, 27, 75, 0.55);
  backdrop-filter: blur(6px);
  animation: ${fadeIn} 0.2s ease both;
`

const Dialog = styled.div`
  position: relative;
  width: min(100%, 26rem);
  max-height: min(90svh, 40rem);
  overflow: auto;
  padding: ${({ theme }) => theme.space['2xl']};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${riseIn} 0.28s ${({ theme }) => theme.transitions.slow} both;
`

const Close = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.space.md};
  right: ${({ theme }) => theme.space.md};
  width: 2.25rem;
  height: 2.25rem;
  display: grid;
  place-items: center;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.elevated};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.space.sm};
  padding-right: 2rem;
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.space.xl};
`

const Form = styled.form`
  display: grid;
`

const Field = styled.label`
  display: grid;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`

const Input = styled.input`
  padding: 0.85rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.ink};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primaryMuted};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Submit = styled(Button)`
  width: 100%;
  margin-top: ${({ theme }) => theme.space.sm};
`

const Footer = styled.div`
  margin-top: ${({ theme }) => theme.space.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  display: grid;
  gap: ${({ theme }) => theme.space.sm};
`

const Forgot = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`

const ErrorMsg = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`

const Switch = styled.button`
  border: none;
  background: none;
  padding: 0;
  color: ${({ theme }) => theme.colors.primary};
  font: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export function AuthModal() {
  const { mode, isOpen, closeAuth, switchMode } = useAuthModal()
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAuth()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    setError('')

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, closeAuth])

  if (!isOpen || !mode) return null

  const isLogin = mode === 'login'

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') ?? '')
    const password = String(data.get('password') ?? '')
    const name = String(data.get('name') ?? '')
    try {
      if (isLogin) {
        const next = await login(email, password)
        closeAuth()
        navigate(next.role === 'admin' ? ROUTES.admin : ROUTES.dashboard)
      } else {
        await register(name, email, password)
        closeAuth()
        navigate(ROUTES.dashboard)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Overlay
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeAuth()
      }}
    >
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <Close type="button" aria-label="Close" onClick={closeAuth}>
          ×
        </Close>
        <Title id="auth-modal-title">
          {isLogin ? `Sign in to ${APP_NAME}` : 'Create your account'}
        </Title>
        <Lead>
          {isLogin
            ? 'Access your projects, remaining edits, and exports.'
            : 'Start uploading and editing social-ready video.'}
        </Lead>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Form onSubmit={(e) => void onSubmit(e)}>
          {!isLogin && (
            <Field>
              Name
              <Input type="text" name="name" placeholder="Your name" required />
            </Field>
          )}
          <Field>
            Email
            <Input
              type="email"
              name="email"
              placeholder="you@email.com"
              required
              autoComplete="email"
            />
          </Field>
          <Field>
            Password
            <Input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              minLength={6}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </Field>
          <Submit type="submit" disabled={busy}>
            {busy ? 'Please wait…' : isLogin ? 'Sign in' : 'Create account'}
          </Submit>
        </Form>
        <Footer>
          {isLogin ? (
            <>
              <div>
                New here?{' '}
                <Switch type="button" onClick={() => switchMode('register')}>
                  Create an account
                </Switch>
              </div>
              <Forgot to={ROUTES.forgotPassword} onClick={closeAuth}>
                Forgot password?
              </Forgot>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Switch type="button" onClick={() => switchMode('login')}>
                Sign in
              </Switch>
            </>
          )}
        </Footer>
      </Dialog>
    </Overlay>
  )
}
