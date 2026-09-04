import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { adminApi } from '@/api/adminApi'
import { Button, ErrorText, Field, HelpText, Input, Skeleton } from '@/components/ui'
import { PLANS, ROUTES } from '@/constants'
import { useAuth } from '@/context/AuthContext'
import type { BillingStatus, PlanId, User, UserRole } from '@/types/app'

const fade = keyframes`
  from { opacity: 0; transform: translateY(0.3rem); }
  to { opacity: 1; transform: translateY(0); }
`

const Page = styled.div`
  animation: ${fade} 0.35s ease both;
`

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Eyebrow = styled.p`
  margin: 0 0 0.2rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`

const Title = styled.h1`
  margin: 0;
  font-size: clamp(1.3rem, 2.4vw, 1.65rem);
  letter-spacing: -0.03em;
`

const Lead = styled.p`
  margin: 0.3rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.84rem;
`

const StatusRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.85rem;
`

const Pill = styled.span<{ $tone?: 'ok' | 'warn' | 'muted' }>`
  display: inline-flex;
  align-items: center;
  padding: 0.22rem 0.55rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  background: ${({ theme, $tone }) =>
    $tone === 'ok'
      ? theme.colors.primarySoft
      : $tone === 'warn'
        ? 'rgba(220, 38, 38, 0.1)'
        : theme.colors.elevated};
  color: ${({ theme, $tone }) =>
    $tone === 'ok'
      ? theme.colors.primary
      : $tone === 'warn'
        ? theme.colors.error
        : theme.colors.textMuted};
`

const Card = styled.form`
  max-width: 40rem;
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`

const Grid = styled.div`
  display: grid;
  gap: 0.75rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`

const Select = styled.select`
  padding: 0.55rem 0.7rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.84rem;
