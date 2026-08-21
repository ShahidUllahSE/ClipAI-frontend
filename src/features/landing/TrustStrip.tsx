import styled, { keyframes } from 'styled-components'
import { Container } from '@/components/ui'

const MODES = [
  {
    num: '01',
    title: 'Talking-head',
    text: 'Silence out, jump cuts in, captions on for speech-driven clips.',
  },
  {
    num: '02',
    title: 'Rapid-cut',
    text: 'Faster pacing for Reels and Shorts — keep the energy, drop dead air.',
  },
  {
    num: '03',
    title: 'ASMR & unboxing',
    text: 'Preserve reveals and texture sounds without relying on dialogue.',
  },
] as const

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(0.75rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Section = styled.section`
  position: relative;
  padding: ${({ theme }) => `${theme.space['2xl']} 0`};
  background:
    radial-gradient(circle at 10% 0%, rgba(124, 58, 237, 0.08), transparent 40%),
    ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Header = styled.div`
  text-align: center;
  max-width: 36rem;
  margin: 0 auto ${({ theme }) => theme.space.xl};
  animation: ${fadeUp} 0.7s ease both;
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
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: ${({ theme }) => theme.colors.ink};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};
`

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Card = styled.article`
  position: relative;
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
  transition:
    transform ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.fast};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.primaryMuted}
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform ${({ theme }) => theme.transitions.normal};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.primaryMuted};
  }

  &:hover::before {
    transform: scaleX(1);
  }
`

const Num = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  height: 2.5rem;
  margin-bottom: ${({ theme }) => theme.space.md};
  padding: 0 0.65rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.ink};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const CardText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.55;
`

export function TrustStrip() {
  return (
    <Section aria-label="Editing modes">
      <Container>
        <Header>
          <Eyebrow>Editing modes</Eyebrow>
          <Title>Built for speech, energy, and product footage</Title>
          <Lead>
            Three AI-assisted presets that match how creators actually shoot.
          </Lead>
        </Header>
        <Grid>
          {MODES.map((mode) => (
            <Card key={mode.num}>
              <Num>{mode.num}</Num>
              <CardTitle>{mode.title}</CardTitle>
              <CardText>{mode.text}</CardText>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
