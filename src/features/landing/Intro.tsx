import styled from 'styled-components'
import studio from '@/assets/landing/studio.jpg'
import { Container } from '@/components/ui'

const PILLARS = [
  {
    title: 'Talking-head edits',
    text: 'Silence removal, jump cuts, and captions built for speech-driven clips.',
  },
  {
    title: 'Rapid social pacing',
    text: 'Scene and motion analysis that keeps energy high for Reels and Shorts.',
  },
  {
    title: 'ASMR & unboxing',
    text: 'Preserve reveals and texture sounds without relying on dialogue.',
  },
  {
    title: 'Export-ready formats',
    text: 'Ship in 9:16, 1:1, or 16:9 — titled, rendered, and ready to post.',
  },
] as const

const Section = styled.section`
  padding: ${({ theme }) => `${theme.space['4xl']} 0`};
  background: ${({ theme }) => theme.colors.background};
`

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: center;
  }
`

const Copy = styled.div``

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.space.md};
`

const Title = styled.h2`
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  line-height: 1.02;
  margin-bottom: ${({ theme }) => theme.space.lg};
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  max-width: 38ch;
  margin-bottom: ${({ theme }) => theme.space['2xl']};
`

const Pillars = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Pillar = styled.article`
  padding: ${({ theme }) => theme.space.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
`

const PillarTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const PillarText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const Media = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  min-height: 24rem;
  border: 1px solid ${({ theme }) => theme.colors.border};

  img {
    width: 100%;
    height: 100%;
    min-height: 24rem;
    object-fit: cover;
  }
`

export function Intro() {
  return (
    <Section id="how">
      <Container>
        <Grid>
          <Copy>
            <Eyebrow>Crafting stories through smarter cuts</Eyebrow>
            <Title>From raw clip to scroll-stopping post</Title>
            <Lead>
              ClipAI is built on the belief that every upload deserves clean
              pacing, clear audio moments, and social-ready framing — without a
              manual timeline.
            </Lead>
            <Pillars>
              {PILLARS.map((item) => (
                <Pillar key={item.title}>
                  <PillarTitle>{item.title}</PillarTitle>
                  <PillarText>{item.text}</PillarText>
                </Pillar>
              ))}
            </Pillars>
          </Copy>
          <Media>
            <img src={studio} alt="" />
          </Media>
        </Grid>
      </Container>
    </Section>
  )
}
