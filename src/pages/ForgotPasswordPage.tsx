import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { authApi } from '@/api'
import { Button, Container, ErrorText, Field, HelpText, Input } from '@/components/ui'
import { APP_NAME, ROUTES } from '@/constants'

const Page = styled.div`
  padding: 5.75rem 0 ${({ theme }) => theme.space['4xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-top: 7rem;
  }
`

const Card = styled.form`
  max-width: 26rem;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.space.xl};
`

const Ok = styled.p`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`

const Back = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.space.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await authApi.requestPasswordReset(email)
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Page>
      <Container>
        <Card onSubmit={(e) => void onSubmit(e)}>
          <Title>Reset password</Title>
          <Lead>
            Enter your {APP_NAME} email. We&apos;ll send a reset link if that
            account exists.
          </Lead>
          {error && <ErrorText>{error}</ErrorText>}
          {done && (
            <Ok>
              If an account exists for that email, a reset link has been sent.
              Check your inbox (and spam folder).
            </Ok>
          )}
          <Field>
            Email
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={done}
            />
          </Field>
          <HelpText>The email includes a secure link to set a new password.</HelpText>
          <Button
            type="submit"
            disabled={busy || done}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {busy ? 'Sending…' : 'Send reset link'}
          </Button>
          <Back to={ROUTES.home}>Back to home</Back>
        </Card>
      </Container>
    </Page>
  )
}
