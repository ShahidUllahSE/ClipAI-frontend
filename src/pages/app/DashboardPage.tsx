import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { Button } from '@/components/ui'
import { useAuth } from '@/context/AuthContext'
import { useProjects } from '@/context/ProjectsContext'
import { APP_NAME, PLANS, ROUTES } from '@/constants'
import { PLAN_EDIT_QUOTA } from '@/types/app'
import {
  formatDuration,
  modeLabel,
  statusTone,
} from '@/utils/video'

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(0.6rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Page = styled.div`
  animation: ${fadeUp} 0.45s ease both;
`

const Hero = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  padding: 1.25rem 1.35rem;
  margin-bottom: 1.15rem;
  border-radius: 1.1rem;
  background:
    radial-gradient(circle at 100% 0%, rgba(124, 58, 237, 0.5), transparent 42%),
    radial-gradient(circle at 0% 100%, rgba(167, 139, 250, 0.22), transparent 40%),
    linear-gradient(145deg, #1e1b4b, #15132f 60%, #12101f);
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(196, 181, 253, 0.18);
  box-shadow: 0 16px 40px rgba(30, 27, 75, 0.18);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1.35rem 1.5rem;
  }
`

const HeroCopy = styled.div`
  max-width: 32rem;
  position: relative;
  z-index: 1;
`

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primaryMuted};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Title = styled.h1`
  font-size: clamp(1.45rem, 2.8vw, 1.95rem);
  letter-spacing: -0.035em;
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.4rem;
`

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  line-height: 1.5;
  font-size: 0.9rem;
  margin-bottom: 0.85rem;
`

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
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
  background: rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.colors.white};
  border-color: rgba(255, 255, 255, 0.35);

  &:hover {
    background: rgba(255, 255, 255, 0.14);
    border-color: rgba(255, 255, 255, 0.55);
  }
`

const HeroPanel = styled.div`
  position: relative;
  z-index: 1;
  min-width: min(100%, 14.5rem);
  padding: 1rem 1.1rem;
  border-radius: 0.9rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);
`

const PanelLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
  margin-bottom: ${({ theme }) => theme.space.xs};
`

const PanelValue = styled.p`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.space.md};
`

const CreditBar = styled.div`
  height: 0.4rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: rgba(255, 255, 255, 0.15);
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const CreditFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => `${Math.min(100, Math.max(0, $pct))}%`};
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primaryMuted},
    ${({ theme }) => theme.colors.primary}
  );
`

const PanelMeta = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textOnDarkMuted};
`

const Stats = styled.div`
  display: grid;
  gap: 0.65rem;
  margin-bottom: 1.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Stat = styled.article<{ $accent?: boolean }>`
  padding: 0.9rem 1rem;
  border-radius: 0.9rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $accent }) =>
    $accent
      ? `linear-gradient(145deg, ${theme.colors.primarySoft}, ${theme.colors.surface})`
      : theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`

const StatTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.55rem;
`

const StatLabel = styled.p`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`

const StatIcon = styled.span`
  display: grid;
  place-items: center;
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.7rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-family: ${({ theme }) => theme.fonts.mono};
`

const StatValue = styled.p`
  font-size: clamp(1.35rem, 2.4vw, 1.7rem);
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 0.25rem;
`

const StatHint = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`

const SectionHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.lg};
`

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  letter-spacing: -0.02em;
`

const SectionLead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.space.xs};
`

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ProjectCard = styled(Link)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition:
    transform ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.primaryMuted};
  }
`

const Thumb = styled.div<{ $mode: string }>`
  position: relative;
  aspect-ratio: 16 / 10;
  background: ${({ $mode }) => {
    if ($mode === 'talking-head')
      return `linear-gradient(135deg, #1e1b4b 0%, #5b21b6 55%, #7c3aed 100%)`
    if ($mode === 'rapid-cut')
      return `linear-gradient(135deg, #312e81 0%, #7c3aed 50%, #a78bfa 100%)`
    return `linear-gradient(135deg, #1e1b4b 0%, #4c1d95 45%, #c4b5fd 100%)`
  }};
  overflow: hidden;

  video,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const ThumbOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 40%,
    rgba(30, 27, 75, 0.55) 100%
  );
  pointer-events: none;
`

const ThumbProcessing = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
  background: rgba(15, 15, 20, 0.55);
  backdrop-filter: blur(2px);
  color: #f8fafc;
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.02em;

  &::before {
    content: '';
    width: 1.35rem;
    height: 1.35rem;
    margin-bottom: 0.45rem;
    border-radius: 50%;
    border: 2px solid rgba(248, 250, 252, 0.25);
    border-top-color: #c4b5fd;
    animation: thumbSpin 0.85s linear infinite;
  }

  @keyframes thumbSpin {
    to {
      transform: rotate(360deg);
    }
  }
`

