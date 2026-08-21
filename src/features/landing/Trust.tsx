import styled from 'styled-components'
import creator from '@/assets/landing/creator.jpg'
import { Button, Container } from '@/components/ui'
import { ROUTES } from '@/constants'

const REASONS = [
  {
    num: '01',
    title: 'AI-assisted precision',
    text: 'Speech, silence, motion, and sound peaks drive the edit — not guesswork.',
  },
  {
    num: '02',
    title: 'Creator-first workflow',
    text: 'Upload, toggle options, and render. No timeline certification required.',
  },
  {
    num: '03',
    title: 'Fair edit credits',
    text: 'Successful renders count. Failed jobs never touch your balance.',
  },
  {
    num: '04',
    title: 'Social-native output',
    text: 'Vertical, square, or landscape exports ready for Reels, Shorts, and TikTok.',
  },
] as const

const Section = styled.section`
  padding: ${({ theme }) => `${theme.space['4xl']} 0`};
`

const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 0.9fr 1.1fr;
    align-items: center;
  }
`

const Media = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  min-height: 28rem;
  border: 1px solid ${({ theme }) => theme.colors.border};

  img {
    width: 100%;
    height: 100%;
    min-height: 28rem;
    object-fit: cover;
  }
`

const Stat = styled.div`
  position: absolute;
  left: 1.25rem;
  bottom: 1.25rem;
  padding: ${({ theme }) => theme.space.lg};
  background: rgba(10, 10, 11, 0.82);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  backdrop-filter: blur(10px);
`

const StatValue = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
`

const StatLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
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
  font-size: clamp(2rem, 4.5vw, 3.2rem);
  margin-bottom: ${({ theme }) => theme.space.md};
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space.xl};
  max-width: 40ch;
`

const List = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};
  margin-bottom: ${({ theme }) => theme.space.xl};
`

const Reason = styled.article`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.space.lg};
  padding-bottom: ${({ theme }) => theme.space.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`

const Num = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  padding-top: 0.2rem;
`

const ReasonTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const ReasonText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

export function Trust() {
  return (
    <Section id="trust">
      <Container>
        <Layout>
          <Media>
            <img src={creator} alt="" />
            <Stat>
              <StatValue>3 modes</StatValue>
              <StatLabel>Speech · Rapid · ASMR</StatLabel>
            </Stat>
          </Media>
          <Copy>
            <Eyebrow>Why creators trust ClipAI</Eyebrow>
            <Title>From concept to screen, faster</Title>
            <Lead>
              We craft powerful short-form edits with industry-grade AI
              pipelines — so your story ships while it’s still relevant.
            </Lead>
            <List>
              {REASONS.map((reason) => (
                <Reason key={reason.num}>
                  <Num>{reason.num}</Num>
                  <div>
                    <ReasonTitle>{reason.title}</ReasonTitle>
                    <ReasonText>{reason.text}</ReasonText>
                  </div>
                </Reason>
              ))}
            </List>
            <Button as="a" href={ROUTES.register}>
              Let’s create together
            </Button>
          </Copy>
        </Layout>
      </Container>
    </Section>
  )
}
