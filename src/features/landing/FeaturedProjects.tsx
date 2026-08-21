import styled from 'styled-components'
import project1 from '@/assets/landing/project-1.jpg'
import project2 from '@/assets/landing/project-2.jpg'
import project3 from '@/assets/landing/project-3.jpg'
import project4 from '@/assets/landing/project-4.jpg'
import project5 from '@/assets/landing/project-5.jpg'
import { Container } from '@/components/ui'

const PROJECTS = [
  { src: project1, title: 'Talking-head polish', tag: 'Speech mode' },
  { src: project2, title: 'Urban rapid-cut', tag: 'Reels pacing' },
  { src: project3, title: 'Creator desk draft', tag: 'Upload ready' },
  { src: project4, title: 'Podcast to Shorts', tag: 'Captions on' },
  { src: project5, title: 'Product unboxing', tag: 'ASMR mode' },
] as const

const Section = styled.section`
  padding: ${({ theme }) => `${theme.space['3xl']} 0 ${theme.space['4xl']}`};
`

const Header = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
  }
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
  font-size: clamp(2rem, 4.5vw, 3.2rem);
`

const Hint = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 28ch;
`

const Scroller = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(16rem, 22rem);
  gap: ${({ theme }) => theme.space.md};
  overflow-x: auto;
  padding: 0 ${({ theme }) => theme.space.lg} ${({ theme }) => theme.space.md};
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding-inline: max(1.5rem, calc((100vw - 1240px) / 2 + 1.5rem));
  }
`

const Card = styled.article`
  position: relative;
  scroll-snap-align: start;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  min-height: 26rem;
  border: 1px solid ${({ theme }) => theme.colors.border};

  img {
    width: 100%;
    height: 100%;
    min-height: 26rem;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 35%,
      rgba(10, 10, 11, 0.85) 100%
    );
  }

  &:hover img {
    transform: scale(1.05);
  }
`

const Meta = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  padding: ${({ theme }) => theme.space.xl};
`

const Tag = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Name = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
`

export function FeaturedProjects() {
  return (
    <Section aria-label="Featured editing styles">
      <Header>
        <div>
          <Eyebrow>Featured styles</Eyebrow>
          <Title>Cuts that feel intentional</Title>
        </div>
        <Hint>
          Browse the looks ClipAI is built for — speech, energy, and product
          moments.
        </Hint>
      </Header>
      <Scroller>
        {PROJECTS.map((project) => (
          <Card key={project.title}>
            <img src={project.src} alt="" />
            <Meta>
              <Tag>{project.tag}</Tag>
              <Name>{project.title}</Name>
            </Meta>
          </Card>
        ))}
      </Scroller>
    </Section>
  )
}
