import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import {
  AiProcessingOverlay,
  isProjectProcessing,
} from '@/components/app/AiProcessingOverlay'
import { EditResultsPanel } from '@/components/app/EditResultsPanel'
import { Button, ErrorText, HelpText, Input } from '@/components/ui'
import { useProjects } from '@/context/ProjectsContext'
import { ROUTES } from '@/constants'
import {
  formatBytes,
  formatDuration,
  modeLabel,
  optionsSummary,
  statusTone,
} from '@/utils/video'

const fade = keyframes`
  from { opacity: 0; transform: translateY(0.35rem); }
  to { opacity: 1; transform: translateY(0); }
`

const Page = styled.div`
  animation: ${fade} 0.35s ease both;
  max-width: 72rem;
`

const TopBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1rem;
  margin-bottom: 1rem;
`

const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const HeaderBlock = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const TitleWrap = styled.div`
  min-width: 0;
  flex: 1;
`

const Title = styled.h1`
  margin: 0;
  font-size: clamp(1.25rem, 2.4vw, 1.65rem);
  letter-spacing: -0.03em;
  line-height: 1.25;
  overflow-wrap: anywhere;
`

const MetaLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem 0.65rem;
  margin-top: 0.45rem;
`

const Badge = styled.span<{ $tone: 'neutral' | 'active' | 'ok' | 'bad' }>`
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
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

const Chip = styled.span`
  display: inline-flex;
  padding: 0.18rem 0.5rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.elevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const HeaderActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const ProcessBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.85rem;
  padding: 0.65rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.primaryMuted};
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8125rem;
  font-weight: 650;
`

const PulseDot = styled.span`
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  animation: processPulse 1.4s ease-out infinite;

  @keyframes processPulse {
    0% {
      box-shadow: 0 0 0 0 rgba(109, 40, 217, 0.45);
    }
    70% {
      box-shadow: 0 0 0 0.45rem rgba(109, 40, 217, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(109, 40, 217, 0);
    }
  }
`

const Studio = styled.div`
  display: grid;
  gap: 0.85rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: minmax(0, 1.05fr) minmax(17rem, 0.95fr);
    align-items: start;
  }
`

const Panel = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`

const PanelHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.7rem 0.9rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.elevated};
`

const PanelTitle = styled.h2`
  margin: 0;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

const PanelBody = styled.div`
  padding: 0.85rem;
`

const PreviewStage = styled.div`
  display: grid;
  place-items: center;
  padding: 0.75rem;
  background:
    radial-gradient(ellipse 70% 55% at 50% 40%, rgba(124, 58, 237, 0.12), transparent 65%),
    #0f0f14;
`

const VideoBox = styled.div`
  position: relative;
  width: min(100%, 18.5rem);
  overflow: hidden;
  border-radius: 0.85rem;
  background: #000;
  aspect-ratio: 9 / 16;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  video[data-dimmed='true'] {
    filter: blur(1.5px) brightness(0.55) saturate(0.85);
    transform: scale(1.02);
  }
`

const PreviewFoot = styled.p`
  margin: 0.65rem 0 0;
  text-align: center;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const SideStack = styled.div`
  display: grid;
  gap: 0.85rem;
`

const Facts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`

const Fact = styled.div`
  padding: 0.55rem 0.65rem;
  border-radius: 0.65rem;
  background: ${({ theme }) => theme.colors.elevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  min-width: 0;
`

const FactLabel = styled.p`
  margin: 0;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

const FactValue = styled.p`
  margin: 0.2rem 0 0;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const TitleField = styled.label`
  display: grid;
  gap: 0.35rem;
  margin-top: 0.75rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};

  input {
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: none;
    letter-spacing: 0;
  }
`

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.75rem;
`

const OptionChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`

const OptionChip = styled.span`
  display: inline-flex;
  padding: 0.28rem 0.55rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
  background: ${({ theme }) => theme.colors.primarySoft};
  border: 1px solid ${({ theme }) => theme.colors.primaryMuted};
`

