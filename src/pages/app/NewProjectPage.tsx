import { useCallback, useState, useRef, type DragEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { Button, ErrorText, HelpText } from '@/components/ui'
import { useProjects } from '@/context/ProjectsContext'
import { ROUTES } from '@/constants'
import {
  DEFAULT_PROJECT_OPTIONS,
  type EditingModeId,
  type ProjectOptions,
  type UploadProgress,
} from '@/types/app'
import {
  formatBytes,
  formatDuration,
  validateVideoFile,
} from '@/utils/video'
import { ShotstackEditor } from '@/components/VideoEditor/ShotstackEditor'

const fade = keyframes`
  from { opacity: 0; transform: translateY(0.3rem); }
  to { opacity: 1; transform: translateY(0); }
`

const Page = styled.div`
  animation: ${fade} 0.35s ease both;
  max-width: 70rem;
  width: 100%;
  min-width: 0;
  overflow-x: hidden;
`

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 0.65rem 1rem;
  margin-bottom: 0.9rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const TitleBlock = styled.div`
  min-width: 0;
`

const Eyebrow = styled.p`
  margin: 0 0 0.2rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`

const Title = styled.h1`
  margin: 0;
  font-size: clamp(1.25rem, 2.4vw, 1.6rem);
  letter-spacing: -0.03em;
  line-height: 1.2;
`

const Lead = styled.p`
  margin: 0.3rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8125rem;
  max-width: 34rem;
  line-height: 1.4;
`

const Layout = styled.form`
  display: grid;
  gap: 0.85rem;
  width: 100%;
  min-width: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: minmax(0, 1.15fr) minmax(17rem, 0.85fr);
    align-items: start;
  }

  > * {
    min-width: 0;
  }
`

const Panel = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
  min-width: 0;
  max-width: 100%;
`

const PanelHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.65rem 0.85rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.elevated};
`

const PanelTitle = styled.h2`
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Step = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.35rem;
  height: 1.35rem;
  padding: 0 0.35rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.68rem;
  font-weight: 750;
`

const PanelBody = styled.div`
  padding: 0.85rem;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
`

const Stack = styled.div`
  display: grid;
  gap: 0.85rem;
  min-width: 0;
  max-width: 100%;
`

const EditorShell = styled.div`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
`

const Dropzone = styled.div<{ $active: boolean; $hasFile: boolean }>`
  display: grid;
  place-items: center;
  min-height: 7.5rem;
  padding: 1rem;
  border-radius: 0.85rem;
  border: 1.5px dashed
    ${({ theme, $active, $hasFile }) =>
    $active || $hasFile ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $active, $hasFile }) =>
    $active || $hasFile
      ? theme.colors.primarySoft
      : `linear-gradient(180deg, ${theme.colors.elevated}, ${theme.colors.surface})`};
  text-align: center;
  cursor: pointer;
  transition:
    border-color 150ms ease,
    background 150ms ease,
    transform 150ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryMuted};
    transform: translateY(-1px);
  }
`

const DropIcon = styled.div`
  width: 2.35rem;
  height: 2.35rem;
  margin: 0 auto 0.55rem;
  border-radius: 0.7rem;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, #a78bfa, #7c3aed);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  box-shadow: 0 8px 18px rgba(124, 58, 237, 0.28);
`

const DropTitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 650;
  color: ${({ theme }) => theme.colors.ink};
`

const DropMeta = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.35;
`

const HiddenInput = styled.input`
  display: none;
`

const ModeGrid = styled.div`
  display: grid;
  gap: 0.45rem;
`

const ModeOption = styled.label<{ $active: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.55rem 0.7rem;
  align-items: start;
  padding: 0.65rem 0.7rem;
  border-radius: 0.75rem;
  border: 1px solid
    ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primarySoft : theme.colors.surface};
  cursor: pointer;
  transition:
    border-color 150ms ease,
    background 150ms ease;

  input {
    margin-top: 0.15rem;
    accent-color: ${({ theme }) => theme.colors.primary};
  }

  strong {
    display: block;
    font-size: 0.84rem;
  }
`

const ModeText = styled.span`
  grid-column: 2;
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.35;
`

const Field = styled.label`
  display: grid;
  gap: 0.28rem;
  margin-bottom: 0.55rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Control = styled.input`
  padding: 0.55rem 0.7rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.colors.elevated};
  color: ${({ theme }) => theme.colors.ink};
  font: inherit;
  font-size: 0.84rem;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primaryMuted};
    border-color: ${({ theme }) => theme.colors.primary};
    background: #fff;
  }
`

const Select = styled.select`
  padding: 0.55rem 0.7rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.colors.elevated};
  color: ${({ theme }) => theme.colors.ink};
  font: inherit;
  font-size: 0.84rem;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primaryMuted};
    border-color: ${({ theme }) => theme.colors.primary};
    background: #fff;
  }

  &:disabled {
    opacity: 0.55;
  }
`

const FieldGrid = styled.div`
  display: grid;
  gap: 0.15rem 0.55rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`

const SectionLabel = styled.p`
  margin: 0.65rem 0 0.4rem;
  padding-top: 0.55rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.65rem;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`

const ToggleGrid = styled.div`
  display: grid;
  gap: 0.35rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`

const Toggle = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.6rem;
  border-radius: 0.65rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.elevated};
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
  cursor: pointer;

  input {
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`

const Footer = styled.div`
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  gap: 0.55rem;
`

const Progress = styled.div`
  height: 0.35rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.elevated};
  overflow: hidden;