`

const Ok = styled.p`
  margin: 0 0 0.65rem;
  color: ${({ theme }) => theme.colors.success};
  font-size: 0.84rem;
  font-weight: 600;
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.25rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export function AdminUserDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { user: me, refreshUser } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [planId, setPlanId] = useState<PlanId>('basic')
  const [remainingEdits, setRemainingEdits] = useState(0)
  const [billingStatus, setBillingStatus] = useState<BillingStatus>('active')
  const [role, setRole] = useState<UserRole>('user')
  const [isActive, setIsActive] = useState(true)
  const [emailVerified, setEmailVerified] = useState(false)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let mounted = true
    adminApi
      .getUser(id)
      .then((data) => {
        if (!mounted) return
        setUser(data)
        setName(data.name)
        setEmail(data.email)
        setPlanId(data.planId)
        setRemainingEdits(data.remainingEdits)
        setBillingStatus(data.billingStatus)
        setRole(data.role)
        setIsActive(data.isActive)
        setEmailVerified(data.emailVerified)
      })
      .catch((err: unknown) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'User not found.')
        }
      })
    return () => {
      mounted = false
    }
  }, [id])

  const onSave = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    setMsg('')
    try {
      const next = await adminApi.updateUser(id, {
        name,
        email,
        planId,
        remainingEdits,
        billingStatus,
        role,
        isActive,
        emailVerified,
      })
      setUser(next)
      setMsg('User updated.')
      if (me?.id === id) await refreshUser()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed.')
    } finally {
      setBusy(false)
    }
  }

  const onVerify = async () => {
    setBusy(true)
    setError('')
    try {
      const next = await adminApi.verifyUserEmail(id)
      setUser(next)
      setEmailVerified(true)
      setMsg('Email marked verified.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verify failed.')
    } finally {
      setBusy(false)
    }
  }

  const onDelete = async () => {
    if (!confirm('Delete this user permanently?')) return
    setBusy(true)
    setError('')
    try {
      await adminApi.deleteUser(id)
      navigate(ROUTES.adminUsers)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed.')
      setBusy(false)
    }
  }

  if (error && !user) {
    return (
      <div>
        <ErrorText>{error}</ErrorText>
        <Button as={Link} to={ROUTES.adminUsers} $variant="secondary">
          Back to users
        </Button>
      </div>
    )
  }

  if (!user) {
    return (
      <Page>
        <Header>
          <div>
            <Eyebrow>User account</Eyebrow>
            <Skeleton $w="10rem" $h="1.4rem" />
            <Skeleton $w="14rem" $h="0.75rem" $mt="0.45rem" />
          </div>
        </Header>
        <StatusRow>
          <Skeleton $w="4rem" $h="1.4rem" $r="999px" />
          <Skeleton $w="4.2rem" $h="1.4rem" $r="999px" />
          <Skeleton $w="4.8rem" $h="1.4rem" $r="999px" />
        </StatusRow>
        <Skeleton $h="16rem" $r="1rem" />
      </Page>
    )
  }

  return (
    <Page>
      <Header>
        <div>
          <Eyebrow>User account</Eyebrow>
          <Title>{user.name}</Title>
          <Lead>{user.email}</Lead>
        </div>
        <Button as={Link} to={ROUTES.adminUsers} $variant="secondary">
          ← Back
        </Button>
      </Header>

      <StatusRow>
        <Pill $tone={user.role === 'admin' ? 'ok' : 'muted'}>{user.role}</Pill>
        <Pill $tone={user.isActive ? 'ok' : 'warn'}>
          {user.isActive ? 'active' : 'disabled'}
        </Pill>
        <Pill $tone={user.emailVerified ? 'ok' : 'warn'}>
          {user.emailVerified ? 'verified' : 'unverified'}
        </Pill>
        <Pill $tone="muted">{user.planId}</Pill>
      </StatusRow>

      {error && <ErrorText>{error}</ErrorText>}
      {msg && <Ok>{msg}</Ok>}

      <Card onSubmit={(e) => void onSave(e)}>
        <Grid>
          <Field>
            Name
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </Field>
          <Field>
            Email
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          <Field>
            Plan
            <Select
              value={planId}
              onChange={(e) => setPlanId(e.target.value as PlanId)}
            >
              {PLANS.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field>
            Remaining edits
            <Input
              type="number"
              min={0}
              value={remainingEdits}
              onChange={(e) => setRemainingEdits(Number(e.target.value))}
            />
          </Field>
          <Field>
            Billing status
            <Select
              value={billingStatus}
              onChange={(e) => setBillingStatus(e.target.value as BillingStatus)}
            >
              <option value="active">active</option>
              <option value="past_due">past_due</option>
              <option value="canceled">canceled</option>
              <option value="none">none</option>
            </Select>
          </Field>
          <Field>
            Role
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </Select>
          </Field>
          <Field>
            Account status
            <Select
              value={isActive ? 'true' : 'false'}
              onChange={(e) => setIsActive(e.target.value === 'true')}
            >
              <option value="true">active</option>
              <option value="false">disabled</option>
            </Select>
          </Field>
          <Field>
            Email verified
            <Select
              value={emailVerified ? 'true' : 'false'}
              onChange={(e) => setEmailVerified(e.target.value === 'true')}
            >
              <option value="true">yes</option>
              <option value="false">no</option>
            </Select>
          </Field>
        </Grid>
        <HelpText>
          Created {user.createdAt ? new Date(user.createdAt).toLocaleString() : '—'}
        </HelpText>
        <Actions>
          <Button type="submit" disabled={busy}>
            {busy ? 'Saving…' : 'Save changes'}
          </Button>
          <Button
            type="button"
            $variant="secondary"
            disabled={busy || emailVerified}
            onClick={() => void onVerify()}
          >
            Force verify email
          </Button>
          <Button
            type="button"
            $variant="ghost"
            disabled={busy || me?.id === id}
            onClick={() => void onDelete()}
          >
            Delete user
          </Button>
        </Actions>
      </Card>
    </Page>
  )
}