const ThumbBadge = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.space.md};
  left: ${({ theme }) => theme.space.md};
  z-index: 1;
  padding: 0.3rem 0.6rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(30, 27, 75, 0.72);
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  backdrop-filter: blur(6px);
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.lg};
  flex: 1;
`

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.sm};
`

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: -0.02em;
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.ink};
`

const CardFile = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
  margin-top: auto;
  padding-top: ${({ theme }) => theme.space.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`

const Badge = styled.span<{ $tone: 'neutral' | 'active' | 'ok' | 'bad' }>`
  display: inline-flex;
  flex-shrink: 0;
  padding: 0.28rem 0.55rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.7rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  background: ${({ theme, $tone }) => {
    if ($tone === 'ok') return 'rgba(22, 163, 74, 0.12)'
    if ($tone === 'bad') return 'rgba(220, 38, 38, 0.1)'
    if ($tone === 'active') return theme.colors.primarySoft
    return theme.colors.elevated
  }};
  color: ${({ theme, $tone }) => {
    if ($tone === 'ok') return theme.colors.success
    if ($tone === 'bad') return theme.colors.error
    if ($tone === 'active') return theme.colors.primary
    return theme.colors.textMuted
  }};
`

const Empty = styled.div`
  display: grid;
  place-items: center;
  text-align: center;
  padding: ${({ theme }) => `${theme.space['3xl']} ${theme.space.xl}`};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background:
    radial-gradient(ellipse 60% 80% at 50% 0%, ${({ theme }) => theme.colors.primarySoft}, transparent 60%),
    ${({ theme }) => theme.colors.surface};
`

const EmptyMark = styled.div`
  display: grid;
  place-items: center;
  width: 4rem;
  height: 4rem;
  margin-bottom: ${({ theme }) => theme.space.lg};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const EmptyTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const EmptyText = styled.p`
  max-width: 26rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space.xl};
  line-height: 1.55;
`

const Loading = styled.div`
  padding: ${({ theme }) => theme.space['2xl']};
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Quick = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space['2xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const QuickCard = styled(Link)`
  display: block;
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryMuted};
    transform: translateY(-2px);
  }
`

const QuickLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const QuickTitle = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.space.xs};
`

