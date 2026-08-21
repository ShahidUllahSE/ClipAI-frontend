import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import modeTalking from '@/assets/landing/mode-talking.jpg'
import modeRapid from '@/assets/landing/mode-rapid.jpg'
import modeAsmr from '@/assets/landing/mode-asmr.jpg'
import { Button, Container } from '@/components/ui'
import { ROUTES } from '@/constants'

const TOOLS = [
  {
    id: 'talking-head',
    name: 'Talking-head',
    label: 'Speech mode',
    description:
      'Speech-aware editing that removes silence, adds jump cuts, and generates captions for dialogue-heavy clips.',
    points: [
      'Speech-to-text timestamps',
      'Pause detection & jump cuts',
      'Optional zoom punch-ins',
      'Basic auto captions',
    ],
    image: modeTalking,
  },
  {
    id: 'rapid-cut',
    name: 'Rapid-cut',
    label: 'Energy mode',
    description:
      'Faster pacing for Reels and Shorts using motion, scene changes, and audio peaks.',
    points: [
      'Scene & motion analysis',
      'Audio-peak aware cuts',
      'Pacing presets: normal to very fast',
      'Optional speed changes',
    ],
    image: modeRapid,
  },
  {
    id: 'asmr',
    name: 'ASMR & unboxing',
    label: 'Product mode',
    description:
      'Preserve product reveals and texture sounds without relying on a transcript.',
    points: [
      'Hand & packaging motion cues',
      'Sound-peak preservation',
      'Reveal-moment emphasis',
      'Optional zoom & speed effects',
    ],
    image: modeAsmr,
  },
] as const

const fadeIn = keyframes`
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
  padding: ${({ theme }) => `${theme.space['3xl']} 0 ${theme.space['4xl']}`};
  background:
    radial-gradient(circle at 80% 10%, rgba(124, 58, 237, 0.07), transparent 35%),
    ${({ theme }) => theme.colors.background};
`

const Header = styled.div`
  text-align: center;
  max-width: 40rem;
  margin: 0 auto ${({ theme }) => theme.space['2xl']};
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
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: ${({ theme }) => theme.space.md};
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space['2xl']};
  padding: 0.35rem;
  width: fit-content;
  max-width: 100%;
  margin-inline: auto;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`

const Tab = styled.button<{ $active: boolean }>`
  padding: 0.75rem 1.2rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition:
    background-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  ${({ $active }) =>
    $active &&
    `
    box-shadow: 0 8px 18px rgba(124, 58, 237, 0.28);
  `}

  &:hover {
    color: ${({ theme, $active }) =>
      $active ? theme.colors.white : theme.colors.primary};
  }
`

const Panel = styled.div`
  display: grid;
  gap: 0;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  animation: ${fadeIn} 0.45s ease both;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 0.95fr 1.05fr;
    min-height: 28rem;
  }
`

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => theme.space['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.space['3xl']};
  }
`

const ModeLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const ToolTitle = styled.h3`
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  margin-bottom: ${({ theme }) => theme.space.md};
`

const ToolText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.xl};
  max-width: 34ch;
`

const Points = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.xl};
`

const Point = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  padding: 0.7rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primarySoft};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.ink};

  &::before {
    content: '';
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
  }
`

const Media = styled.div`
  position: relative;
  min-height: 18rem;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.elevated};

  img {
    width: 100%;
    height: 100%;
    min-height: 18rem;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover img {
    transform: scale(1.04);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 100%;

    img {
      position: absolute;
      inset: 0;
      min-height: 100%;
    }
  }
`

const MediaShade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.12) 0%,
    transparent 30%
  );
`

export function Tools() {
  const [active, setActive] = useState(0)
  const tool = TOOLS[active]

  return (
    <Section id="tools">
      <Container>
        <Header>
          <Eyebrow>Editing modes</Eyebrow>
          <Title>Three modes for how you shoot</Title>
          <Lead>
            A quick taste of talking-head, rapid-cut, and ASMR — full compare and
            presets live on the Modes page.
          </Lead>
        </Header>
        <Tabs>
          {TOOLS.map((item, index) => (
            <Tab
              key={item.id}
              type="button"
              $active={index === active}
              onClick={() => setActive(index)}
            >
              {item.name}
            </Tab>
          ))}
        </Tabs>
        <Panel key={tool.id}>
          <Copy>
            <ModeLabel>{tool.label}</ModeLabel>
            <ToolTitle>{tool.name}</ToolTitle>
            <ToolText>{tool.description}</ToolText>
            <Points>
              {tool.points.slice(0, 3).map((point) => (
                <Point key={point}>{point}</Point>
              ))}
            </Points>
            <Button as={Link} to={ROUTES.modes}>
              Explore all modes
            </Button>
          </Copy>
          <Media>
            <img src={tool.image} alt="" />
            <MediaShade />
          </Media>
        </Panel>
      </Container>
    </Section>
  )
}
