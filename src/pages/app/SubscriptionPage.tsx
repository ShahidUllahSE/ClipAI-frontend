import { useState } from 'react'
import styled from 'styled-components'
import { Button, ErrorText, HelpText } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { PLANS } from '@/constants'
import type { PlanId } from '@/types/app'

const Title = styled.h1`
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space['2xl']};
`

const Current = styled.div`
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.space['2xl']};
`

const CurrentTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const CurrentValue = styled.p`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
`

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Card = styled.article<{ $active?: boolean }>`
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primarySoft : theme.colors.surface};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`

const PlanName = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
`

const Price = styled.p`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
`

const Edits = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`

const Ok = styled.p`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`

export function SubscriptionPage() {
  const { user, setPlan, cancelSubscription } = useAuth()
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  const choose = async (planId: PlanId) => {
    setBusy(true)
    setError('')
    setMsg('')
    try {
      await setPlan(planId)
      setMsg(
        'Plan updated. Stripe checkout can replace this later.',
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not change plan.')
    } finally {
      setBusy(false)
    }
  }

  const cancel = async () => {
    if (!confirm('Cancel subscription?')) return
    setBusy(true)
    setError('')
    try {
      await cancelSubscription()
      setMsg('Subscription marked canceled.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cancel failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <Title>Subscription</Title>
      <Lead>
        Current plan, remaining edit credits, and plan changes.
      </Lead>

      {error && <ErrorText>{error}</ErrorText>}
      {msg && <Ok>{msg}</Ok>}

      <Current>
        <CurrentTitle>Current plan · billing {user?.billingStatus}</CurrentTitle>
        <CurrentValue>
          {PLANS.find((p) => p.id === user?.planId)?.name ?? '—'} ·{' '}
          {user?.planId === 'unlimited'
            ? 'Unlimited edits'
            : `${user?.remainingEdits ?? 0} edits left`}
        </CurrentValue>
      </Current>

      <Grid>
        {PLANS.map((plan) => {
          const active = user?.planId === plan.id
          return (
            <Card key={plan.id} $active={active}>
              <PlanName>{plan.name}</PlanName>
              <Price>${plan.price}/mo</Price>
              <Edits>{plan.edits}</Edits>
              <HelpText>{plan.description}</HelpText>
              <Button
                type="button"
                disabled={busy || active}
                $variant={active ? 'secondary' : 'primary'}
                onClick={() => void choose(plan.id)}
                style={{ marginTop: 'auto' }}
              >
                {active ? 'Current plan' : `Switch to ${plan.name}`}
              </Button>
            </Card>
          )
        })}
      </Grid>

      <div style={{ marginTop: '2rem' }}>
        <Button
          type="button"
          $variant="ghost"
          disabled={busy || user?.billingStatus === 'canceled'}
          onClick={() => void cancel()}
        >
          Cancel subscription
        </Button>
      </div>
    </div>
  )
}
