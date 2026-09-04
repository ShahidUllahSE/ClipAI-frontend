import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { Button } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { PLANS, ROUTES } from '@/constants'
import { PLAN_EDIT_QUOTA, type PlanId } from '@/types/app'

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(0.55rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const PLAN_RANK: Record<PlanId, number> = {
  basic: 0,
  standard: 1,
  pro: 2,
  unlimited: 3,
}

const FAQS = [
  {
    q: 'When is a token used?',
    a: 'Only after a render finishes successfully. Failed jobs never take a token, and you can retry them.',
  },
  {
    q: 'Is payment live yet?',
    a: 'Not yet. This page is the real subscription flow — choose, confirm, and your workspace updates instantly. Checkout can drop into the confirm step later.',
  },
  {
    q: 'What happens if I cancel?',
    a: 'Your account stays. New edits pause until you pick a plan again. Existing downloads remain in your library.',
  },
] as const

const Page = styled.div`
  animation: ${fadeUp} 0.4s ease both;
`

const Hero = styled.section`
  display: grid;
  gap: 1.25rem;
  padding: 1.45rem 1.4rem 1.5rem;
  margin-bottom: 1.4rem;
  border-radius: 1.25rem;
  color: ${({ theme }) => theme.colors.white};
  background:
    radial-gradient(circle at 92% 8%, rgba(167, 139, 250, 0.42), transparent 38%),
    radial-gradient(circle at 8% 92%, rgba(124, 58, 237, 0.28), transparent 42%),
    linear-gradient(145deg, #221e55 0%, #16132f 55%, #100e1c 100%);
  border: 1px solid rgba(196, 181, 253, 0.22);
  box-shadow: 0 18px 44px rgba(30, 27, 75, 0.18);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1.4fr 0.9fr;
    align-items: stretch;
    padding: 1.65rem 1.7rem;
  }
`

const Eyebrow = styled.p`
  margin: 0 0 0.45rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #d8c9ff;
`

const Title = styled.h1`
  margin: 0 0 0.55rem;
  font-size: clamp(1.55rem, 3vw, 2.15rem);
  letter-spacing: -0.04em;
  line-height: 1.12;
  color: ${({ theme }) => theme.colors.white};
`

const Lead = styled.p`
  margin: 0;
  max-width: 36rem;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.92rem;
  line-height: 1.6;
`

const Sandbox = styled.p`
  display: inline-flex;
  margin: 1rem 0 0;
  padding: 0.38rem 0.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  font-size: 0.72rem;
  font-weight: 650;
  color: #f3eeff;
`

const HeroCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.15rem 1.2rem;
  border-radius: 1.05rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
`

const HeroLabel = styled.p`
  margin: 0;
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.62);
`

const HeroValue = styled.p`
  margin: 0.4rem 0 0.85rem;
  font-size: 1.45rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.white};
`

const CreditBar = styled.div`
  height: 0.48rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  overflow: hidden;
  margin-bottom: 0.55rem;
`

const CreditFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => `${Math.min(100, Math.max(0, $pct))}%`};
  border-radius: inherit;
  background: linear-gradient(90deg, #c4b5fd, #7c3aed);
`

const HeroMeta = styled.p`
  margin: 0;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.68);
`

const SectionHead = styled.div`
  margin: 0.15rem 0 1.05rem;
`

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  letter-spacing: -0.03em;
`

const SectionLead = styled.p`
  margin: 0.35rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.86rem;
`

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  align-items: stretch;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Card = styled.article<{ $active?: boolean; $featured?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 1.2rem 1.15rem 1.1rem;
  border-radius: 1.15rem;
  border: 1px solid
    ${({ theme, $active, $featured }) =>
      $active
        ? theme.colors.primary
        : $featured
          ? 'rgba(124, 58, 237, 0.42)'
          : theme.colors.border};
  background: ${({ theme, $active, $featured }) =>
    $active
      ? `linear-gradient(180deg, ${theme.colors.primarySoft}, ${theme.colors.surface} 55%)`
      : $featured
        ? 'linear-gradient(180deg, #f7f4ff, #ffffff 48%)'
        : theme.colors.surface};
  box-shadow: ${({ theme, $featured, $active }) =>
    $active || $featured ? theme.shadows.md : theme.shadows.sm};
`

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  min-height: 1.7rem;
  margin-bottom: 0.15rem;
