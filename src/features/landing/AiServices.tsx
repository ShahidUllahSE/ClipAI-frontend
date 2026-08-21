import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Container } from '@/components/ui'
import { ROUTES } from '@/constants'
import serviceSpeech from '@/assets/landing/service-speech.jpg'
import serviceMotion from '@/assets/landing/service-motion.jpg'
import serviceAsmr from '@/assets/landing/service-asmr.jpg'

/** Short home teaser only — full catalog lives on /services */
const TEASERS = [
  {
    title: 'Speech analysis',
    text: 'Jump cuts and silence removal for talking-head clips.',
    image: serviceSpeech,
    alt: 'AI speech timeline and waveform',
  },
  {
    title: 'Scene & motion AI',
    text: 'Faster pacing from scene changes and audio peaks.',
    image: serviceMotion,
    alt: 'Motion markers on a rapid-cut timeline',
  },
  {
    title: 'ASMR & product cues',
    text: 'Keeps reveals and textures when dialogue is thin.',
    image: serviceAsmr,
    alt: 'Product unboxing with motion cues',
  },
] as const

const Section = styled.section`
  padding: ${({ theme }) => `${theme.space['3xl']} 0`};
  background:
    radial-gradient(
      ellipse 80% 50% at 10% 0%,
      ${({ theme }) => theme.colors.primarySoft} 0%,
      transparent 55%
    ),
    ${({ theme }) => theme.colors.surface};
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
  max-width: 36rem;
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
  font-size: clamp(1.85rem, 3.5vw, 2.75rem);
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Card = styled.article`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.background};
  transition:
    transform ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:hover img {
    transform: scale(1.05);
  }
`

const Photo = styled.div`
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.colors.elevated};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
`

const Body = styled.div`
  padding: ${({ theme }) => `${theme.space.lg} ${theme.space.xl} ${theme.space.xl}`};
`

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const CardText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
`

export function AiServices() {
  return (
    <Section id="services">
      <Container>
        <Header>
          <Copy>
            <Eyebrow>AI services</Eyebrow>
            <Title>How the engine reads your footage</Title>
            <Lead>
              Speech, motion, and product cues power the cut — then captions,
              naming, and export finish the job.
            </Lead>
          </Copy>
          <Button as={Link} to={ROUTES.services} $variant="secondary">
            See all services
          </Button>
        </Header>
        <Grid>
          {TEASERS.map((item) => (
            <Card key={item.title}>
              <Photo>
                <img src={item.image} alt={item.alt} />
              </Photo>
              <Body>
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.text}</CardText>
              </Body>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
