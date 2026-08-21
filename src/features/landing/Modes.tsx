import styled from 'styled-components'
import talkingHead from '@/assets/landing/talking-head.jpg'
import rapidCut from '@/assets/landing/rapid-cut.jpg'
import asmr from '@/assets/landing/asmr.jpg'
import { Button, Container } from '@/components/ui'
import { EDITING_MODES, ROUTES } from '@/constants'

const IMAGES = {
  'talking-head': talkingHead,
  'rapid-cut': rapidCut,
  asmr,
} as const

const Section = styled.section`
  padding: ${({ theme }) => `0 0 ${theme.space['4xl']}`};
  background: ${({ theme }) => theme.colors.background};
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  margin-bottom: ${({ theme }) => theme.space['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
  }
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
  font-size: clamp(2rem, 4.5vw, 3.2rem);
  max-width: 14ch;
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 36ch;
  margin-bottom: ${({ theme }) => theme.space.md};
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
`

const Mode = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.space.xl};
  padding: ${({ theme }) => theme.space.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 0.9fr 1.1fr;
    align-items: center;
    padding: ${({ theme }) => theme.space.xl};
  }
`

const Media = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  min-height: 16rem;

  img {
    width: 100%;
    height: 100%;
    min-height: 16rem;
    object-fit: cover;
  }
`

const ModeName = styled.h3`
  font-size: clamp(1.6rem, 3vw, 2.3rem);
  margin-bottom: ${({ theme }) => theme.space.md};
`

const ModeSummary = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space.lg};
  max-width: 40ch;
`

const Details = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const Detail = styled.li`
  padding: 0.75rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.elevated};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
`

export function Modes() {
  return (
    <Section id="modes">
      <Container>
        <Header>
          <div>
            <Eyebrow>What we do best</Eyebrow>
            <Title>Three modes. One pipeline.</Title>
          </div>
          <div>
            <Lead>
              From cinematic storytelling beats to product reveals — pick the
              mode that matches how you shoot.
            </Lead>
            <Button as="a" href={ROUTES.register} $variant="secondary">
              Explore all modes
            </Button>
          </div>
        </Header>
        <List>
          {EDITING_MODES.map((mode) => (
            <Mode key={mode.id}>
              <Media>
                <img src={IMAGES[mode.id as keyof typeof IMAGES]} alt="" />
              </Media>
              <div>
                <ModeName>{mode.name}</ModeName>
                <ModeSummary>{mode.summary}</ModeSummary>
                <Details>
                  {mode.details.map((detail) => (
                    <Detail key={detail}>{detail}</Detail>
                  ))}
                </Details>
              </div>
            </Mode>
          ))}
        </List>
      </Container>
    </Section>
  )
}
