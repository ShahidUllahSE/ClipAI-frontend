import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Container } from '@/components/ui'
import { PLANS, ROUTES } from '@/constants'

/** Compact homepage teaser — full comparison lives on /pricing */
const Section = styled.section`
  padding: ${({ theme }) => `${theme.space['3xl']} 0`};
  background: ${({ theme }) => theme.colors.surface};
  border-block: 1px solid ${({ theme }) => theme.colors.border};
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  margin-bottom: ${({ theme }) => theme.space['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
`

const Copy = styled.div`
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

const Title = styled.h2`
  font-size: clamp(1.85rem, 3.5vw, 2.5rem);
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
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

const Plan = styled.article<{ $featured?: boolean }>`
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid
    ${({ theme, $featured }) =>
      $featured ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $featured }) =>
    $featured ? theme.colors.primarySoft : theme.colors.background};
`

const PlanName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Price = styled.p`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  letter-spacing: -0.03em;
  margin-bottom: ${({ theme }) => theme.space.xs};

  span {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const Edits = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`

export function Pricing() {
  return (
    <Section id="pricing">
      <Container>
        <Header>
          <Copy>
            <Eyebrow>Pricing</Eyebrow>
            <Title>Plans that scale with your output</Title>
            <Lead>
              Monthly edit packs. Credits only for successful renders — see full
              details on the pricing page.
            </Lead>
          </Copy>
          <Button as={Link} to={ROUTES.pricing} $variant="secondary">
            Compare plans
          </Button>
        </Header>
        <Grid>
          {PLANS.map((plan) => {
            const featured = 'featured' in plan && Boolean(plan.featured)
            return (
              <Plan key={plan.id} $featured={featured}>
                <PlanName>{plan.name}</PlanName>
                <Price>
                  ${plan.price}
                  <span>/mo</span>
                </Price>
                <Edits>{plan.edits}</Edits>
              </Plan>
            )
          })}
        </Grid>
      </Container>
    </Section>
  )
}
