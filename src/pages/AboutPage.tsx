import styled from 'styled-components'
import { Link } from 'react-router-dom'
import heroBanner from '@/assets/landing/hero-banner.jpg'
import modeTalking from '@/assets/landing/mode-talking.jpg'
import modeAsmr from '@/assets/landing/mode-asmr.jpg'
import stepDownload from '@/assets/landing/step-download.jpg'
import { Button, Container } from '@/components/ui'
import { useAuthModal } from '@/features/auth'
import { APP_NAME, ROUTES } from '@/constants'

const VALUES = [
  {
    title: 'Simple by design',
    text: 'Upload, pick a mode, wait for status, download. No manual timeline or NLE learning curve.',
  },
  {
    title: 'Fair credits',
    text: 'Only successful renders use an edit. Failed jobs do not reduce your balance.',
  },
  {
    title: 'Social-native output',
    text: 'Export 9:16, 1:1, or 16:9 MP4 up to 1080p for Reels, Shorts, and TikTok.',
  },
  {
    title: 'Speech and silent clips',
    text: 'Talking-head, rapid-cut, and ASMR/unboxing so dialogue and product footage both work.',
  },
] as const

const AUDIENCE = [
  {
    title: 'Face-cam creators',
    text: 'Tighten talking-head clips with silence removal, jump cuts, and optional captions.',
    image: modeTalking,
  },
  {
    title: 'Short-form publishers',
    text: 'Ship Reels and Shorts with rapid-cut pacing without sitting in an edit suite.',
    image: heroBanner,
  },
  {
    title: 'Product & ASMR',
    text: 'Keep reveals and texture sounds when there is little or no speech to transcribe.',
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
      ellipse 75% 40% at 0% 0%,
      ${({ theme }) => theme.colors.primarySoft} 0%,
      transparent 55%
    ),
    radial-gradient(
      ellipse 50% 35% at 100% 20%,
      rgba(124, 58, 237, 0.06) 0%,
      transparent 50%
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
  font-size: clamp(2.2rem, 4vw, 3.25rem);
  letter-spacing: -0.035em;
  line-height: 1.08;
  margin-bottom: ${({ theme }) => theme.space.md};
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.65;
  margin-bottom: ${({ theme }) => theme.space.xl};
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.md};
`

const HeroMedia = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  aspect-ratio: 16 / 11;
  min-height: 15rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 70% center;
    display: block;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      rgba(30, 27, 75, 0.3) 0%,
      transparent 50%
    );
    pointer-events: none;
  }
`

const Story = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.space['2xl']};
  margin-bottom: ${({ theme }) => theme.space['3xl']};
  padding: ${({ theme }) => theme.space['2xl']};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.white};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
    align-items: center;
  }
`

const StoryLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primaryMuted};
  margin-bottom: ${({ theme }) => theme.space.md};
`

const StoryTitle = styled.h2`
  font-size: clamp(1.6rem, 3vw, 2.15rem);
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.space.md};
  letter-spacing: -0.02em;
`

const StoryText = styled.p`
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  line-height: 1.65;
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.space.md};

  &:last-child {
    margin-bottom: 0;
  }
`

const StoryMedia = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  aspect-ratio: 4 / 3;
  background: rgba(255, 255, 255, 0.06);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const Block = styled.section`
  margin-bottom: ${({ theme }) => theme.space['3xl']};
`

const BlockHead = styled.div`
  max-width: 34rem;
  margin-bottom: ${({ theme }) => theme.space['2xl']};
`

const BlockTitle = styled.h2`
  font-size: clamp(1.6rem, 3vw, 2.15rem);
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const BlockLead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
`

const ValueGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const ValueCard = styled.article`
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  transition:
    transform ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`

const ValueTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const ValueText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
`

const AudienceGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const AudienceCard = styled.article`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  transition:
    transform ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:hover img {
    transform: scale(1.05);
  }
`

const AudiencePhoto = styled.div`
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.colors.elevated};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
`

const AudienceBody = styled.div`
  padding: ${({ theme }) => theme.space.xl};
`

const AudienceTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const AudienceText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.55;
`

const Links = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space['3xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const LinkCard = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.elevated};
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryMuted};
    transform: translateY(-2px);
  }
`

const LinkLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`

const LinkTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.ink};
`

const LinkText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.45;
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

export function AboutPage() {
  const { openAuth } = useAuthModal()

  return (
    <Page>
      <Container>
        <Hero>
          <HeroCopy>
            <Eyebrow>About {APP_NAME}</Eyebrow>
            <Title>AI video editing for creators who ship to social</Title>
            <Lead>
              {APP_NAME} is a web app that turns raw uploads into social-ready
              MP4s — speech-aware cuts, rapid pacing, or product/ASMR — without
              training custom AI models or learning a timeline editor.
            </Lead>
            <Actions>
              <Button type="button" onClick={() => openAuth('register')}>
                Get started
              </Button>
              <Button as={Link} to={ROUTES.how} $variant="secondary">
                How it works
              </Button>
            </Actions>
          </HeroCopy>
          <HeroMedia>
            <img
              src={heroBanner}
              alt="Creator workspace for AI social video editing"
            />
          </HeroMedia>
        </Hero>

        <Story>
          <div>
            <StoryLabel>Why we built it</StoryLabel>
            <StoryTitle>
              Publish more, edit less — without giving up control of the cut
            </StoryTitle>
            <StoryText>
              Short-form creators need speed more than a complex suite. {APP_NAME}{' '}
              packages third-party speech, vision, and render APIs into a clear
              product path: account, plan, upload, mode, process, preview,
              download.
            </StoryText>
            <StoryText>
              The MVP runs in the browser on desktop, laptop, tablet, and mobile
              web — not as a native app — so you can edit from the same devices
              you already publish from.
            </StoryText>
          </div>
          <StoryMedia>
            <img src={stepDownload} alt="Finished export ready to download" />
          </StoryMedia>
        </Story>

        <Block>
          <BlockHead>
            <BlockTitle>What we stand for</BlockTitle>
            <BlockLead>
              Principles that shape product decisions — separate from the full
              feature and services catalogs.
            </BlockLead>
          </BlockHead>
          <ValueGrid>
            {VALUES.map((item) => (
              <ValueCard key={item.title}>
                <ValueTitle>{item.title}</ValueTitle>
                <ValueText>{item.text}</ValueText>
              </ValueCard>
            ))}
          </ValueGrid>
        </Block>

        <Block>
          <BlockHead>
            <BlockTitle>Built for how you shoot</BlockTitle>
            <BlockLead>
              Different creators, different signals — speech, motion, or product
              soundscapes.
            </BlockLead>
          </BlockHead>
          <AudienceGrid>
            {AUDIENCE.map((item) => (
              <AudienceCard key={item.title}>
                <AudiencePhoto>
                  <img src={item.image} alt="" loading="lazy" />
                </AudiencePhoto>
                <AudienceBody>
                  <AudienceTitle>{item.title}</AudienceTitle>
                  <AudienceText>{item.text}</AudienceText>
                </AudienceBody>
              </AudienceCard>
            ))}
          </AudienceGrid>
        </Block>

        <Block>
          <BlockHead>
            <BlockTitle>Explore the product</BlockTitle>
            <BlockLead>
              Deep detail lives on its own pages so About stays the story, not a
              copy of every section.
            </BlockLead>
          </BlockHead>
          <Links>
            <LinkCard to={ROUTES.modes}>
              <LinkLabel>Modes</LinkLabel>
              <LinkTitle>How you shoot</LinkTitle>
              <LinkText>
                Talking-head, rapid-cut, and ASMR presets compared in depth.
              </LinkText>
            </LinkCard>
            <LinkCard to={ROUTES.services}>
              <LinkLabel>Services</LinkLabel>
              <LinkTitle>What the AI does</LinkTitle>
              <LinkText>
                Analysis, statuses, deliverables, and credit rules under the
                hood.
              </LinkText>
            </LinkCard>
            <LinkCard to={ROUTES.pricing}>
              <LinkLabel>Pricing</LinkLabel>
              <LinkTitle>Plans & packs</LinkTitle>
              <LinkText>
                Monthly edit volume from Basic to Unlimited under fair use.
              </LinkText>
            </LinkCard>
          </Links>
        </Block>

        <CtaBand>
          <CtaCopy>
            <CtaTitle>Start editing with {APP_NAME}</CtaTitle>
            <CtaText>
              Create an account, pick a plan, and turn your next raw clip into a
              finished social export.
            </CtaText>
          </CtaCopy>
          <CtaActions>
            <Button type="button" onClick={() => openAuth('register')}>
              Create account
            </Button>
            <Button as={Link} to={ROUTES.features} $variant="secondary">
              See features
            </Button>
          </CtaActions>
        </CtaBand>
      </Container>
    </Page>
  )
}
