import styled from 'styled-components'
import { Link } from 'react-router-dom'
import heroBanner from '@/assets/landing/hero-banner.jpg'
import { Button, Container } from '@/components/ui'
import { useAuthModal } from '@/features/auth'
import {
  APP_NAME,
  PLANS,
  PRICING_FAQS,
  ROUTES,
} from '@/constants'

const Page = styled.div`
  padding: 5.75rem 0 ${({ theme }) => theme.space['4xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-top: 7rem;
  }
  background:
    radial-gradient(
      ellipse 80% 45% at 100% 0%,
      ${({ theme }) => theme.colors.primarySoft} 0%,
      transparent 55%
    ),
    radial-gradient(
      ellipse 50% 40% at 0% 30%,
      rgba(124, 58, 237, 0.06) 0%,
      transparent 50%
    ),
    ${({ theme }) => theme.colors.background};
`

const Hero = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space['2xl']};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space['3xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
    gap: ${({ theme }) => theme.space['3xl']};
  }
`

const HeroCopy = styled.div`
  max-width: 34rem;
`

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Title = styled.h1`
  font-size: clamp(2.2rem, 4vw, 3.25rem);
  letter-spacing: -0.035em;
  line-height: 1.08;
  margin-bottom: ${({ theme }) => theme.space.md};
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.space.xl};
`

const HeroNote = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

const HeroMedia = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  aspect-ratio: 16 / 11;
  min-height: 15rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 68% center;
    display: block;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      125deg,
      rgba(30, 27, 75, 0.35) 0%,
      transparent 55%
    );
    pointer-events: none;
  }
`

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};
  margin-bottom: ${({ theme }) => theme.space['3xl']};
  align-items: stretch;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Card = styled.article<{ $featured?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid
    ${({ theme, $featured }) =>
      $featured ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $featured }) =>
    $featured ? theme.colors.navy : theme.colors.surface};
  color: ${({ theme, $featured }) =>
    $featured ? theme.colors.white : theme.colors.ink};
  box-shadow: ${({ theme, $featured }) =>
    $featured ? theme.shadows.lg : theme.shadows.sm};
  transition:
    transform ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`

const Badge = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.space.md};
  right: ${({ theme }) => theme.space.md};
  padding: 0.3rem 0.65rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`

const PlanName = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.md};
  color: inherit;
  padding-right: 4rem;
`

const Price = styled.p<{ $featured?: boolean }>`
  font-size: clamp(2.25rem, 4vw, 2.75rem);
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: inherit;

  span {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme, $featured }) =>
      $featured ? theme.colors.textOnDarkMuted : theme.colors.textMuted};
    margin-left: 0.2rem;
  }
`

const Edits = styled.p<{ $featured?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme, $featured }) =>
    $featured ? theme.colors.primaryMuted : theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.space.md};
`

const Description = styled.p<{ $featured?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.space.lg};
  color: ${({ theme, $featured }) =>
    $featured ? theme.colors.textOnDarkMuted : theme.colors.textMuted};
`

const Perks = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.xl};
  flex: 1;
`

const Perk = styled.li<{ $featured?: boolean }>`
  position: relative;
  padding-left: 1.15rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.45;
  color: ${({ theme, $featured }) =>
    $featured ? 'rgba(255,255,255,0.9)' : theme.colors.ink};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5em;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background: ${({ theme, $featured }) =>
      $featured ? theme.colors.primaryMuted : theme.colors.primary};
  }
`

const PlanButton = styled(Button)<{ $featured?: boolean }>`
  width: 100%;

  ${({ theme, $featured }) =>
    $featured
      ? `
    background: ${theme.colors.white};
    color: ${theme.colors.navy};
    border-color: ${theme.colors.white};

    &:hover {
      background: ${theme.colors.elevated};
      border-color: ${theme.colors.elevated};
    }
  `
      : ''}
`

const Trust = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space['3xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const TrustCard = styled.div`
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`

const TrustTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const TrustText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
`

const FaqBlock = styled.section`
  margin-bottom: ${({ theme }) => theme.space['3xl']};
`

const FaqHead = styled.div`
  max-width: 32rem;
  margin-bottom: ${({ theme }) => theme.space['2xl']};
`

const FaqTitle = styled.h2`
  font-size: clamp(1.6rem, 3vw, 2.15rem);
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const FaqLead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`

const FaqList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const FaqItem = styled.article`
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.elevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const FaqQ = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const FaqA = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
`

const CtaBand = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
  padding: ${({ theme }) => theme.space['2xl']};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.white};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const CtaCopy = styled.div`
  max-width: 32rem;
`