export function ProjectDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const {
    get,
    updateTitle,
    remove,
    process,
    retry,
    processingIds,
    refresh,
  } = useProjects()
  const project = get(id)
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const processing =
    processingIds.has(id) || isProjectProcessing(project?.status ?? '')

  useEffect(() => {
    void refresh()
  }, [refresh, id])

  useEffect(() => {
    if (project) setTitle(project.generatedTitle || project.title)
  }, [project])

  if (!project) {
    return (
      <Page>
        <Title>Project not found</Title>
        <Button as={Link} to={ROUTES.dashboard} style={{ marginTop: '1rem' }}>
          Back to dashboard
        </Button>
      </Page>
    )
  }

  const tone = statusTone(project.status)
  const mediaUrl =
    project.status === 'Completed' && project.outputUrl
      ? project.outputUrl
      : project.previewUrl || project.outputUrl
  const removedSeconds =
    typeof project.analysis?.removedSeconds === 'number'
      ? project.analysis.removedSeconds
      : undefined
  const outputDuration =
    typeof project.analysis?.outputDurationSeconds === 'number'
      ? project.analysis.outputDurationSeconds
      : undefined
  const editNotes = Array.isArray(project.analysis?.notes)
    ? project.analysis.notes
    : Array.isArray(project.editPlan?.notes)
      ? project.editPlan.notes
      : []
  const optionLines = optionsSummary(project.options ?? {})

  const onSaveTitle = async () => {
    setError('')
    setSaved(false)
    try {
      await updateTitle(project.id, title.trim() || project.generatedTitle)
      setSaved(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save title.')
    }
  }

  const onDownload = () => {
    const url = project.outputUrl || mediaUrl
    if (!url) {
      setError('Edited file is not available yet.')
      return
    }
    const a = document.createElement('a')
    a.href = url
    a.download = project.outputFilename || 'export.mp4'
    a.target = '_blank'
    a.rel = 'noopener'
    a.click()
  }

  const onDelete = async () => {
    if (!confirm('Delete this project?')) return
    await remove(project.id)
    navigate(ROUTES.dashboard)
  }

  return (
    <Page>
      <TopBar>
        <Back to={ROUTES.dashboard}>← Dashboard</Back>
      </TopBar>

      <HeaderBlock>
        <TitleWrap>
          <Title>{project.generatedTitle || project.title}</Title>
          <MetaLine>
            <Badge $tone={tone}>{project.status}</Badge>
            <Chip>{modeLabel(project.mode)}</Chip>
            <Chip>{formatDuration(project.durationSeconds)}</Chip>
            <Chip>{formatBytes(project.fileSize)}</Chip>
            {typeof removedSeconds === 'number' && removedSeconds > 0.4 && (
              <Chip>−{removedSeconds.toFixed(1)}s cut</Chip>
            )}
          </MetaLine>
        </TitleWrap>
        <HeaderActions>
          {project.status === 'Completed' && (
            <Button type="button" onClick={onDownload}>
              Download MP4
            </Button>
          )}
          {(project.status === 'Uploaded' || project.status === 'Failed') &&
            !processing && (
              <Button
                type="button"
                onClick={() =>
                  void (project.status === 'Failed'
                    ? retry(project.id)
                    : process(project.id))
                }
              >
                {project.status === 'Failed' ? 'Retry' : 'Start processing'}
              </Button>
            )}
        </HeaderActions>
      </HeaderBlock>

      {processing && (
        <ProcessBanner>
          <PulseDot aria-hidden />
          AI is processing your video — live status updates
        </ProcessBanner>
      )}

      {error && <ErrorText>{error}</ErrorText>}
      {project.errorMessage && project.status === 'Failed' && (
        <ErrorText>{project.errorMessage}</ErrorText>
      )}

      <Studio>
        <div>
          <Panel>
            <PanelHead>
              <PanelTitle>
                {processing ? 'Processing preview' : 'Export preview'}
              </PanelTitle>
              {project.status === 'Completed' && <Chip>Edited MP4</Chip>}
            </PanelHead>
            <PreviewStage>
              {mediaUrl ? (
                <VideoBox>
                  <video
                    key={mediaUrl}
                    src={mediaUrl}
                    controls={!processing}
                    playsInline
                    muted={processing}
                    data-dimmed={processing ? 'true' : 'false'}
                  />
                  {processing && (
                    <AiProcessingOverlay
                      status={project.status}
                      progress={project.progressPercent}
                    />
                  )}
                </VideoBox>
              ) : processing ? (
                <VideoBox>
                  <AiProcessingOverlay
                    status={project.status}
                    progress={project.progressPercent}
                  />
                </VideoBox>
              ) : (
                <HelpText>No preview file available yet.</HelpText>
              )}
            </PreviewStage>
            {project.status === 'Completed' && (
              <PanelBody>
                <PreviewFoot>
                  {project.outputUrl
                    ? 'This is your finished social export — ready to download.'
                    : 'Edited file missing — re-run processing.'}
                </PreviewFoot>
              </PanelBody>
            )}
          </Panel>

          {editNotes.length > 0 && project.status === 'Completed' && (
            <div style={{ marginTop: '0.85rem' }}>
              <EditResultsPanel
                notes={editNotes}
                removedSeconds={removedSeconds}
                outputDuration={outputDuration}
              />
            </div>
          )}
        </div>

        <SideStack>
          <Panel>
            <PanelHead>
              <PanelTitle>Project</PanelTitle>
            </PanelHead>
            <PanelBody>
              <Facts>
                <Fact>
                  <FactLabel>Mode</FactLabel>
                  <FactValue title={modeLabel(project.mode)}>
                    {modeLabel(project.mode)}
                  </FactValue>
                </Fact>
                <Fact>
                  <FactLabel>Aspect</FactLabel>
                  <FactValue>
                    {project.options?.aspectRatio || '9:16'}
                  </FactValue>
                </Fact>
                <Fact>
                  <FactLabel>Source</FactLabel>
                  <FactValue title={project.originalFilename}>
                    {project.originalFilename}
                  </FactValue>
                </Fact>
                <Fact>
                  <FactLabel>Created</FactLabel>
                  <FactValue>
                    {new Date(project.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </FactValue>
                </Fact>
                <Fact>
                  <FactLabel>Output</FactLabel>
                  <FactValue title={project.outputFilename}>
                    {project.outputFilename || '—'}
                  </FactValue>
                </Fact>
                <Fact>
                  <FactLabel>Length</FactLabel>
                  <FactValue>
                    {typeof outputDuration === 'number'
                      ? formatDuration(outputDuration)
                      : formatDuration(project.durationSeconds)}
                  </FactValue>
                </Fact>
              </Facts>

              <TitleField>
                AI title
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={
                    project.status !== 'Completed' &&
                    project.status !== 'Failed' &&
                    project.status !== 'Uploaded'
                  }
                />
              </TitleField>
              {saved && (
                <HelpText style={{ marginTop: '0.35rem' }}>Title saved.</HelpText>
              )}

              <ActionRow>
                <Button
                  type="button"
                  $variant="secondary"
                  onClick={() => void onSaveTitle()}
                >
                  Save title
                </Button>
                {project.status === 'Completed' && (
                  <Button type="button" onClick={onDownload}>
                    Download
                  </Button>
                )}
                <Button
                  type="button"
                  $variant="ghost"
                  onClick={() => void onDelete()}
                >
                  Delete
                </Button>
              </ActionRow>
            </PanelBody>
          </Panel>

          <Panel>
            <PanelHead>
              <PanelTitle>Applied options</PanelTitle>
            </PanelHead>
            <PanelBody>
              <OptionChips>
                {optionLines.map((line) => (
                  <OptionChip key={line}>{line}</OptionChip>
                ))}
              </OptionChips>
            </PanelBody>
          </Panel>
        </SideStack>
      </Studio>
    </Page>
  )
}
