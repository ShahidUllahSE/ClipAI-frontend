import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { authApi } from '@/api'
import { Container } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { ROUTES } from '@/constants'

const Page = styled.div`
  padding: 5.75rem 0 ${({ theme }) => theme.space['4xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-top: 7rem;
  }
`

const Card = styled.div`
  max-width: 26rem;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.space.md};
`

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.space.lg};
`

const Ok = styled.p`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`

const Err = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`

const Cta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

export function VerifyEmailPage() {
  const [params] = useSearchParams()
  const { refreshUser, user } = useAuth()
  const [status, setStatus] = useState<'pending' | 'ok' | 'error'>('pending')
  const [message, setMessage] = useState('Verifying your email…')

  useEffect(() => {
    const token = params.get('token')
    if (!token) {
      setStatus('error')
      setMessage('This verification link is missing a token.')
      return
    }
    let mounted = true
    authApi
      .verifyEmail(token)
      .then(async () => {
        await refreshUser()
        if (!mounted) return
        setStatus('ok')
        setMessage('Email verified. You can keep using ClipAI.')
      })
      .catch((err: unknown) => {
        if (!mounted) return
        setStatus('error')
        setMessage(err instanceof Error ? err.message : 'Verification failed.')
      })
    return () => {
      mounted = false
    }
  }, [params, refreshUser])

  return (
    <Page>
      <Container>
        <Card>
          <Title>Email verification</Title>
          {status === 'ok' && <Ok>{message}</Ok>}
          {status === 'error' && <Err>{message}</Err>}
          {status === 'pending' && <Text>{message}</Text>}
          <Cta to={user ? ROUTES.dashboard : ROUTES.login}>
            {user ? 'Go to dashboard' : 'Sign in'}
          </Cta>
        </Card>
      </Container>
    </Page>
  )
}