`

const Badge = styled.span<{ $tone?: 'active' | 'popular' }>`
  flex-shrink: 0;
  padding: 0.22rem 0.55rem;
  border-radius: 999px;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: ${({ theme, $tone }) =>
    $tone === 'active' ? theme.colors.primary : theme.colors.primarySoft};
  color: ${({ theme, $tone }) =>
    $tone === 'active' ? theme.colors.white : theme.colors.primary};
`

const PlanName = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  letter-spacing: -0.02em;
`

const Price = styled.p`
  margin: 0.7rem 0 0;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  color: ${({ theme }) => theme.colors.ink};
`

const PriceNote = styled.p`
  margin: 0.3rem 0 0.7rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
`

const IncludeLine = styled.p`
  margin: 0 0 0.7rem;
  font-size: 0.88rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1.4;
`

const Description = styled.p`
  margin: 0 0 0.7rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.45;
  min-height: 2.45rem;
`

const Perks = styled.ul`
  list-style: none;
  margin: 0 0 1rem;
  padding: 0.7rem 0 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  gap: 0.42rem;
  flex: 1;
`

const Perk = styled.li`
  position: relative;
  padding-left: 1.15rem;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.ink};
  line-height: 1.4;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    top: 0;
    font-size: 0.72rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
  }
`

const Banner = styled.p<{ $tone: 'ok' | 'bad' }>`
  margin: 0 0 1rem;
  padding: 0.75rem 0.95rem;
  border-radius: 0.8rem;
  font-size: 0.86rem;
  line-height: 1.45;
  background: ${({ $tone }) =>
    $tone === 'ok' ? 'rgba(22, 163, 74, 0.1)' : 'rgba(220, 38, 38, 0.08)'};
  color: ${({ theme, $tone }) =>
    $tone === 'ok' ? theme.colors.success : theme.colors.error};
`

const Warn = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 0.9rem;
  border: 1px solid rgba(220, 38, 38, 0.18);
  background: rgba(220, 38, 38, 0.06);
`

const WarnCopy = styled.p`
  margin: 0;
  font-size: 0.86rem;
  color: ${({ theme }) => theme.colors.ink};
  line-height: 1.45;

  strong {
    font-weight: 750;
  }
`

const Steps = styled.div`
  display: grid;
  gap: 0.75rem;
  margin: 1.65rem 0 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Step = styled.article`
  padding: 0.9rem 1rem;
  border-radius: 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`

const StepNo = styled.p`
  margin: 0 0 0.35rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`

const StepTitle = styled.h3`
  margin: 0 0 0.25rem;
  font-size: 0.92rem;
`

const StepText = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.45;
`

const Faq = styled.div`
  display: grid;
  gap: 0.55rem;
  margin-top: 0.35rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const FaqItem = styled.article`
  padding: 0.9rem 1rem;
  border-radius: 0.9rem;
  background: ${({ theme }) => theme.colors.elevated};
`

const FaqQ = styled.h3`
  margin: 0 0 0.3rem;
  font-size: 0.84rem;
`

const FaqA = styled.p`
  margin: 0;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.45;
`

const Foot = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1.25rem;
  padding-top: 0.9rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(18, 16, 31, 0.48);
  backdrop-filter: blur(4px);
`

const Dialog = styled.div`
  width: min(28.5rem, 100%);
  padding: 1.25rem 1.2rem 1.15rem;
  border-radius: 1.1rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`

const DialogEyebrow = styled.p`
  margin: 0 0 0.3rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`

const DialogTitle = styled.h3`
  margin: 0 0 0.45rem;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
`

const DialogText = styled.p`
  margin: 0 0 1rem;
  font-size: 0.86rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
`

const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0.5rem;
`

function planById(id: PlanId) {
  return PLANS.find((plan) => plan.id === id)
}

function changeKind(from: PlanId, to: PlanId) {
  if (PLAN_RANK[to] > PLAN_RANK[from]) return 'upgrade' as const
  if (PLAN_RANK[to] < PLAN_RANK[from]) return 'downgrade' as const
  return 'same' as const
}

function quotaLabel(planId: PlanId) {
  return planId === 'unlimited'
    ? 'unlimited tokens'
    : `${PLAN_EDIT_QUOTA[planId]} tokens`
}

