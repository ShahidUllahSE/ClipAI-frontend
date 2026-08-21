import styled from 'styled-components'
import { Container } from '@/components/ui'
import { EDIT_OPTIONS } from '@/constants'

const Section = styled.section`
  padding: ${({ theme }) => `${theme.space['3xl']} 0`};
  background: ${({ theme }) => theme.colors.background};
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
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Title = styled.h2`
  font-size: clamp(1.85rem, 3.5vw, 2.6rem);
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

const Card = styled.article`
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryMuted};
  }
`

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const CardText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

export function EditingOptions() {
  return (
    <Section id="options">
      <Container>
        <Header>
          <Eyebrow>Editing options</Eyebrow>
          <Title>Toggle what your export needs</Title>
          <Lead>
            Enable captions, framing, speed, and zoom presets before you submit.
          </Lead>
        </Header>
        <Grid>
          {EDIT_OPTIONS.map((option) => (
            <Card key={option.title}>
              <CardTitle>{option.title}</CardTitle>
              <CardText>{option.text}</CardText>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
