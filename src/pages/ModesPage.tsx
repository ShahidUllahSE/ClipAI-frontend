import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button, Container } from '@/components/ui'
import { useAuthModal } from '@/features/auth'
import { APP_NAME, ROUTES } from '@/constants'
import modeTalking from '@/assets/landing/mode-talking.jpg'
import modeRapid from '@/assets/landing/mode-rapid.jpg'
import modeAsmr from '@/assets/landing/mode-asmr.jpg'

const MODES = [
  {
    id: 'talking-head',
    name: 'Talking-head',
    label: 'Speech mode',
    bestFor: 'Podcast clips, face-cam tutorials, and dialogue-heavy social posts.',
    description:
      'Built for footage with speech. ClipAI removes long silences, places jump cuts, and can caption the dialogue so the final cut is tighter and social-ready.',
    analyzes: [
      'Speech-to-text transcript',
      'Word-level timestamps',
      'Long pauses and silence',
      'Sentence continuity',
    ],
    produces: [
      'Shorter talking-head export',
      'Jump cuts on dead air',
      'Optional captions',
      'Optional speaker zoom punch-ins',
    ],
    presets: ['Silence: Light', 'Silence: Medium', 'Silence: Aggressive'],
    image: modeTalking,
  },
  {
    id: 'rapid-cut',
    name: 'Rapid-cut',
    label: 'Energy mode',
    bestFor: 'Reels, Shorts, TikTok, and high-energy montages.',
    description:
      'Uses scene changes, motion, and audio peaks to keep active moments and drop the slow bits — without needing a full speech transcript.',
    analyzes: [
      'Scene changes',
      'Visual activity & movement',
      'Audio peaks',
      'Inactive sections',
    ],
    produces: [
      'Faster-paced short-form edit',
      'Shorter clips from long takes',
      'Optional speed changes',
      'Basic transitions when supported',
    ],
    presets: ['Pacing: Normal', 'Pacing: Fast', 'Pacing: Very fast'],
    image: modeRapid,
  },
  {
    id: 'asmr',
    name: 'ASMR & unboxing',
    label: 'Product mode',
    bestFor: 'Unboxings, product texture videos, and low-dialogue demos.',
    description:
      'When speech is thin or missing, this mode follows hands, packaging, reveals, and sound peaks so product moments stay front and center.',
    analyzes: [
      'Hand & packaging motion',
      'Product-reveal moments',
      'Sound peaks & texture audio',
      'Repeated or inactive stretches',
    ],
    produces: [
      'Tighter product-focused cut',
      'Preserved important sounds',
      'Reveal emphasis',
      'Optional zoom & speed effects',
    ],
    presets: ['Prefer motion cues', 'Prefer sound peaks', 'Balanced'],
    image: modeAsmr,
  },
] as const

const Page = styled.div`
  padding: 5.75rem 0 ${({ theme }) => theme.space['4xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-top: 7rem;
  }
  background:
    radial-gradient(
      ellipse 70% 40% at 0% 0%,
      ${({ theme }) => theme.colors.primarySoft} 0%,
      transparent 55%
    ),
    ${({ theme }) => theme.colors.background};
`

const Hero = styled.div`
  max-width: 42rem;
  margin-bottom: ${({ theme }) => theme.space['3xl']};
`

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Title = styled.h1`
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  margin-bottom: ${({ theme }) => theme.space.md};
  letter-spacing: -0.03em;
  line-height: 1.1;
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.xl};
  line-height: 1.6;
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
`

const ModeList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space['2xl']};
  margin-bottom: ${({ theme }) => theme.space['3xl']};
`

const ModeBlock = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
  padding: ${({ theme }) => theme.space.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    align-items: stretch;
  }
`

const ModeMedia = styled.div`
  flex: 0 0 auto;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.colors.elevated};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 40%;
    max-width: 22rem;
    min-height: 100%;
    aspect-ratio: auto;
    align-self: stretch;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const ModeBody = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`

const ModeLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`

const ModeName = styled.h2`
  font-size: clamp(1.6rem, 3vw, 2rem);
`

const ModeBest = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.ink};
`

const ModeText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const Cols = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
`

const ColTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const List = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space.sm};
`

const Item = styled.li`
  position: relative;
  padding-left: 1rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.ink};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 0.35rem;
    height: 0.35rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
  }
`

