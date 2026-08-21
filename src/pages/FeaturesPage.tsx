import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button, Container } from '@/components/ui'
import { useAuthModal } from '@/features/auth'
import {
  APP_NAME,
  EDITING_MODES,
  PRODUCT_FEATURES,
  ROUTES,
} from '@/constants'
import heroBanner from '@/assets/landing/hero-banner.jpg'
import modeTalking from '@/assets/landing/mode-talking.jpg'
import modeRapid from '@/assets/landing/mode-rapid.jpg'
import modeAsmr from '@/assets/landing/mode-asmr.jpg'
import serviceCaptions from '@/assets/landing/service-captions.jpg'
import serviceMotion from '@/assets/landing/service-motion.jpg'
import stepMode from '@/assets/landing/step-mode.jpg'
import stepDownload from '@/assets/landing/step-download.jpg'
import stepUpload from '@/assets/landing/step-upload.jpg'
import serviceSpeech from '@/assets/landing/service-speech.jpg'

const MODE_IMAGES = {
  'talking-head': {
    src: modeTalking,
    alt: 'Talking-head creator being edited for social video',
  },
  'rapid-cut': {
    src: modeRapid,
    alt: 'Rapid-cut timeline with energetic short-form clips',
  },
  asmr: {
    src: modeAsmr,
    alt: 'ASMR and unboxing product footage setup',
  },
} as const

const EDIT_OPTION_VISUALS = [
  {
    title: 'Auto captions',
    text: 'Generate captions from speech with a clean MVP caption style.',
    image: serviceCaptions,
    alt: 'Phone showing burned-in social captions',
  },
  {
    title: 'Aspect ratios',
    text: 'Export 9:16, 1:1, or 16:9 — default vertical for Reels and Shorts.',
    image: stepMode,
    alt: 'Vertical framing for social export formats',
  },
  {
    title: 'Speed ramps',
    text: 'Light to aggressive presets that keep key moments at normal speed.',
    image: serviceMotion,
    alt: 'Timeline pacing and speed changes for rapid cuts',
  },
  {
    title: 'Keyframe zooms',
    text: 'Speaker punch-ins and reveal zooms without a manual timeline.',
    image: stepDownload,
    alt: 'Finished framed export with zoom emphasis',
  },
] as const

