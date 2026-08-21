import styled from 'styled-components'
import { Link } from 'react-router-dom'
import stepUpload from '@/assets/landing/step-upload.jpg'
import stepMode from '@/assets/landing/step-mode.jpg'
import stepDownload from '@/assets/landing/step-download.jpg'
import serviceSpeech from '@/assets/landing/service-speech.jpg'
import serviceRender from '@/assets/landing/service-render.jpg'
import { Button, Container } from '@/components/ui'
import { useAuthModal } from '@/features/auth'
import { APP_NAME, ROUTES } from '@/constants'

const JOURNEY = [
  {
    step: '01',
    title: 'Create an account',
    text: 'Register with email and password, then sign in to your workspace.',
    detail: 'Your projects and remaining edit credits only appear after login.',
    image: serviceSpeech,
  },
  {
    step: '02',
    title: 'Pick a plan',
    text: 'Choose Basic, Standard, Pro, or Unlimited based on monthly edit volume.',
    detail: 'You can upgrade, downgrade, or cancel later from subscription settings.',
    image: serviceRender,
  },
  {
    step: '03',
    title: 'Upload source video',
    text: 'Drag-and-drop or browse MP4, MOV, or WebM files for your project.',
    detail: 'MVP limits: up to 2 GB and 20 minutes of source footage per job.',
    image: stepUpload,
  },
  {
    step: '04',
    title: 'Select mode & options',
    text: 'Talking-head, rapid-cut, or ASMR — then toggle captions, ratio, speed, zooms.',
    detail: 'Mode chooses the AI path; options shape the final cut without a timeline.',
    image: stepMode,
  },
  {
    step: '05',
    title: 'Submit & track status',
    text: 'The job moves from queued to analyzing, preparing edit, and rendering.',
    detail: 'Failed jobs can be retried when eligible — no credit until success.',
    image: serviceSpeech,
  },
  {
    step: '06',
    title: 'Preview & download',
    text: 'Watch the result, edit the AI title if you want, then download MP4.',
    detail: 'One successful render uses one edit credit from your plan.',
    image: stepDownload,
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

const Timeline = styled.ol`
  display: grid;
  gap: ${({ theme }) => theme.space.xl};
  list-style: none;
  padding: 0;
  margin: 0 0 ${({ theme }) => theme.space['3xl']};
`

const StepCard = styled.li`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  padding: ${({ theme }) => theme.space.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: stretch;
  }
`

const StepMedia = styled.div`
  flex: 0 0 auto;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.colors.elevated};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 38%;
    max-width: 18rem;
    aspect-ratio: auto;
    min-height: 12rem;
    align-self: stretch;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const StepBody = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`

const StepBadge = styled.span`
  display: inline-flex;
  margin-bottom: ${({ theme }) => theme.space.md};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`

const StepTitle = styled.h2`
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const StepText = styled.p`
  color: ${({ theme }) => theme.colors.ink};
  margin-bottom: ${({ theme }) => theme.space.sm};
  line-height: 1.55;
`

const StepDetail = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.55;
`

const Tips = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space['3xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Tip = styled.article`
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`

const TipTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const TipText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
`

const TipsHead = styled.div`
  max-width: 36rem;
  margin-bottom: ${({ theme }) => theme.space.xl};
`

const TipsTitle = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const TipsLead = styled.p`
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

export function HowItWorksPage() {
  const { openAuth } = useAuthModal()

  return (
    <Page>
      <Container>
        <Hero>
          <Eyebrow>How it works</Eyebrow>
          <Title>The full creator workflow from signup to download</Title>
          <Lead>
            This page follows the real product path — account, plan, upload,
            mode, processing, preview, and export. Home only shows a short
            three-step teaser.
          </Lead>
          <Actions>
            <Button type="button" onClick={() => openAuth('register')}>
              Start editing
            </Button>
            <Button as={Link} to={ROUTES.modes} $variant="secondary">
              Choose a mode
            </Button>
          </Actions>
        </Hero>

        <Timeline>
          {JOURNEY.map((item) => (
            <StepCard key={item.step}>
              <StepMedia>
                <img src={item.image} alt="" loading="lazy" />
              </StepMedia>
              <StepBody>
                <StepBadge>Step {item.step}</StepBadge>
                <StepTitle>{item.title}</StepTitle>
                <StepText>{item.text}</StepText>
                <StepDetail>{item.detail}</StepDetail>
              </StepBody>
            </StepCard>
          ))}
        </Timeline>

        <TipsHead>
          <TipsTitle>What happens where</TipsTitle>
          <TipsLead>
            Link out when you need mode details, AI deep dives, or pricing —
            not repeated here in full.
          </TipsLead>
        </TipsHead>
        <Tips>
          <Tip>
            <TipTitle>Modes</TipTitle>
            <TipText>
              Talking-head, rapid-cut, and ASMR choose the analysis path.
              Compare them on the Modes page.
            </TipText>
            <Button
              as={Link}
              to={ROUTES.modes}
              $variant="secondary"
              style={{ marginTop: '1rem' }}
            >
              View modes
            </Button>
          </Tip>
          <Tip>
            <TipTitle>AI services</TipTitle>
            <TipText>
              Speech, motion, captions, naming, and render run under the hood.
              See the Services page for job statuses and limits.
            </TipText>
            <Button
              as={Link}
              to={ROUTES.services}
              $variant="secondary"
              style={{ marginTop: '1rem' }}
            >
              View services
            </Button>
          </Tip>
          <Tip>
            <TipTitle>Plans & credits</TipTitle>
            <TipText>
              Monthly tiers control how many successful renders you get. Failed
              jobs do not use a credit.
            </TipText>
            <Button
              as={Link}
              to={ROUTES.pricing}
              $variant="secondary"
              style={{ marginTop: '1rem' }}
            >
              View pricing
            </Button>
          </Tip>
        </Tips>

        <CtaBand>
          <CtaCopy>
            <CtaTitle>Ready to run your first job?</CtaTitle>
            <CtaText>
              Create a {APP_NAME} account, pick a plan, upload a clip, and follow
              these steps end to end.
            </CtaText>
          </CtaCopy>
          <CtaActions>
            <LightButton type="button" onClick={() => openAuth('register')}>
              Get started free
            </LightButton>
            <GhostButton as={Link} to={ROUTES.features} $variant="secondary">
              Product features
            </GhostButton>
          </CtaActions>
        </CtaBand>
      </Container>
    </Page>
  )
}
