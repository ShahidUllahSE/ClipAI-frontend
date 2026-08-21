import styled, { keyframes } from 'styled-components'
import studio from '@/assets/landing/studio.jpg'
import creator from '@/assets/landing/creator.jpg'
import phone from '@/assets/landing/phone.jpg'
import film from '@/assets/landing/film.jpg'
import cta from '@/assets/landing/cta.jpg'
import { Container } from '@/components/ui'

const PHOTOS = [
  { src: studio, label: 'Studio shoots' },
  { src: creator, label: 'Creator desks' },
  { src: phone, label: 'Phone-first drafts' },
  { src: film, label: 'Timeline polish' },
  { src: cta, label: 'Social exports' },
] as const

const drift = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`

const Section = styled.section`
  padding: ${({ theme }) => `0 0 ${theme.space['3xl']}`};
  overflow: hidden;
`

const Intro = styled(Container)`
  margin-bottom: ${({ theme }) => theme.space.xl};
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
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  max-width: 18ch;
`

const TrackWrap = styled.div`
  mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
`

const Track = styled.div`
  display: flex;
  width: max-content;
  gap: ${({ theme }) => theme.space.md};
  padding: 0 ${({ theme }) => theme.space.lg};
  animation: ${drift} 42s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`

const Frame = styled.figure`
  position: relative;
  flex: 0 0 auto;
  width: min(72vw, 22rem);
  height: 15.5rem;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  figcaption {
    position: absolute;
    left: 0.9rem;
    bottom: 0.9rem;
    padding: 0.35rem 0.65rem;
    border-radius: ${({ theme }) => theme.radii.sm};
    background: rgba(255, 255, 255, 0.92);
    color: ${({ theme }) => theme.colors.ink};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`

export function Gallery() {
  const loop = [...PHOTOS, ...PHOTOS]

  return (
    <Section aria-label="Creator moments">
      <Intro>
        <Eyebrow>Made for real shoots</Eyebrow>
        <Title>From quiet unboxings to high-energy cuts</Title>
      </Intro>
      <TrackWrap>
        <Track>
          {loop.map((photo, index) => (
            <Frame key={`${photo.label}-${index}`}>
              <img src={photo.src} alt="" />
              <figcaption>{photo.label}</figcaption>
            </Frame>
          ))}
        </Track>
      </TrackWrap>
    </Section>
  )
}