const WORKFLOW_IMAGES = [
  stepUpload,
  serviceSpeech,
  stepDownload,
  modeTalking,
  stepMode,
  serviceMotion,
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
  display: grid;
  gap: ${({ theme }) => theme.space['2xl']};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space['3xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: ${({ theme }) => theme.space['3xl']};
  }
`

const HeroCopy = styled.div`
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
  gap: 0.65rem;
`

const HeroMedia = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  aspect-ratio: 16 / 11;
  min-height: 16rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 70% center;
    display: block;
  }
`

const Block = styled.section`
  margin-bottom: ${({ theme }) => theme.space['3xl']};
`

const BlockHeader = styled.div`
  max-width: 36rem;
  margin-bottom: ${({ theme }) => theme.space['2xl']};
`

const BlockTitle = styled.h2`
  font-size: clamp(1.6rem, 3vw, 2.15rem);
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const BlockLead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`

const ModeGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const OptionGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const WorkflowGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Card = styled.article`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
  transition:
    transform ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.primaryMuted};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:hover img {
    transform: scale(1.05);
  }
`

const Photo = styled.div<{ $tall?: boolean }>`
  overflow: hidden;
  aspect-ratio: ${({ $tall }) => ($tall ? '16 / 11' : '4 / 3')};
  background: ${({ theme }) => theme.colors.elevated};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
`

const Body = styled.div`
  padding: ${({ theme }) => theme.space.xl};
`

const Index = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.25rem;
  height: 2.25rem;
  margin-bottom: ${({ theme }) => theme.space.md};
  padding: 0 0.55rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const CardText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.55;
`

const ServicesLink = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  padding: ${({ theme }) => theme.space['2xl']};
  margin-bottom: ${({ theme }) => theme.space['3xl']};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.primarySoft};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const ServicesLinkCopy = styled.div`
  max-width: 34rem;
`

const ServicesLinkTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const ServicesLinkText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
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
  flex-shrink: 0;
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

export function FeaturesPage() {
  const { openAuth } = useAuthModal()

  return (
    <Page>
      <Container>
        <Hero>
          <HeroCopy>
            <Eyebrow>Product features</Eyebrow>
            <Title>What you control — modes, options, and workflow</Title>
            <Lead>
              Modes and toggles shape each project. Upload, status, and
              download keep the job moving. For what the AI does under the hood,
              open Services.
            </Lead>
            <Actions>
              <Button type="button" onClick={() => openAuth('register')}>
                Create your account
              </Button>
              <Button as={Link} to={ROUTES.services} $variant="secondary">
                How AI processes jobs
              </Button>
            </Actions>
          </HeroCopy>
          <HeroMedia>
            <img
              src={heroBanner}
              alt="AI video editor workspace with social export preview"
            />
          </HeroMedia>
        </Hero>

        <Block>
          <BlockHeader>
            <BlockTitle>Editing modes</BlockTitle>
            <BlockLead>
              Three presets for speech, energy, and product footage. Deep
              compare and presets are on the Modes page.
            </BlockLead>
          </BlockHeader>
          <ModeGrid>
            {EDITING_MODES.map((mode, index) => {
              const image = MODE_IMAGES[mode.id as keyof typeof MODE_IMAGES]
              return (
                <Card key={mode.id}>
                  <Photo $tall>
                    <img src={image.src} alt={image.alt} />
                  </Photo>
                  <Body>
                    <Index>0{index + 1}</Index>
                    <CardTitle>{mode.name}</CardTitle>
                    <CardText>{mode.summary}</CardText>
                  </Body>
                </Card>
              )
            })}
          </ModeGrid>
          <Actions style={{ marginTop: '1.5rem' }}>
            <Button as={Link} to={ROUTES.modes} $variant="secondary">
              Compare all modes
            </Button>
          </Actions>
        </Block>

        <Block>
          <BlockHeader>
            <BlockTitle>Editing options</BlockTitle>
            <BlockLead>
              Optional toggles per project — captions, framing, speed, and
              zooms.
            </BlockLead>
          </BlockHeader>
          <OptionGrid>
            {EDIT_OPTION_VISUALS.map((option, index) => (
              <Card key={option.title}>
                <Photo $tall>
                  <img src={option.image} alt={option.alt} />
                </Photo>
                <Body>
                  <Index>0{index + 1}</Index>
                  <CardTitle>{option.title}</CardTitle>
                  <CardText>{option.text}</CardText>
                </Body>
              </Card>
            ))}
          </OptionGrid>
        </Block>

        <Block>
          <BlockHeader>
            <BlockTitle>Product workflow</BlockTitle>
            <BlockLead>
              Account-side capabilities from upload through download — not the
              AI analysis layer.
            </BlockLead>
          </BlockHeader>
          <WorkflowGrid>
            {PRODUCT_FEATURES.map((feature, index) => (
              <Card key={feature.title}>
                <Photo>
                  <img
                    src={WORKFLOW_IMAGES[index]}
                    alt=""
                    loading="lazy"
                  />
                </Photo>
                <Body>
                  <Index>0{index + 1}</Index>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardText>{feature.text}</CardText>
                </Body>
              </Card>
            ))}
          </WorkflowGrid>
        </Block>

        <ServicesLink>
          <ServicesLinkCopy>
            <ServicesLinkTitle>
              Want the AI deep dive instead?
            </ServicesLinkTitle>
            <ServicesLinkText>
              Speech, motion, captions, naming, and export — plus job statuses
              and output limits — live on the Services page.
            </ServicesLinkText>
          </ServicesLinkCopy>
          <Button as={Link} to={ROUTES.services}>
            Go to services
          </Button>
        </ServicesLink>

        <CtaBand>
          <CtaCopy>
            <CtaTitle>Put {APP_NAME} on your next upload</CtaTitle>
            <CtaText>
              Create an account, pick a plan, choose a mode, and export
              social-ready MP4.
            </CtaText>
          </CtaCopy>
          <CtaActions>
            <LightButton type="button" onClick={() => openAuth('register')}>
              Get started free
            </LightButton>
            <GhostButton as={Link} to={ROUTES.pricing} $variant="secondary">
              View pricing
            </GhostButton>
          </CtaActions>
        </CtaBand>
      </Container>
    </Page>
  )
}