const QuickText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.45;
`

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export function DashboardPage() {
  const { user } = useAuth()
  const { projects, loading } = useProjects()
  const plan = PLANS.find((p) => p.id === user?.planId)
  const planName = plan?.name ?? '—'
  const quota = user ? PLAN_EDIT_QUOTA[user.planId] : 50
  const remaining = user?.remainingEdits ?? 0
  const creditPct =
    user?.planId === 'unlimited'
      ? 100
      : quota > 0
        ? (remaining / quota) * 100
        : 0

  const processing = projects.filter((p) =>
    ['Queued', 'Analyzing', 'Preparing edit', 'Rendering', 'Uploading'].includes(
      p.status,
    ),
  ).length
  const completed = projects.filter((p) => p.status === 'Completed').length
  const failed = projects.filter((p) => p.status === 'Failed').length
  const firstName = user?.name?.split(' ')[0]

  return (
    <Page>
      <Hero>
        <HeroCopy>
          <Eyebrow>{APP_NAME} studio</Eyebrow>
          <Title>
            {greeting()}
            {firstName ? `, ${firstName}` : ''}
          </Title>
          <Lead>
            Upload raw footage, pick a mode, and let AI deliver social-ready
            cuts. Your plan, credits, and projects live here.
          </Lead>
          <HeroActions>
            <LightButton as={Link} to={ROUTES.newProject}>
              Upload video
            </LightButton>
            <GhostButton as={Link} to={ROUTES.subscription} $variant="secondary">
              Manage plan
            </GhostButton>
          </HeroActions>
        </HeroCopy>
        <HeroPanel>
          <PanelLabel>Current plan</PanelLabel>
          <PanelValue>{planName}</PanelValue>
          <PanelLabel>Edit credits left</PanelLabel>
          <CreditBar>
            <CreditFill $pct={creditPct} />
          </CreditBar>
          <PanelMeta>
            {user?.planId === 'unlimited'
              ? 'Unlimited under fair use'
              : `${remaining} of ${quota} this cycle`}
            {' · '}
            <span style={{ textTransform: 'capitalize' }}>
              {user?.billingStatus ?? 'active'}
            </span>
          </PanelMeta>
        </HeroPanel>
      </Hero>

      <Stats>
        <Stat $accent>
          <StatTop>
            <StatLabel>Credits left</StatLabel>
            <StatIcon>CR</StatIcon>
          </StatTop>
          <StatValue>
            {user?.planId === 'unlimited' ? '∞' : remaining}
          </StatValue>
          <StatHint>
            {user?.planId === 'unlimited'
              ? 'Unlimited plan'
              : 'Used only after successful renders'}
          </StatHint>
        </Stat>
        <Stat>
          <StatTop>
            <StatLabel>Processing</StatLabel>
            <StatIcon>…</StatIcon>
          </StatTop>
          <StatValue>{processing}</StatValue>
          <StatHint>Jobs in the pipeline right now</StatHint>
        </Stat>
        <Stat>
          <StatTop>
            <StatLabel>Completed</StatLabel>
            <StatIcon>OK</StatIcon>
          </StatTop>
          <StatValue>{completed}</StatValue>
          <StatHint>Ready to preview & download</StatHint>
        </Stat>
        <Stat>
          <StatTop>
            <StatLabel>Failed</StatLabel>
            <StatIcon>!</StatIcon>
          </StatTop>
          <StatValue>{failed}</StatValue>
          <StatHint>Retry without losing a credit</StatHint>
        </Stat>
      </Stats>

      <SectionHead>
        <div>
          <SectionTitle>Your projects</SectionTitle>
          <SectionLead>
            {projects.length === 0
              ? 'No projects yet — start with a raw upload.'
              : `${projects.length} project${projects.length === 1 ? '' : 's'} in your library`}
          </SectionLead>
        </div>
        {projects.length > 0 && (
          <Button as={Link} to={ROUTES.newProject} $variant="secondary">
            New project
          </Button>
        )}
      </SectionHead>

      {loading ? (
        <Loading>Loading your projects…</Loading>
      ) : projects.length === 0 ? (
        <Empty>
          <EmptyMark>01</EmptyMark>
          <EmptyTitle>Your first cut is one upload away</EmptyTitle>
          <EmptyText>
            Drop MP4, MOV, or WebM footage, choose talking-head, rapid-cut, or
            ASMR, and {APP_NAME} will process a social-ready export.
          </EmptyText>
          <Button as={Link} to={ROUTES.newProject}>
            Create your first project
          </Button>
        </Empty>
      ) : (
        <Grid>
          {projects.map((project) => (
            <ProjectCard key={project.id} to={ROUTES.project(project.id)}>
              <Thumb $mode={project.mode}>
                {project.previewUrl ? (
                  <video src={project.previewUrl} muted playsInline preload="metadata" />
                ) : null}
                <ThumbOverlay />
                {['Queued', 'Analyzing', 'Preparing edit', 'Rendering', 'Uploading'].includes(
                  project.status,
                ) && (
                  <ThumbProcessing>
                    AI editing…
                  </ThumbProcessing>
                )}
                <ThumbBadge>{modeLabel(project.mode)}</ThumbBadge>
              </Thumb>
              <CardBody>
                <CardTop>
                  <CardTitle>
                    {project.generatedTitle || project.title}
                  </CardTitle>
                  <Badge $tone={statusTone(project.status)}>
                    {project.status}
                  </Badge>
                </CardTop>
                <CardFile title={project.originalFilename}>
                  {project.originalFilename}
                </CardFile>
                <CardMeta>
                  <span>{formatDuration(project.durationSeconds)}</span>
                  <span>·</span>
                  <span>
                    {new Date(project.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span>·</span>
                  <span>{project.options.aspectRatio}</span>
                </CardMeta>
              </CardBody>
            </ProjectCard>
          ))}
        </Grid>
      )}

      <Quick>
        <QuickCard to={ROUTES.newProject}>
          <QuickLabel>Create</QuickLabel>
          <QuickTitle>Upload & edit</QuickTitle>
          <QuickText>Start a new job with mode and export options.</QuickText>
        </QuickCard>
        <QuickCard to={ROUTES.subscription}>
          <QuickLabel>Plan</QuickLabel>
          <QuickTitle>Credits & billing</QuickTitle>
          <QuickText>Upgrade, downgrade, or check remaining edits.</QuickText>
        </QuickCard>
        <QuickCard to={ROUTES.account}>
          <QuickLabel>Account</QuickLabel>
          <QuickTitle>Profile & password</QuickTitle>
          <QuickText>Update name, email, and sign-in security.</QuickText>
        </QuickCard>
      </Quick>
    </Page>
  )
}
