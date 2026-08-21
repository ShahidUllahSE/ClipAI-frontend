import styled from 'styled-components'
import { Container } from '@/components/ui'
import { PIPELINE_STEPS } from '@/constants'

const Section = styled.section`
  padding: ${({ theme }) => `${theme.space['3xl']} 0`};
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.white};
`

const Header = styled.div`
  max-width: 36rem;
  margin-bottom: ${({ theme }) => theme.space['2xl']};
`

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primaryMuted};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Title = styled.h2`
  font-size: clamp(1.85rem, 3.5vw, 2.6rem);
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

const Track = styled.ol`
  display: grid;
  gap: ${({ theme }) => theme.space.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Step = styled.li`
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
`

const Index = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.primaryMuted};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Status = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Detail = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

export function Pipeline() {
  return (
    <Section id="pipeline">
      <Container>
        <Header>
          <Eyebrow>Processing status</Eyebrow>
          <Title>Track every job from upload to render</Title>
          <Lead>
            Follow analyzing, editing, and rendering in real time — retry failed
            jobs without losing edit credits.
          </Lead>
        </Header>
        <Track>
          {PIPELINE_STEPS.map((item, index) => (
            <Step key={item.status}>
              <Index>0{index + 1}</Index>
              <Status>{item.status}</Status>
              <Detail>{item.detail}</Detail>
            </Step>
          ))}
        </Track>
      </Container>
    </Section>
  )
}
