import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import heroBanner from '@/assets/landing/hero-banner.jpg'
import { Button, Container } from '@/components/ui'
import { useAuthModal } from '@/features/auth'
import { ROUTES } from '@/constants'

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(1.25rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const kenBurns = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`

const HeroRoot = styled.section`
  position: relative;
  isolation: isolate;
  min-height: min(100svh, 54rem);
  display: grid;
  align-items: center;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.white};
`

const Banner = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  /* Strong left column for copy; keep right devices readable */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        90deg,
        rgba(30, 27, 75, 0.94) 0%,
        rgba(30, 27, 75, 0.88) 28%,
        rgba(30, 27, 75, 0.55) 48%,
        rgba(30, 27, 75, 0.18) 68%,
        rgba(30, 27, 75, 0.28) 100%
      ),
      linear-gradient(
        180deg,
        rgba(30, 27, 75, 0.45) 0%,
        transparent 32%,
        rgba(30, 27, 75, 0.35) 100%
      );
  }
`

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Bias right so monitor UI clears the text column */
  object-position: 72% center;
  animation: ${kenBurns} 24s ease-out forwards;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    object-position: 62% center;
  }
`

const Content = styled(Container)`
  position: relative;
  z-index: 1;
  width: 100%;
  padding-top: 6.5rem;
  padding-bottom: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: 7.5rem;
    padding-bottom: 4rem;
  }
`

const Copy = styled.div`
  max-width: min(34rem, 100%);
`

const Brand = styled.h1`
  font-size: clamp(2.75rem, 8vw, 5.5rem);
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  letter-spacing: -0.055em;
  line-height: 0.92;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.space.md};
  text-shadow: 0 8px 32px rgba(30, 27, 75, 0.45);
  animation: ${fadeUp} 0.9s ${({ theme }) => theme.transitions.slow} both;
`

const Accent = styled.span`
  color: ${({ theme }) => theme.colors.primaryMuted};
`

const Headline = styled.p`
  max-width: 16ch;
  font-size: clamp(1.35rem, 2.6vw, 1.9rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: -0.03em;
  line-height: 1.25;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.space.md};
  text-shadow: 0 4px 20px rgba(30, 27, 75, 0.4);
  animation: ${fadeUp} 0.9s 0.08s ${({ theme }) => theme.transitions.slow} both;
`

const Support = styled.p`
  max-width: 30rem;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  margin-bottom: ${({ theme }) => theme.space.xl};
  animation: ${fadeUp} 0.9s 0.16s ${({ theme }) => theme.transitions.slow} both;
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  animation: ${fadeUp} 0.9s 0.24s ${({ theme }) => theme.transitions.slow} both;
`

const SecondaryCta = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.white};
  border-color: rgba(255, 255, 255, 0.45);

  &:hover {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.ink};
    border-color: ${({ theme }) => theme.colors.white};
  }
`

export function Hero() {
  const { openAuth } = useAuthModal()

  return (
    <HeroRoot>
      <Banner aria-hidden>
        <BannerImg src={heroBanner} alt="" />
      </Banner>
      <Content>
        <Copy>
          <Brand>
            Clip
            <Accent>AI</Accent>
          </Brand>
          <Headline>Raw footage in. Social-ready out.</Headline>
          <Support>
            AI edits your uploads for Reels, Shorts, and TikTok — talking-head
            jump cuts, rapid pacing, or ASMR/unboxing, then download a finished
            MP4.
          </Support>
          <Actions>
            <Button type="button" onClick={() => openAuth('register')}>
              Start editing
            </Button>
            <SecondaryCta as={Link} to={ROUTES.how} $variant="secondary">
              See how it works
            </SecondaryCta>
          </Actions>
        </Copy>
      </Content>
    </HeroRoot>
  )
}
