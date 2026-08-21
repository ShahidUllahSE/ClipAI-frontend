import { Link } from 'react-router-dom'
import styled from 'styled-components'
import stepUpload from '@/assets/landing/step-upload.jpg'
import stepMode from '@/assets/landing/step-mode.jpg'
import stepDownload from '@/assets/landing/step-download.jpg'
import { Button, Container } from '@/components/ui'
import { ROUTES } from '@/constants'

/** Short homepage teaser only — full walkthrough is /how */
const TEASER_STEPS = [
  {
    step: '01',
    title: 'Upload',
    text: 'Drop MP4, MOV, or WebM footage.',
    image: stepUpload,
  },
  {
    step: '02',
    title: 'Choose a mode',
    text: 'Talking-head, rapid-cut, or ASMR.',
    image: stepMode,
  },
  {
    step: '03',
    title: 'Download',
    text: 'Preview and export social-ready MP4.',
    image: stepDownload,
  },
] as const

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
  max-width: 36rem;
  text-align: left;
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
  font-size: ${({ theme }) => theme.fontSizes.lg};
`

const Grid = styled.ol`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};
  list-style: none;
  padding: 0;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Card = styled.li`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.background};
`

const Photo = styled.div`
  overflow: hidden;
  height: 9rem;
  background: ${({ theme }) => theme.colors.elevated};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Body = styled.div`
  padding: ${({ theme }) => theme.space.lg};
`

const Step = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  margin-bottom: ${({ theme }) => theme.space.sm};
  padding: 0 0.45rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.xs};
`

const CardText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

export function HowItWorks() {
  return (
    <Section id="how">
      <Container>
        <Header>
          <Copy>
            <Eyebrow>How it works</Eyebrow>
            <Title>Three steps to a finished cut</Title>
            <Lead>
              Upload, pick a mode, download — the full walkthrough is on its own
              page.
            </Lead>
          </Copy>
          <Button as={Link} to={ROUTES.how} $variant="secondary">
            Full how-it-works
          </Button>
        </Header>
        <Grid>
          {TEASER_STEPS.map((item) => (
            <Card key={item.step}>
              <Photo>
                <img src={item.image} alt="" loading="lazy" />
              </Photo>
              <Body>
                <Step>{item.step}</Step>
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
