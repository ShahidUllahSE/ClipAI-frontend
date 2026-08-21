import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button, Container } from '@/components/ui'
import { useAuthModal } from '@/features/auth'
import { ROUTES } from '@/constants'

const Section = styled.section`
  padding: ${({ theme }) => `${theme.space['3xl']} 0`};
  background: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.white};
`

const Row = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
  align-items: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space['2xl']};
  }
`

const Copy = styled.div`
  max-width: 32rem;
`

const Title = styled.h2`
  font-size: clamp(1.75rem, 3vw, 2.35rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: -0.03em;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
  flex-shrink: 0;
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

export function FinalCta() {
  const { openAuth } = useAuthModal()

  return (
    <Section>
      <Row>
        <Copy>
          <Title>Start editing with AI today</Title>
          <Text>
            Create an account, pick a plan, and export your next social-ready
            MP4.
          </Text>
        </Copy>
        <Actions>
          <LightButton type="button" onClick={() => openAuth('register')}>
            Get started free
          </LightButton>
          <GhostButton as={Link} to={ROUTES.pricing} $variant="secondary">
            View pricing
          </GhostButton>
        </Actions>
      </Row>
    </Section>
  )
}