const CtaTitle = styled.h2`
  font-size: clamp(1.5rem, 2.5vw, 1.9rem);
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const CtaText = styled.p`
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  line-height: 1.55;
`

const CtaActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
`

const LightButton = styled(Button)`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.navy};
  border-color: ${({ theme }) => theme.colors.white};

  &:hover {
    background: ${({ theme }) => theme.colors.elevated};
    border-color: ${({ theme }) => theme.colors.elevated};
  }
`

const GhostButton = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  border-color: rgba(255, 255, 255, 0.35);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.6);
  }
`

export function PricingPage() {
  const { openAuth } = useAuthModal()

  return (
    <Page>
      <Container>
        <Hero>
          <HeroCopy>
            <Eyebrow>Pricing</Eyebrow>
            <Title>Simple plans for social-ready AI edits</Title>
            <Lead>
              Monthly packs built around successful renders — not failed
              attempts. Start small and scale as your channel grows.
            </Lead>
            <HeroNote>
              Stripe billing · Upgrade or cancel anytime · Fair edit credits
            </HeroNote>
          </HeroCopy>
          <HeroMedia>
            <img
              src={heroBanner}
              alt="ClipAI editor workspace used for social video exports"
            />
          </HeroMedia>
        </Hero>

        <Grid>
          {PLANS.map((plan) => {
            const featured = 'featured' in plan && Boolean(plan.featured)
            return (
              <Card key={plan.id} $featured={featured}>
                {featured && <Badge>Most popular</Badge>}
                <PlanName>{plan.name}</PlanName>
                <Price $featured={featured}>
                  ${plan.price}
                  <span>/mo</span>
                </Price>
                <Edits $featured={featured}>{plan.edits}</Edits>
                <Description $featured={featured}>{plan.description}</Description>
                <Perks>
                  {plan.perks.map((perk) => (
                    <Perk key={perk} $featured={featured}>
                      {perk}
                    </Perk>
                  ))}
                </Perks>
                <PlanButton
                  type="button"
                  $featured={featured}
                  $variant={featured ? 'primary' : 'secondary'}
                  onClick={() => openAuth('register')}
                >
                  {featured ? 'Start with Standard' : `Choose ${plan.name}`}
                </PlanButton>
              </Card>
            )
          })}
        </Grid>

        <Trust>
          <TrustCard>
            <TrustTitle>Pay for success</TrustTitle>
            <TrustText>
              A credit is used only after a successful render. Failed jobs never
              reduce your balance.
            </TrustText>
          </TrustCard>
          <TrustCard>
            <TrustTitle>All modes included</TrustTitle>
            <TrustText>
              Talking-head, rapid-cut, and ASMR — plus captions, ratios, and
              export options on every plan.
            </TrustText>
          </TrustCard>
          <TrustCard>
            <TrustTitle>Stripe checkout</TrustTitle>
            <TrustText>
              Secure subscription billing with upgrade, downgrade, and cancel
              anytime.
            </TrustText>
          </TrustCard>
        </Trust>

        <FaqBlock>
          <FaqHead>
            <FaqTitle>Pricing questions</FaqTitle>
            <FaqLead>
              Quick answers before you pick a plan for {APP_NAME}.
            </FaqLead>
          </FaqHead>
          <FaqList>
            {PRICING_FAQS.map((item) => (
              <FaqItem key={item.q}>
                <FaqQ>{item.q}</FaqQ>
                <FaqA>{item.a}</FaqA>
              </FaqItem>
            ))}
          </FaqList>
        </FaqBlock>

        <CtaBand>
          <CtaCopy>
            <CtaTitle>Ready to export with AI?</CtaTitle>
            <CtaText>
              Create an account, choose a plan, and turn your next raw clip into
              a social-ready MP4.
            </CtaText>
          </CtaCopy>
          <CtaActions>
            <LightButton type="button" onClick={() => openAuth('register')}>
              Get started free
            </LightButton>
            <GhostButton as={Link} to={ROUTES.how} $variant="secondary">
              How it works
            </GhostButton>
          </CtaActions>
        </CtaBand>
      </Container>
    </Page>
  )
}