export function SubscriptionPage() {
  const { user, setPlan, cancelSubscription } = useAuth()
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)
  const [pendingPlan, setPendingPlan] = useState<PlanId | null>(null)
  const [pendingCancel, setPendingCancel] = useState(false)

  const currentId = user?.planId ?? 'basic'
  const current = planById(currentId)
  const canceled = user?.billingStatus === 'canceled'
  const quota = PLAN_EDIT_QUOTA[currentId]
  const remaining = user?.remainingEdits ?? 0
  const creditPct =
    currentId === 'unlimited' ? 100 : quota > 0 ? (remaining / quota) * 100 : 0

  const confirmPlan = async () => {
    if (!pendingPlan) return
    setBusy(true)
    setError('')
    setMsg('')
    try {
      const next = planById(pendingPlan)
      await setPlan(pendingPlan)
      setMsg(
        canceled
          ? `${next?.name ?? 'Plan'} is on. Renders are unlocked again in this workspace.`
          : `You're on ${next?.name ?? 'the new plan'}. Tokens refreshed to ${quotaLabel(pendingPlan)}.`,
      )
      setPendingPlan(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not change plan.')
    } finally {
      setBusy(false)
    }
  }

  const confirmCancel = async () => {
    setBusy(true)
    setError('')
    setMsg('')
    try {
      await cancelSubscription()
      setMsg('Subscription paused. Pick a plan anytime to start rendering again.')
      setPendingCancel(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cancel failed.')
    } finally {
      setBusy(false)
    }
  }

  const pending = pendingPlan ? planById(pendingPlan) : null
  const kind = pendingPlan ? changeKind(currentId, pendingPlan) : 'same'

  return (
    <Page>
      <Hero>
        <div>
          <Eyebrow>Billing</Eyebrow>
          <Title>Choose the plan that matches your posting pace</Title>
          <Lead>
            One successful render uses one token. Failed jobs never count.
            Switch plans anytime — checkout can plug into this same confirm
            step later.
          </Lead>
          <Sandbox>No payment account yet · workspace updates instantly</Sandbox>
        </div>
        <HeroCard>
          <HeroLabel>
            {canceled ? 'Plan paused' : `Current plan · billing ${user?.billingStatus ?? 'active'}`}
          </HeroLabel>
          <HeroValue>
            {current?.name ?? '—'} ·{' '}
            {currentId === 'unlimited'
              ? 'Unlimited tokens'
              : `${remaining} tokens left`}
          </HeroValue>
          <CreditBar>
            <CreditFill $pct={canceled ? 0 : creditPct} />
          </CreditBar>
          <HeroMeta>
            {canceled
              ? 'New renders are paused until you reactivate a plan.'
              : currentId === 'unlimited'
                ? 'Fair-use unlimited tokens · failed jobs never count'
                : `${remaining} of ${quota} tokens this cycle · failed jobs never count`}
          </HeroMeta>
        </HeroCard>
      </Hero>

      {error && <Banner $tone="bad">{error}</Banner>}
      {msg && <Banner $tone="ok">{msg}</Banner>}

      {canceled && (
        <Warn>
          <WarnCopy>
            <strong>Subscription canceled.</strong> Your library stays. Choose a
            plan below to turn rendering back on.
          </WarnCopy>
          <Button as={Link} to={ROUTES.dashboard} $variant="secondary" $size="sm">
            Back to dashboard
          </Button>
        </Warn>
      )}

      <SectionHead>
        <SectionTitle>Plans</SectionTitle>
        <SectionLead>
          Pick a tier, confirm, and your tokens update in this workspace.
        </SectionLead>
      </SectionHead>

      <Grid>
        {PLANS.map((plan) => {
          const active = !canceled && user?.planId === plan.id
          const featured = 'featured' in plan && Boolean(plan.featured)
          const kindForCard = changeKind(currentId, plan.id)
          const label = canceled
            ? `Reactivate ${plan.name}`
            : active
              ? 'Current plan'
              : kindForCard === 'upgrade'
                ? `Upgrade to ${plan.name}`
                : `Switch to ${plan.name}`

          return (
            <Card key={plan.id} $active={active} $featured={featured && !active}>
              <CardTop>
                <PlanName>{plan.name}</PlanName>
                {active ? (
                  <Badge $tone="active">Active</Badge>
                ) : featured ? (
                  <Badge $tone="popular">Most chosen</Badge>
                ) : null}
              </CardTop>
              <Price>${plan.price}</Price>
              <PriceNote>Billed monthly</PriceNote>
              <IncludeLine>
                {plan.id === 'unlimited'
                  ? 'Unlimited tokens each month'
                  : `Includes ${PLAN_EDIT_QUOTA[plan.id]} tokens each month`}
              </IncludeLine>
              <Description>{plan.description}</Description>
              <Perks>
                {plan.perks.map((perk) => (
                  <Perk key={perk}>{perk}</Perk>
                ))}
              </Perks>
              <Button
                type="button"
                disabled={busy || active}
                $variant={active ? 'secondary' : 'primary'}
                onClick={() => {
                  setError('')
                  setPendingPlan(plan.id)
                }}
              >
                {label}
              </Button>
            </Card>
          )
        })}
      </Grid>

      <Steps>
        <Step>
          <StepNo>Step 1</StepNo>
          <StepTitle>Pick a plan</StepTitle>
          <StepText>
            Start on Basic and move up when you post more. Every plan includes
            talking-head, rapid-cut, and ASMR.
          </StepText>
        </Step>
        <Step>
          <StepNo>Step 2</StepNo>
          <StepTitle>Confirm the change</StepTitle>
          <StepText>
            You review tokens and the new tier before anything applies. Later,
            this is where checkout will live.
          </StepText>
        </Step>
        <Step>
          <StepNo>Step 3</StepNo>
          <StepTitle>Render with tokens</StepTitle>
          <StepText>
            Successful exports use one token. Failures are free to retry, so
            experiments stay cheap.
          </StepText>
        </Step>
      </Steps>

      <SectionHead style={{ marginTop: '1.25rem' }}>
        <SectionTitle>Good to know</SectionTitle>
      </SectionHead>
      <Faq>
        {FAQS.map((item) => (
          <FaqItem key={item.q}>
            <FaqQ>{item.q}</FaqQ>
            <FaqA>{item.a}</FaqA>
          </FaqItem>
        ))}
      </Faq>

      <Foot>
        <Button
          type="button"
          $variant="ghost"
          disabled={busy || canceled}
          onClick={() => setPendingCancel(true)}
        >
          Cancel subscription
        </Button>
        <Button as={Link} to={ROUTES.newProject} $variant="secondary">
          Start an edit
        </Button>
      </Foot>

      {pending && pendingPlan && (
        <Overlay role="dialog" aria-modal="true" aria-labelledby="plan-dialog-title">
          <Dialog>
            <DialogEyebrow>
              {canceled ? 'Reactivate' : kind === 'upgrade' ? 'Upgrade' : 'Plan change'}
            </DialogEyebrow>
            <DialogTitle id="plan-dialog-title">
              {canceled
                ? `Turn ${pending.name} back on?`
                : kind === 'upgrade'
                  ? `Upgrade to ${pending.name}?`
                  : `Switch to ${pending.name}?`}
            </DialogTitle>
            <DialogText>
              {canceled
                ? `Rendering unlocks again on ${pending.name} with ${quotaLabel(pendingPlan)}. No payment is taken yet.`
                : `Your workspace moves to ${pending.name} and tokens refresh to ${quotaLabel(pendingPlan)}. Payment can be added to this confirm step later — nothing is charged now.`}
            </DialogText>
            <DialogActions>
              <Button
                type="button"
                $variant="secondary"
                disabled={busy}
                onClick={() => setPendingPlan(null)}
              >
                Not now
              </Button>
              <Button type="button" disabled={busy} onClick={() => void confirmPlan()}>
                {busy ? 'Updating…' : 'Confirm plan'}
              </Button>
            </DialogActions>
          </Dialog>
        </Overlay>
      )}

      {pendingCancel && (
        <Overlay role="dialog" aria-modal="true" aria-labelledby="cancel-dialog-title">
          <Dialog>
            <DialogEyebrow>Cancel</DialogEyebrow>
            <DialogTitle id="cancel-dialog-title">Pause this subscription?</DialogTitle>
            <DialogText>
              Your projects and downloads stay. New AI renders pause until you
              pick a plan again. You can reactivate from this page anytime.
            </DialogText>
            <DialogActions>
              <Button
                type="button"
                $variant="secondary"
                disabled={busy}
                onClick={() => setPendingCancel(false)}
              >
                Keep plan
              </Button>
              <Button type="button" disabled={busy} onClick={() => void confirmCancel()}>
                {busy ? 'Canceling…' : 'Yes, cancel'}
              </Button>
            </DialogActions>
          </Dialog>
        </Overlay>
      )}
    </Page>
  )
}
