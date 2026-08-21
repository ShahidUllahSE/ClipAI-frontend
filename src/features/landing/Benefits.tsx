import styled from 'styled-components'
import { Container } from '@/components/ui'

const FEATURES = [
  {
    title: 'Ask less. Edit faster',
    text: 'Choose a mode and options once — ClipAI handles silence, pacing, and captions.',
  },
  {
    title: 'Works where you publish',
    text: 'Export 9:16, 1:1, or 16:9 for Reels, Shorts, TikTok, and feed posts.',
  },
  {
    title: 'Status you can trust',
    text: 'Track uploading, analyzing, rendering, and completed jobs in one place.',
  },
  {
    title: 'Fair edit credits',
    text: 'Only successful renders use an edit. Failed jobs never touch your balance.',
  },
] as const

const Section = styled.section`
  padding: ${({ theme }) => `${theme.space['3xl']} 0`};
`

const Header = styled.div`
  text-align: center;
  max-width: 36rem;
  margin: 0 auto ${({ theme }) => theme.space['2xl']};
`

const Eyebrow = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: ${({ theme }) => theme.space.md};
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Card = styled.article`
  padding: ${({ theme }) => theme.space.xl};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  transition: box-shadow ${({ theme }) => theme.transitions.normal};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`

const Icon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primarySoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const CardText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

export function Benefits() {
  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>Assisting creators</Eyebrow>
          <Title>Edit smarter, not harder</Title>
          <Lead>
            A clean AI workflow focused on the outcomes that matter for social
            video.
          </Lead>
        </Header>
        <Grid>
          {FEATURES.map((feature) => (
            <Card key={feature.title}>
              <Icon aria-hidden />
              <CardTitle>{feature.title}</CardTitle>
              <CardText>{feature.text}</CardText>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
