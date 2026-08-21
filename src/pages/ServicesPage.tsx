import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button, Container } from '@/components/ui'
import { useAuthModal } from '@/features/auth'
import {
  AI_SERVICES,
  APP_NAME,
  DELIVERABLE_LIMITS,
  JOB_STATUSES,
  ROUTES,
  SERVICE_MODE_MAP,
} from '@/constants'
import serviceSpeech from '@/assets/landing/service-speech.jpg'
import serviceMotion from '@/assets/landing/service-motion.jpg'
import serviceAsmr from '@/assets/landing/service-asmr.jpg'
import serviceCaptions from '@/assets/landing/service-captions.jpg'
import serviceNaming from '@/assets/landing/service-naming.jpg'
import serviceRender from '@/assets/landing/service-render.jpg'

const SERVICE_IMAGES = {
  speech: serviceSpeech,
  motion: serviceMotion,
  asmr: serviceAsmr,
  captions: serviceCaptions,
  naming: serviceNaming,
  render: serviceRender,
} as const

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

const Matrix = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const MatrixCard = styled.article`
  padding: ${({ theme }) => theme.space.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
`

const MatrixMode = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.xs};
`

const MatrixRole = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.space.md};
`

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
`

const Tag = styled.li`
  padding: 0.35rem 0.7rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.ink};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`

const DiveList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.xl};
`

const DiveRow = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};
  align-items: center;
  padding: ${({ theme }) => theme.space.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 14rem 1fr;
    gap: ${({ theme }) => theme.space.xl};
    padding: ${({ theme }) => theme.space.xl};

    &:nth-child(even) {
      direction: rtl;

      > * {
        direction: ltr;
      }
    }
  }
`

const DivePhoto = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.colors.elevated};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const DiveBody = styled.div``

const DiveIndex = styled.span`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.space.sm};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.primary};
`

const DiveTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const DiveHow = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.65;
  margin-bottom: ${({ theme }) => theme.space.md};
`

const DivePoints = styled.ul`
  display: grid;
  gap: ${({ theme }) => theme.space.sm};
`

const DivePoint = styled.li`
  position: relative;
  padding-left: 1rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.45;

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

const StatusGrid = styled.ol`
  display: grid;
  gap: ${({ theme }) => theme.space.md};
  list-style: none;
  padding: 0;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const StatusCard = styled.li`
  padding: ${({ theme }) => theme.space.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surface};
`

const StatusName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const StatusText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
`

const LimitsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const LimitCard = styled.article`
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.white};
`

const LimitTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const LimitText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  line-height: 1.55;
`

const CtaBand = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xl};
  padding: ${({ theme }) => theme.space['2xl']};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};

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
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const CtaText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
`

const CtaActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
  flex-shrink: 0;
`

export function ServicesPage() {
  const { openAuth } = useAuthModal()

  return (
    <Page>
      <Container>
        <Hero>
          <Eyebrow>AI services</Eyebrow>
          <Title>How the {APP_NAME} engine processes every job</Title>
          <Lead>
            This page is about what the AI does under the hood — which
            capabilities pair with each mode, how a job moves through statuses,
            and what comes out the other side. Modes and toggles live on
            Features.
          </Lead>
          <Actions>
            <Button type="button" onClick={() => openAuth('register')}>
              Start editing
            </Button>
            <Button as={Link} to={ROUTES.features} $variant="secondary">
              Product features
            </Button>
          </Actions>
        </Hero>

        <Block>
          <BlockHeader>
            <BlockTitle>Which services run for each mode</BlockTitle>
            <BlockLead>
              Modes pick the analysis path. Shared services finish naming and
              export for every job.
            </BlockLead>
          </BlockHeader>
          <Matrix>
            {SERVICE_MODE_MAP.map((row) => (
              <MatrixCard key={row.mode}>
                <MatrixMode>{row.mode}</MatrixMode>
                <MatrixRole>{row.role}</MatrixRole>
                <TagList>
                  {row.services.map((name) => (
                    <Tag key={name}>{name}</Tag>
                  ))}
                </TagList>
              </MatrixCard>
            ))}
          </Matrix>
        </Block>

        <Block>
          <BlockHeader>
            <BlockTitle>Deep dive: input → AI → result</BlockTitle>
            <BlockLead>
              Six processing capabilities. For controls you turn on per project,
              see Features.
            </BlockLead>
          </BlockHeader>
          <DiveList>
            {AI_SERVICES.map((service, index) => (
              <DiveRow key={service.id}>
                <DivePhoto>
                  <img
                    src={SERVICE_IMAGES[service.id]}
                    alt=""
                    loading="lazy"
                  />
                </DivePhoto>
                <DiveBody>
                  <DiveIndex>0{index + 1}</DiveIndex>
                  <DiveTitle>{service.title}</DiveTitle>
                  <DiveHow>{service.how}</DiveHow>
                  <DivePoints>
                    {service.details.map((point) => (
                      <DivePoint key={point}>{point}</DivePoint>
                    ))}
                  </DivePoints>
                </DiveBody>
              </DiveRow>
            ))}
          </DiveList>
        </Block>

        <Block>
          <BlockHeader>
            <BlockTitle>Job lifecycle & status meaning</BlockTitle>
            <BlockLead>
              Follow a project from upload to completed — or failed with a fair
              retry path.
            </BlockLead>
          </BlockHeader>
          <StatusGrid>
            {JOB_STATUSES.map((item) => (
              <StatusCard key={item.status}>
                <StatusName>{item.status}</StatusName>
                <StatusText>{item.detail}</StatusText>
              </StatusCard>
            ))}
          </StatusGrid>
        </Block>

        <Block>
          <BlockHeader>
            <BlockTitle>Deliverables & limits</BlockTitle>
            <BlockLead>
              What goes in, what comes out, and how credits work on success.
            </BlockLead>
          </BlockHeader>
          <LimitsGrid>
            {DELIVERABLE_LIMITS.map((item) => (
              <LimitCard key={item.title}>
                <LimitTitle>{item.title}</LimitTitle>
                <LimitText>{item.text}</LimitText>
              </LimitCard>
            ))}
          </LimitsGrid>
        </Block>

        <CtaBand>
          <CtaCopy>
            <CtaTitle>Ready to process a clip?</CtaTitle>
            <CtaText>
              Create an account and pick a plan — or review modes and toggles on
              the features page.
            </CtaText>
          </CtaCopy>
          <CtaActions>
            <Button type="button" onClick={() => openAuth('register')}>
              Get started free
            </Button>
            <Button as={Link} to={ROUTES.pricing} $variant="secondary">
              View pricing
            </Button>
          </CtaActions>
        </CtaBand>
      </Container>
    </Page>
  )
}