`

const ProgressBar = styled.div<{ $value: number }>`
  height: 100%;
  width: ${({ $value }) => `${$value}%`};
  background: linear-gradient(90deg, #a78bfa, #7c3aed);
  transition: width 0.2s ease;
`

const UploadStats = styled.p`
  margin: 0.35rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.7rem;
  line-height: 1.35;
`

function formatRemaining(seconds: number | null) {
  if (seconds == null || !Number.isFinite(seconds)) return 'calculating…'
  if (seconds < 60) return `${Math.max(1, Math.ceil(seconds))}s`
  const minutes = Math.floor(seconds / 60)
  const remainder = Math.ceil(seconds % 60)
  return `${minutes}m ${remainder}s`
}

const MODES: { id: EditingModeId; name: string; text: string; live: boolean }[] =
  [
    {
      id: 'talking-head',
      name: 'Talking-head',
      text: 'Silence removal + jump cuts for speech.',
      live: true,
    },
    {
      id: 'rapid-cut',
      name: 'Rapid-cut',
      text: 'Faster pacing — preview path for now.',
      live: false,
    },
    {
      id: 'asmr',
      name: 'ASMR & unboxing',
      text: 'Keep product sounds, trim empty waits.',
      live: true,
    },
    {
      id: 'ai-combine',
      name: 'AI Combine',
      text: 'Gemini finds beautiful moments in both clips and blends them.',
      live: true,
    },
  ]

export function NewProjectPage() {
  const navigate = useNavigate()
  const { create, process } = useProjects()
  const [file, setFile] = useState<File | null>(null)
  const [duration, setDuration] = useState(0)
  const [fileB, setFileB] = useState<File | null>(null)
  const [durationB, setDurationB] = useState(0)
  const [drag, setDrag] = useState(false)
  const [dragB, setDragB] = useState(false)
  const [mode, setMode] = useState<EditingModeId>('talking-head')
  const [options, setOptions] = useState<ProjectOptions>(DEFAULT_PROJECT_OPTIONS)
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStats, setUploadStats] = useState<UploadProgress | null>(null)
  const editorRef = useRef<any>(null)

  const patchOptions = useCallback(
    <K extends keyof ProjectOptions>(key: K, value: ProjectOptions[K]) => {
      setOptions((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const applySavedCut = useCallback(async () => {
    try {
      const savedFile = await editorRef.current?.saveTrimmedClip()
      if (!savedFile) {
        setError('Could not cut and save the selected clip.')
        return
      }

      setFile(savedFile)
      setDuration(Math.max(1, Math.ceil((savedFile as any).duration || 5)))
      setError('')
      setTitle((prev) => prev || savedFile.name.replace(/\.[^.]+$/, ''))
      patchOptions('timelineJson', { source: 'cut-saved', fileName: savedFile.name })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save cut video.')
    }
  }, [patchOptions])

  const onFile = useCallback(
    async (next: File | null) => {
      setError('')
      setUploadProgress(0)
      setUploadStats(null)
      setFile(null)
      setDuration(0)
      if (!next) return
      const result = await validateVideoFile(next)
      if (!result.ok) {
        setError(result.error)
        return
      }
      setFile(next)
      setDuration(result.durationSeconds)
      if (!title) {
        setTitle(next.name.replace(/\.[^.]+$/, ''))
      }
    },
    [title],
  )

  const onFileB = useCallback(async (next: File | null) => {
    setError('')
    setUploadProgress(0)
    setUploadStats(null)
    setFileB(null)
    setDurationB(0)
    if (!next) return
    const result = await validateVideoFile(next)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setFileB(next)
    setDurationB(result.durationSeconds)
  }, [])

  const onDrop = (event: DragEvent) => {
    event.preventDefault()
    setDrag(false)
    const next = event.dataTransfer.files?.[0]
    if (next) void onFile(next)
  }

  const onDropB = (event: DragEvent) => {
    event.preventDefault()
    setDragB(false)
    const next = event.dataTransfer.files?.[0]
    if (next) void onFileB(next)
  }

  const handleTimelineChange = useCallback(
    (json: unknown) => {
      patchOptions('timelineJson', json as ProjectOptions['timelineJson'])
    },
    [patchOptions],
  )

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!file) {
      setError('Choose a video file to upload.')
      return
    }
    if (mode === 'ai-combine' && !fileB) {
      setError('AI Combine needs a second video.')
      return
    }
    setBusy(true)
    setError('')
    setUploadProgress(0)
    setUploadStats(null)
    try {
      const timelineJson =
        (await editorRef.current?.getTimelineJson()) ?? options.timelineJson
      const project = await create(
        {
          file,
          secondaryFile: mode === 'ai-combine' ? fileB ?? undefined : undefined,
          durationSeconds: duration,
          secondaryDurationSeconds:
            mode === 'ai-combine' ? durationB : undefined,
          mode,
          options: { ...options, timelineJson },
          title: title.trim() || undefined,
        },
        (progress) => {
          setUploadStats(progress)
          setUploadProgress(progress.percent)
        },
      )
      setUploadProgress(100)
      void process(project.id)
      navigate(ROUTES.project(project.id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Page>
      <Header>
        <TitleBlock>
          <Eyebrow>Studio</Eyebrow>
          <Title>New video project</Title>
          <Lead>
            Pick a mode, upload your clip(s), tune options, and submit for AI
            editing. Use <strong>AI Combine</strong> to upload two videos.
          </Lead>
        </TitleBlock>
        <Button
          type="button"
          disabled={busy || !file || (mode === 'ai-combine' && !fileB)}
          onClick={() => {
            const form = document.getElementById(
              'new-project-form',
            ) as HTMLFormElement | null
            form?.requestSubmit()
          }}
        >
          {busy ? 'Uploading…' : 'Submit edit'}
        </Button>
      </Header>

      <Layout id="new-project-form" onSubmit={(e) => void onSubmit(e)}>
        <Stack>
          <Panel>
            <PanelHead>
              <PanelTitle>Editing mode</PanelTitle>
              <Step>1</Step>
            </PanelHead>
            <PanelBody>
              <ModeGrid>
                {MODES.map((item) => (
                  <ModeOption key={item.id} $active={mode === item.id}>
                    <input
                      type="radio"
                      name="mode"
                      checked={mode === item.id}
                      onChange={() => setMode(item.id)}
                    />
                    <div>
                      <strong>
                        {item.name}
                        {item.live ? ' · live' : ' · preview'}
                      </strong>
                      <ModeText>{item.text}</ModeText>
                    </div>
                  </ModeOption>
                ))}
              </ModeGrid>
              {mode === 'ai-combine' && (
                <HelpText style={{ marginBottom: 0 }}>
                  AI Combine samples frames from both videos, lets Gemini pick
                  the most beautiful / important moments, then FFmpeg cuts and
                  blends them with cinematic transitions.
                </HelpText>
              )}
            </PanelBody>
          </Panel>

          <Panel>
            <PanelHead>
              <PanelTitle>
                {mode === 'ai-combine' ? 'Video A' : 'Source upload'}
              </PanelTitle>
              <Step>2</Step>
            </PanelHead>
            <PanelBody>
              <Dropzone
                $active={drag}
                $hasFile={Boolean(file)}
                onDragEnter={(e) => {
                  e.preventDefault()
                  setDrag(true)
                }}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={() => setDrag(false)}
                onDrop={onDrop}
                onClick={() => document.getElementById('video-file')?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    document.getElementById('video-file')?.click()
                  }
                }}
              >
                <div>
                  <DropIcon aria-hidden>{file ? '✓' : '↑'}</DropIcon>
                  <DropTitle>
                    {file ? file.name : 'Drop video or browse'}
                  </DropTitle>
                  <DropMeta>
                    {file
                      ? `${formatBytes(file.size)} · ${formatDuration(duration)}`
                      : 'MP4 / MOV / WebM · max 2 GB · 20 min'}
                  </DropMeta>
                </div>
              </Dropzone>
              <HiddenInput
                id="video-file"
                type="file"
                accept=".mp4,.mov,.webm,video/mp4,video/quicktime,video/webm"
                onChange={(e) => void onFile(e.target.files?.[0] ?? null)}
              />
              {busy && (
                <>
                  <Progress style={{ marginTop: '0.65rem' }}>
                    <ProgressBar $value={uploadProgress} />
                  </Progress>
                  {uploadStats && (
                    <UploadStats>
                      {formatBytes(uploadStats.uploadedBytes)} /{' '}
                      {formatBytes(uploadStats.totalBytes)} ·{' '}
                      {uploadStats.percent.toFixed(1)}% ·{' '}
                      {uploadStats.bytesPerSecond > 0
                        ? `${formatBytes(uploadStats.bytesPerSecond)}/s`
                        : 'measuring speed…'}{' '}
                      · {formatRemaining(uploadStats.remainingSeconds)} remaining
                    </UploadStats>
                  )}
                </>
              )}
              {error && (
                <ErrorText style={{ marginTop: '0.65rem', marginBottom: 0 }}>
                  {error}
                </ErrorText>
              )}
            </PanelBody>
          </Panel>

          {mode === 'ai-combine' && (
            <Panel>
              <PanelHead>
                <PanelTitle>Video B</PanelTitle>
                <Step>2b</Step>
              </PanelHead>
              <PanelBody>
                <Dropzone
                  $active={dragB}
                  $hasFile={Boolean(fileB)}
                  onDragEnter={(e) => {
                    e.preventDefault()
                    setDragB(true)
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDragLeave={() => setDragB(false)}
                  onDrop={onDropB}
                  onClick={() => document.getElementById('video-file-b')?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      document.getElementById('video-file-b')?.click()
                    }
                  }}
                >
                  <div>
                    <DropIcon aria-hidden>{fileB ? '✓' : '↑'}</DropIcon>
                    <DropTitle>
                      {fileB ? fileB.name : 'Drop second video or browse'}
                    </DropTitle>
                    <DropMeta>
                      {fileB
                        ? `${formatBytes(fileB.size)} · ${formatDuration(durationB)}`
                        : 'Required for AI Combine'}
                    </DropMeta>
                  </div>
                </Dropzone>
                <HiddenInput
                  id="video-file-b"
                  type="file"
                  accept=".mp4,.mov,.webm,video/mp4,video/quicktime,video/webm"
                  onChange={(e) => void onFileB(e.target.files?.[0] ?? null)}
                />
              </PanelBody>
            </Panel>
          )}

              {file && mode !== 'ai-combine' && (
            <Panel>
              <PanelHead>
                <PanelTitle>Edit video</PanelTitle>
                <Step>T</Step>
              </PanelHead>
              <PanelBody>
                <EditorShell>
                <ShotstackEditor
                  ref={editorRef}
                  file={file}
                  durationSeconds={duration}
                  onTimelineChange={handleTimelineChange}
                  onCaptionsChange={({ enabled, position, fontFamily, fontSize, color }) => {
                    patchOptions('captions', enabled)
                    patchOptions('captionPosition', position)
                    patchOptions('captionFontFamily', fontFamily)
                    patchOptions('captionFontSize', fontSize)
                    patchOptions('captionColor', color)
                  }}
                />
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid #e9e4f5' }}>
                  <Button
                    type="button"
                    $variant="secondary"
                    onClick={async () => {
                      try {
                        const json = await editorRef.current?.getTimelineJson()
                        if (json) {
                          patchOptions('timelineJson', json)
                        } else {
                          alert('Could not extract timeline JSON from the editor.')
                        }
                      } catch (e) {
                        console.error(e)
                        alert('Failed to save timeline.')
                      }
                    }}
                  >
                    Save timeline edits
                  </Button>
                  <Button
                    type="button"
                    onClick={() => void applySavedCut()}
                  >
                    Cut & save clip
                  </Button>
                </div>
                </EditorShell>
              </PanelBody>
            </Panel>
          )}
        </Stack>

        <Panel>
          <PanelHead>
            <PanelTitle>Options & polish</PanelTitle>
            <Step>3</Step>
          </PanelHead>
          <PanelBody>
            <Field>
              Project title
              <Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Optional — AI can name it"
              />
            </Field>

            <SectionLabel>Edit settings</SectionLabel>
            <FieldGrid>
              <Field>
                Aspect ratio
                <Select
                  value={options.aspectRatio}
                  onChange={(e) =>
                    patchOptions(
                      'aspectRatio',
                      e.target.value as ProjectOptions['aspectRatio'],
                    )
                  }
                >
                  <option value="9:16">9:16 vertical</option>
                  <option value="1:1">1:1 square</option>
                  <option value="16:9">16:9 landscape</option>
                </Select>
              </Field>

              {(mode === 'talking-head' || mode === 'asmr') && (
                <Field>
                  Silence sensitivity
                  <Select
                    value={options.silenceSensitivity}
                    onChange={(e) =>
                      patchOptions(
                        'silenceSensitivity',
                        e.target.value as ProjectOptions['silenceSensitivity'],
                      )
                    }
                  >
                    <option value="light">Light</option>
                    <option value="medium">Medium</option>
                    <option value="aggressive">Aggressive</option>
                  </Select>
                </Field>
              )}

              {(mode === 'rapid-cut' || mode === 'asmr') && (
                <Field>
                  Pacing
                  <Select
                    value={options.pacing}
                    onChange={(e) =>
                      patchOptions(
                        'pacing',
                        e.target.value as ProjectOptions['pacing'],
                      )
                    }
                  >
                    <option value="normal">Normal</option>
                    <option value="fast">Fast</option>
                    <option value="very-fast">Very fast</option>
                  </Select>
                </Field>
              )}

              <Field>
                Speed ramp
                <Select
                  value={options.speedRamp}
                  onChange={(e) =>
                    patchOptions(
                      'speedRamp',
                      e.target.value as ProjectOptions['speedRamp'],
                    )
                  }
                >
                  <option value="off">Off</option>
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="aggressive">Aggressive</option>
                </Select>
              </Field>

              <Field>
                Zoom preset
                <Select
                  value={options.keyframePreset}
                  onChange={(e) =>
                    patchOptions(
                      'keyframePreset',
                      e.target.value as ProjectOptions['keyframePreset'],
                    )
                  }
                  disabled={!options.keyframing}
                >
                  <option value="slow-zoom-in">Slow zoom in</option>
                  <option value="slow-zoom-out">Slow zoom out</option>
                  <option value="speaker-punch-in">Speaker punch-in</option>
                  <option value="product-reveal-zoom">Product reveal</option>
                </Select>
              </Field>

              {options.captions && (
                <>
                  <Field>
                    Caption position
                    <Select
                      value={options.captionPosition}
                      onChange={(e) =>
                        patchOptions(
                          'captionPosition',
                          e.target.value as ProjectOptions['captionPosition'],
                        )
                      }
                    >
                      <option value="bottom">Bottom</option>
                      <option value="top">Top</option>
                    </Select>
                  </Field>
                  <Field>
                    Caption font
                    <Select
                      value={options.captionFontFamily}
                      onChange={(e) =>
                        patchOptions(
                          'captionFontFamily',
                          e.target.value as ProjectOptions['captionFontFamily'],
                        )
                      }
                    >
                      <option value="arial">Arial</option>
                      <option value="impact">Impact</option>
                      <option value="georgia">Georgia</option>
                      <option value="verdana">Verdana</option>
                      <option value="comic-sans">Comic Sans</option>
                      <option value="courier">Courier</option>
                      <option value="segoe">Segoe</option>
                    </Select>
                  </Field>
                  <Field>
                    Caption size
                    <Select
                      value={options.captionFontSize}
                      onChange={(e) =>
                        patchOptions(
                          'captionFontSize',
                          Number(e.target.value) as ProjectOptions['captionFontSize'],
                        )
                      }
                    >
                      <option value={18}>Small · 18</option>
                      <option value={22}>Medium · 22</option>
                      <option value={28}>Large · 28</option>
                      <option value={36}>XL · 36</option>
                      <option value={48}>Huge · 48</option>
                    </Select>
                  </Field>
                  <Field>
                    Caption color
                    <Select
                      value={options.captionColor}
                      onChange={(e) =>
                        patchOptions(
                          'captionColor',
                          e.target.value as ProjectOptions['captionColor'],
                        )
                      }
                    >
                      <option value="white">White</option>
                      <option value="yellow">Yellow</option>
                      <option value="black">Black</option>
                      <option value="cyan">Cyan</option>
                    </Select>
                  </Field>
                </>
              )}
            </FieldGrid>

            <ToggleGrid>
              <Toggle>
                Captions
                <input
                  type="checkbox"
                  checked={options.captions}
                  onChange={(e) => patchOptions('captions', e.target.checked)}
                />
              </Toggle>
              <Toggle>
                Keyframing
                <input
                  type="checkbox"
                  checked={options.keyframing}
                  onChange={(e) => patchOptions('keyframing', e.target.checked)}
                />
              </Toggle>
              <Toggle>
                Keep audio
                <input
                  type="checkbox"
                  checked={options.keepAudio}
                  onChange={(e) => patchOptions('keepAudio', e.target.checked)}
                />
              </Toggle>
              <Toggle>
                Normalize audio
                <input
                  type="checkbox"
                  checked={options.audioNormalize}
                  onChange={(e) =>
                    patchOptions('audioNormalize', e.target.checked)
                  }
                />
              </Toggle>
            </ToggleGrid>

            <SectionLabel>Studio tools</SectionLabel>
            <FieldGrid>
              <Field>
                Crop
                <Select
                  value={options.cropPreset}
                  onChange={(e) =>
                    patchOptions(
                      'cropPreset',
                      e.target.value as ProjectOptions['cropPreset'],
                    )
                  }
                >
                  <option value="none">None</option>
                  <option value="center">Center</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="tight">Tight</option>
                </Select>
              </Field>
              <Field>
                Color grade
                <Select
                  value={options.colorGrade}
                  onChange={(e) =>
                    patchOptions(
                      'colorGrade',
                      e.target.value as ProjectOptions['colorGrade'],
                    )
                  }
                >
                  <option value="none">None</option>
                  <option value="clean">Clean</option>
                  <option value="warm">Warm</option>
                  <option value="cool">Cool</option>
                  <option value="vivid">Vivid</option>
                </Select>
              </Field>
            </FieldGrid>

            <ToggleGrid>
              <Toggle>
                Fade in/out
                <input
                  type="checkbox"
                  checked={options.fadeInOut}
                  onChange={(e) => patchOptions('fadeInOut', e.target.checked)}
                />
              </Toggle>
              <Toggle>
                Title card
                <input
                  type="checkbox"
                  checked={options.introTitleCard}
                  onChange={(e) =>
                    patchOptions('introTitleCard', e.target.checked)
                  }
                />
              </Toggle>
              <Toggle>
                Mirror
                <input
                  type="checkbox"
                  checked={options.mirrorHorizontal}
                  onChange={(e) =>
                    patchOptions('mirrorHorizontal', e.target.checked)
                  }
                />
              </Toggle>
            </ToggleGrid>

            <Footer>
              <HelpText style={{ fontSize: '0.75rem' }}>
                One successful render uses one edit credit. Failed jobs do not.
              </HelpText>
              <Button type="submit" disabled={busy || !file}>
                {busy ? 'Uploading…' : 'Submit for AI editing'}
              </Button>
            </Footer>
          </PanelBody>
        </Panel>
      </Layout>
    </Page>
  )
}
