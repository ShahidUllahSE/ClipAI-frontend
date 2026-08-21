import { useMemo, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { authApi } from '@/api'
import { Button, Container, ErrorText, Field, Input } from '@/components/ui'
import { ROUTES } from '@/constants'

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

export function ResetPasswordPage() {
  const [params] = useSearchParams()
  const token = useMemo(() => params.get('token') ?? '', [params])
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await authApi.resetPassword(token, password)
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reset failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Page>
      <Container>
        <Card onSubmit={(e) => void onSubmit(e)}>
          <Title>Choose a new password</Title>
          <Lead>Enter a new password for your ClipAI account.</Lead>
          {error && <ErrorText>{error}</ErrorText>}
          {done ? (
            <>
              <Ok>Password updated. You can sign in now.</Ok>
              <Back to={ROUTES.login}>Sign in</Back>
            </>
          ) : (
            <>
              {!token && <ErrorText>This reset link is missing a token.</ErrorText>}
              <Field>
                New password
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={!token}
                />
              </Field>
              <Button
                type="submit"
                disabled={busy || !token}
                style={{ width: '100%', marginTop: '1rem' }}
              >
                {busy ? 'Saving…' : 'Update password'}
              </Button>
              <Back to={ROUTES.forgotPassword}>Request a new link</Back>
            </>
          )}
        </Card>
      </Container>
    </Page>
  )
}