const Presets = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
`

const Chip = styled.span`
  padding: 0.35rem 0.7rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primarySoft};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`

const Compare = styled.div`
  margin-bottom: ${({ theme }) => theme.space['3xl']};
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
`

const Table = styled.table`
  width: 100%;
  min-width: 36rem;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes.sm};

  th,
  td {
    padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.lg};
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  th {
    background: ${({ theme }) => theme.colors.elevated};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }

  tr:last-child td {
    border-bottom: none;
  }

  td {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const SectionHead = styled.div`
  max-width: 36rem;
  margin-bottom: ${({ theme }) => theme.space.xl};
`

const SectionTitle = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const SectionLead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`

const CtaBand = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
  padding: ${({ theme }) => theme.space['2xl']};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.white};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const CtaCopy = styled.div`
  max-width: 32rem;
`

const CtaTitle = styled.h2`
  font-size: clamp(1.5rem, 2.5vw, 1.9rem);
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const CtaText = styled.p`
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  line-height: 1.55;
`

const CtaActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
`

const LightButton = styled(Button)`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.navy};
  border-color: ${({ theme }) => theme.colors.white};

  &:hover {
    background: ${({ theme }) => theme.colors.elevated};
    border-color: ${({ theme }) => theme.colors.elevated};
  }
`

const GhostButton = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  border-color: rgba(255, 255, 255, 0.35);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.6);
  }
`

export function ModesPage() {
  const { openAuth } = useAuthModal()

  return (
    <Page>
      <Container>
        <Hero>
          <Eyebrow>Editing modes</Eyebrow>
          <Title>Pick the mode that matches how you shoot</Title>
          <Lead>
            Modes choose the AI path for each project. This page is only about
            those three presets — not the full product tour on Home, and not the
            AI engine detail on Services.
          </Lead>
          <Actions>
            <Button type="button" onClick={() => openAuth('register')}>
              Start with a mode
            </Button>
            <Button as={Link} to={ROUTES.services} $variant="secondary">
              How AI backs each mode
            </Button>
          </Actions>
        </Hero>

        <ModeList>
          {MODES.map((mode) => (
            <ModeBlock key={mode.id} id={mode.id}>
              <ModeMedia>
                <img src={mode.image} alt="" />
              </ModeMedia>
              <ModeBody>
                <ModeLabel>{mode.label}</ModeLabel>
                <ModeName>{mode.name}</ModeName>
                <ModeBest>Best for: {mode.bestFor}</ModeBest>
                <ModeText>{mode.description}</ModeText>
                <Cols>
                  <div>
                    <ColTitle>What it analyzes</ColTitle>
                    <List>
                      {mode.analyzes.map((item) => (
                        <Item key={item}>{item}</Item>
                      ))}
                    </List>
                  </div>
                  <div>
                    <ColTitle>What you get</ColTitle>
                    <List>
                      {mode.produces.map((item) => (
                        <Item key={item}>{item}</Item>
                      ))}
                    </List>
                  </div>
                </Cols>
                <div>
                  <ColTitle>Presets</ColTitle>
                  <Presets>
                    {mode.presets.map((preset) => (
                      <Chip key={preset}>{preset}</Chip>
                    ))}
                  </Presets>
                </div>
              </ModeBody>
            </ModeBlock>
          ))}
        </ModeList>

        <SectionHead>
          <SectionTitle>Quick compare</SectionTitle>
          <SectionLead>
            Use this when choosing a mode before you upload.
          </SectionLead>
        </SectionHead>
        <Compare>
          <Table>
            <thead>
              <tr>
                <th>Mode</th>
                <th>Needs speech?</th>
                <th>Primary signal</th>
                <th>Social fit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Talking-head</td>
                <td>Yes — dialogue-led</td>
                <td>Transcript & pauses</td>
                <td>Explainers, hooks, clips</td>
              </tr>
              <tr>
                <td>Rapid-cut</td>
                <td>Optional</td>
                <td>Motion & audio peaks</td>
                <td>Reels / Shorts energy</td>
              </tr>
              <tr>
                <td>ASMR & unboxing</td>
                <td>No — often silent</td>
                <td>Hands, reveals, sounds</td>
                <td>Product & texture shots</td>
              </tr>
            </tbody>
          </Table>
        </Compare>

        <CtaBand>
          <CtaCopy>
            <CtaTitle>Choose a mode on your next upload</CtaTitle>
            <CtaText>
              {APP_NAME} applies the matching AI path after you pick talking-head,
              rapid-cut, or ASMR — then you preview and download.
            </CtaText>
          </CtaCopy>
          <CtaActions>
            <LightButton type="button" onClick={() => openAuth('register')}>
              Get started free
            </LightButton>
            <GhostButton as={Link} to={ROUTES.features} $variant="secondary">
              All product features
            </GhostButton>
          </CtaActions>
        </CtaBand>
      </Container>
    </Page>
  )
}
