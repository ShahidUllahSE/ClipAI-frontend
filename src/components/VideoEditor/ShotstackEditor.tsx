import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`

const PreviewBlock = styled.div`
  display: grid;
  gap: 0;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.ink};
  box-shadow: ${({ theme }) => theme.shadows.md};
`

const VideoStage = styled.div`
  position: relative;
  width: 100%;
  height: min(26rem, 48vh);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #12101f;
  overflow: hidden;
`

const Video = styled.video<{
  $zoom: number
  $filter: string
  $translateX: number
  $translateY: number
  $opacity: number
}>`
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  transform: translate(${({ $translateX }) => `${$translateX}px`}, ${({ $translateY }) => `${$translateY}px`}) scale(${({ $zoom }) => $zoom});
  transform-origin: center center;
  opacity: ${({ $opacity }) => $opacity};
  filter: ${({ $filter }) => $filter};
  transition: transform 220ms ease, opacity 220ms ease, filter 220ms ease;
  will-change: transform, opacity, filter;
`

const FlashOverlay = styled.div<{ $intensity: number }>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: #ffffff;
  opacity: ${({ $intensity }) => $intensity};
  mix-blend-mode: screen;
`

const TransportBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.65rem 0.85rem;
  background: rgba(18, 16, 31, 0.96);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`

const TransportLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const PlayButton = styled.button`
  appearance: none;
  border: none;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.7rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`

const Timecode = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.02em;
`

const TransportActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const TransportBtn = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.65);
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.5rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: rgba(255, 255, 255, 0.08);
  }
`

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem 0;
  padding: 0.5rem 0.65rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const ToolGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.15rem;
  padding: 0 0.5rem;

  &:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    margin-right: 0.35rem;
    padding-right: 0.85rem;
  }
`

const ToolBtn = styled.button<{ $active?: boolean }>`
  appearance: none;
  border: none;
  background: ${({ theme, $active }) => ($active ? theme.colors.primarySoft : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textMuted)};
  padding: 0.4rem 0.65rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.8125rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  white-space: nowrap;
  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primarySoft};
  }
`

const EffectsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const EffectsLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

const EffectsStrip = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.15rem;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 999px;
  }
`

const EffectChip = styled.button<{ $active?: boolean }>`
  appearance: none;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  width: 4.5rem;
  padding: 0.45rem 0.35rem;
  border: 1.5px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme, $active }) => ($active ? theme.colors.primarySoft : theme.colors.elevated)};
  cursor: pointer;
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryMuted};
    background: ${({ theme }) => theme.colors.primarySoft};
  }
`

const EffectSwatch = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const EffectName = styled.span`
  font-size: 0.6875rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.ink};
  text-align: center;
  line-height: 1.2;
`

const TimelineBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`

const TimelineMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.6875rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`

const TimelineViewport = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.elevated};
  overflow: hidden;
`

const Track = styled.div`
  position: relative;
  width: 100%;
  height: 4.5rem;
  cursor: pointer;
`

const TrackRail = styled.div`
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  top: 50%;
  height: 0.45rem;
  transform: translateY(-50%);
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.border};
`

const TrackFill = styled.div<{ $left: number; $width: number }>`
  position: absolute;
  left: ${({ $left }) => `${$left}%`};
  width: ${({ $width }) => `${$width}%`};
  top: 50%;
  height: 0.45rem;
  transform: translateY(-50%);
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.primaryMuted};
`

const SegmentBlock = styled.div<{ $left: number; $width: number; $active: boolean }>`
  position: absolute;
  left: ${({ $left }) => `${$left}%`};
  width: ${({ $width }) => `${$width}%`};
  top: 50%;
  height: 1.75rem;
  transform: translateY(-50%);
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'rgba(124, 58, 237, 0.35)'};
  opacity: ${({ $active }) => ($active ? 1 : 0.55)};
  transition: opacity 120ms ease;
`

const Selection = styled.div<{ $left: number; $width: number }>`
  position: absolute;
  left: ${({ $left }) => `${$left}%`};
  width: ${({ $width }) => `${$width}%`};
  top: 0.65rem;
  bottom: 0.65rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: rgba(124, 58, 237, 0.06);
  pointer-events: none;
`

const Handle = styled.button`
  position: absolute;
  top: 50%;
  width: 0.55rem;
  height: 1.75rem;
  transform: translate(-50%, -50%);
  border: 0;
  border-radius: 3px;
  cursor: ew-resize;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 1px 4px rgba(30, 27, 75, 0.2);
  z-index: 5;
`

const Playhead = styled.div<{ $position: number }>`
  position: absolute;
  left: ${({ $position }) => `${$position}%`};
  top: 0.5rem;
  bottom: 0.5rem;
  width: 2px;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.ink};
  border-radius: 1px;
  z-index: 6;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.ink};
  }
`

const KeyframeDot = styled.div<{ $position: number; $active?: boolean }>`
  position: absolute;
  left: ${({ $position }) => `${$position}%`};
  top: 50%;
  width: 0.5rem;
  height: 0.5rem;
  transform: translate(-50%, -50%);
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.white)};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  z-index: 4;
`

interface Props {
  file: File | null
  durationSeconds: number
  onTimelineChange?: (json: any) => void
  onCutSaved?: (file: File | null) => void
}

export interface ShotstackEditorHandle {
  getTimelineJson: () => Promise<any>
  saveTrimmedClip: () => Promise<File | null>
}

type EffectPreset = {
  id: string
  name: string
  description: string
  accent: string
  filter: string
}

type ToolId =
  | 'trim'
  | 'cut'
  | 'split'
  | 'speed'
  | 'crop'
  | 'zoom'
  | 'text'
  | 'music'
  | 'transition'
  | 'filter'
  | 'caption'
  | 'effect'
  | 'audio'

type TransitionId =
  | 'none'
  | 'zoom-in'
  | 'zoom-out'
  | 'fade'
  | 'slide-left'
  | 'slide-right'
  | 'ken-burns'
  | 'blur'
  | 'flash'

type TransitionPreset = {
  id: TransitionId
  name: string
  description: string
  accent: string
}

const EFFECT_PRESETS: EffectPreset[] = [
  { id: 'cinematic', name: 'Cinematic', description: 'Deep contrast', accent: 'linear-gradient(135deg, #f59e0b, #7c3aed)', filter: 'contrast(1.25) saturate(1.4) brightness(0.95)' },
  { id: 'vintage', name: 'Vintage', description: 'Warm film', accent: 'linear-gradient(135deg, #fb923c, #facc15)', filter: 'sepia(0.45) contrast(1.2) saturate(1.1)' },
  { id: 'neon', name: 'Neon', description: 'Electric glow', accent: 'linear-gradient(135deg, #22d3ee, #7c3aed, #ec4899)', filter: 'saturate(1.7) hue-rotate(28deg) brightness(1.08)' },
  { id: 'dreamy', name: 'Dreamy', description: 'Soft focus', accent: 'linear-gradient(135deg, #d946ef, #c4b5fd)', filter: 'blur(0.2px) saturate(1.25) brightness(1.12)' },
  { id: 'dramatic', name: 'Dramatic', description: 'High contrast', accent: 'linear-gradient(135deg, #1e1b4b, #7c3aed)', filter: 'contrast(1.5) brightness(0.82) saturate(1.7)' },
  { id: 'cool', name: 'Cool', description: 'Blue tone', accent: 'linear-gradient(135deg, #0ea5e9, #7c3aed)', filter: 'contrast(1.1) hue-rotate(-24deg) saturate(1.2)' },
]

const TRANSITION_PRESETS: TransitionPreset[] = [
  { id: 'none', name: 'None', description: 'No motion', accent: 'linear-gradient(135deg, #e9e4f5, #f5f3ff)' },
  { id: 'zoom-in', name: 'Zoom in', description: 'Push into frame', accent: 'linear-gradient(135deg, #7c3aed, #1e1b4b)' },
  { id: 'zoom-out', name: 'Zoom out', description: 'Pull back', accent: 'linear-gradient(135deg, #c4b5fd, #7c3aed)' },
  { id: 'fade', name: 'Fade', description: 'Soft opacity', accent: 'linear-gradient(135deg, #1e1b4b, #f5f3ff)' },
  { id: 'slide-left', name: 'Slide ←', description: 'Drift left', accent: 'linear-gradient(90deg, #7c3aed, #a78bfa)' },
  { id: 'slide-right', name: 'Slide →', description: 'Drift right', accent: 'linear-gradient(270deg, #7c3aed, #a78bfa)' },
  { id: 'ken-burns', name: 'Ken Burns', description: 'Slow pan + zoom', accent: 'linear-gradient(135deg, #f59e0b, #7c3aed)' },
  { id: 'blur', name: 'Blur', description: 'Soft dissolve', accent: 'linear-gradient(135deg, #38bdf8, #c4b5fd)' },
  { id: 'flash', name: 'Flash', description: 'White flash cut', accent: 'linear-gradient(135deg, #ffffff, #7c3aed)' },
]

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

const buildTimelineJson = (
  src: string,
  start: number,
  end: number,
  keyframes: number[] = [],
  segments: Array<{ start: number; end: number }> = [],
  selectedEffect: EffectPreset | null = null,
  videoTransition: TransitionId = 'none',
) => ({
  timeline: {
    tracks: [
      {
        clips: [
          {
            asset: { type: 'video', src },
            start,
            length: Math.max(0.1, end - start),
            transition: videoTransition !== 'none' ? { in: videoTransition, out: videoTransition } : undefined,
          },
        ],
      },
    ],
    keyframes: keyframes.map((time) => ({ time: Number(time.toFixed(2)), type: 'custom' })),
    segments: segments.map((segment) => ({
      start: Number(segment.start.toFixed(2)),
      end: Number(segment.end.toFixed(2)),
    })),
    effects: selectedEffect ? [{ id: selectedEffect.id, name: selectedEffect.name, filter: selectedEffect.filter }] : [],
    transition: videoTransition !== 'none'
      ? { type: videoTransition, duration: Math.max(0.1, end - start) }
      : null,
  },
  output: {
    format: 'mp4',
    resolution: 'hd',
    fps: 30,
    trim: { start, end },
    keyframes: keyframes.map((time) => Number(time.toFixed(2))),
    segments: segments.map((segment) => ({
      start: Number(segment.start.toFixed(2)),
      end: Number(segment.end.toFixed(2)),
    })),
    effect: selectedEffect ? { id: selectedEffect.id, name: selectedEffect.name, filter: selectedEffect.filter } : null,
    transition: videoTransition !== 'none'
      ? { type: videoTransition, duration: Math.max(0.1, end - start) }
      : null,
  },
})

const generateAutoKeyframes = (totalDuration: number) => {
  const count = Math.min(18, Math.max(6, Math.ceil(totalDuration / 1.2)))
  const values = Array.from({ length: count }, (_, index) => {
    const normalized = index / Math.max(1, count - 1)
    return Number((normalized * totalDuration).toFixed(2))
  })

  return values.filter((value, index, arr) => index === 0 || Math.abs(value - arr[index - 1]) > 0.15)
}

const seekVideoTo = (video: HTMLVideoElement, time: number) => new Promise<void>((resolve) => {
  const safeTime = clamp(time, 0, Math.max(0.1, video.duration || time))
  const onSeeked = () => {
    video.removeEventListener('seeked', onSeeked)
    resolve()
  }
  video.addEventListener('seeked', onSeeked, { once: true })
  video.currentTime = safeTime
})

export const ShotstackEditor = forwardRef<ShotstackEditorHandle, Props>(function ShotstackEditor(
  { file, durationSeconds, onTimelineChange, onCutSaved }: Props,
  ref,
) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const fileUrlRef = useRef<string | null>(null)
  const [sourceUrl, setSourceUrl] = useState<string | null>(null)
  const [trimStart, setTrimStart] = useState(0)
  const [trimEnd, setTrimEnd] = useState(10)
  const [playhead, setPlayhead] = useState(0)
  const [dragging, setDragging] = useState<'start' | 'end' | null>(null)
  const [keyframes, setKeyframes] = useState<number[]>([])
  const [segments, setSegments] = useState<Array<{ start: number; end: number }>>([])
  const [videoZoom, setVideoZoom] = useState(1)
  const [videoTransition, setVideoTransition] = useState<TransitionId>('none')
  const [selectedEffect, setSelectedEffect] = useState<EffectPreset>(EFFECT_PRESETS[0])
  const [activeTool, setActiveTool] = useState<ToolId>('trim')

  const notifyTimelineChange = (json: any) => {
    onTimelineChange?.(json)
  }

  const detectKeyMoments = async () => {
    if (!videoRef.current || !file) return

    const video = videoRef.current
    const total = Math.max(1, durationSeconds || video.duration || 10)
    const samples: number[] = []
    let prevBrightness = 0
    let prevTime = 0

    try {
      const steps = Math.min(26, Math.max(12, Math.ceil(total * 2)))
      for (let step = 0; step < steps; step += 1) {
        const time = (step / Math.max(1, steps - 1)) * total
        const safeTime = clamp(time, 0, Math.max(0.1, total - 0.1))
        await seekVideoTo(video, safeTime)

        const canvas = document.createElement('canvas')
        canvas.width = 120
        canvas.height = 72
        const context = canvas.getContext('2d')
        if (!context) continue

        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const image = context.getImageData(0, 0, canvas.width, canvas.height).data

        let brightness = 0
        for (let index = 0; index < image.length; index += 4) {
          brightness += ((image[index] + image[index + 1] + image[index + 2]) / 3)
        }
        brightness /= (image.length / 4)

        if (prevTime > 0 && Math.abs(brightness - prevBrightness) > 10) {
          samples.push(safeTime)
        }

        prevBrightness = brightness
        prevTime = safeTime
      }

      const detected = [...new Set(samples.map((value) => Number(value.toFixed(2))))].sort((a, b) => a - b)
      const finalFrames = detected.length >= 4 ? detected : generateAutoKeyframes(total)

      setKeyframes(finalFrames)
      const builtSegments = finalFrames.length > 1
        ? finalFrames.slice(1).map((time, index) => ({ start: finalFrames[index], end: time }))
        : [{ start: 0, end: total }]
      setSegments(builtSegments)
      setTrimStart(0)
      setTrimEnd(total)
    } catch (error) {
      console.warn('Auto keyframe detection failed, using fallback timeline.', error)
      const fallback = generateAutoKeyframes(total)
      setKeyframes(fallback)
      setSegments(fallback.length > 1 ? fallback.slice(1).map((time, index) => ({ start: fallback[index], end: time })) : [{ start: 0, end: total }])
    }
  }

  useEffect(() => {
    if (!file) {
      setSourceUrl(null)
      fileUrlRef.current = null
      return
    }

    const nextUrl = URL.createObjectURL(file)
    fileUrlRef.current = nextUrl
    setSourceUrl(nextUrl)

    const total = Math.max(1, durationSeconds || 10)
    const autoKeyframes = generateAutoKeyframes(total)
    const defaultSegments = autoKeyframes.length > 1
      ? autoKeyframes.slice(1).map((time, index) => ({ start: autoKeyframes[index], end: time }))
      : [{ start: 0, end: total }]

    setTrimStart(0)
    setTrimEnd(total)
    setPlayhead(0)
    setKeyframes(autoKeyframes)
    setSegments(defaultSegments)
    setVideoZoom(1)
    setVideoTransition('none')

    const json = buildTimelineJson(nextUrl, 0, total, autoKeyframes, defaultSegments, selectedEffect, videoTransition)
    notifyTimelineChange(json)

    return () => {
      URL.revokeObjectURL(nextUrl)
      if (fileUrlRef.current === nextUrl) {
        fileUrlRef.current = null
      }
    }
  }, [file, durationSeconds])

  useEffect(() => {
    if (!sourceUrl) return
    const current = buildTimelineJson(sourceUrl, trimStart, trimEnd, keyframes, segments, selectedEffect, videoTransition)
    notifyTimelineChange(current)
  }, [sourceUrl, trimStart, trimEnd, keyframes, segments, selectedEffect, videoTransition])

  useEffect(() => {
    if (!dragging) return

    const move = (event: MouseEvent) => {
      const track = document.getElementById('editor-track')
      if (!track || !sourceUrl) return
      const rect = track.getBoundingClientRect()
      const ratio = clamp((event.clientX - rect.left) / rect.width, 0, 1)
      const nextSeconds = ratio * Math.max(1, durationSeconds || 10)

      if (dragging === 'start') {
        setTrimStart(clamp(Math.min(nextSeconds, trimEnd - 0.2), 0, trimEnd - 0.2))
      } else {
        setTrimEnd(clamp(Math.max(nextSeconds, trimStart + 0.2), trimStart + 0.2, Math.max(1, durationSeconds || 10)))
      }
    }

    const stop = () => setDragging(null)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', stop)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', stop)
    }
  }, [dragging, trimStart, trimEnd, durationSeconds, sourceUrl])

  useImperativeHandle(ref, () => ({
    async getTimelineJson() {
      const src = sourceUrl || fileUrlRef.current || ''
      return buildTimelineJson(src, trimStart, trimEnd, keyframes, segments, selectedEffect, videoTransition)
    },
    async saveTrimmedClip() {
      if (!file) return null

      const savedFile = new File([file], `${file.name.replace(/\.[^.]+$/, '')}-cut.mp4`, {
        type: file.type || 'video/mp4',
        lastModified: Date.now(),
      })

      Object.defineProperty(savedFile, 'trimStart', {
        value: trimStart,
        enumerable: true,
      })
      Object.defineProperty(savedFile, 'trimEnd', {
        value: trimEnd,
        enumerable: true,
      })

      onCutSaved?.(savedFile)
      return savedFile
    },
  }))

  if (!file) return null

  const totalDuration = Math.max(1, durationSeconds || 10)
  const startPercent = (trimStart / totalDuration) * 100
  const endPercent = (trimEnd / totalDuration) * 100
  const selectionWidth = Math.max(2, endPercent - startPercent)
  const playheadPercent = (playhead / totalDuration) * 100

  const addKeyframeAtPlayhead = () => {
    const nextTime = Number(Math.min(Math.max(playhead, 0), totalDuration).toFixed(2))
    setKeyframes((current) => {
      const merged = [...current, nextTime].filter((value, index, arr) => arr.indexOf(value) === index)
      return [...merged].sort((a, b) => a - b)
    })
    setActiveTool('effect')
  }

  const splitAtPlayhead = () => {
    const splitPoint = clamp(playhead, trimStart, trimEnd)
    setSegments((current) => {
      const next: Array<{ start: number; end: number }> = []
      for (const segment of current) {
        if (segment.start < splitPoint && splitPoint < segment.end) {
          next.push({ start: segment.start, end: splitPoint })
          next.push({ start: splitPoint, end: segment.end })
        } else {
          next.push(segment)
        }
      }
      return next.length ? next : [{ start: 0, end: totalDuration }]
    })
    setActiveTool('split')
  }

  const handleZoom = (direction: 'in' | 'out') => {
    setVideoZoom((value) => {
      const next = direction === 'in' ? value + 0.15 : value - 0.15
      return clamp(next, 0.8, 2.2)
    })
    setActiveTool('zoom')
  }

  const applyTransition = (transitionId: TransitionId) => {
    setVideoTransition(transitionId)
    setActiveTool('transition')

    if (transitionId === 'none') return

    const startTime = 0
    const endTime = Number(totalDuration.toFixed(2))
    setKeyframes((current) => {
      const merged = [...current, startTime, endTime].filter((value, index, arr) => arr.indexOf(value) === index)
      return [...merged].sort((a, b) => a - b)
    })
  }

  const togglePreview = async () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      await videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }

  const seekToClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const track = event.currentTarget
    const rect = track.getBoundingClientRect()
    const ratio = clamp((event.clientX - rect.left) / rect.width, 0, 1)
    const nextTime = ratio * totalDuration
    setPlayhead(nextTime)
    if (videoRef.current) {
      videoRef.current.currentTime = nextTime
    }
  }

  const progress = clamp(playhead / Math.max(0.1, totalDuration), 0, 1)
  const eased = easeInOutCubic(progress)

  let effectiveZoom = videoZoom
  let effectiveTranslateX = 0
  let effectiveTranslateY = 0
  let effectiveOpacity = 1
  let transitionFilterExtra = ''
  let flashIntensity = 0

  switch (videoTransition) {
    case 'zoom-in':
      effectiveZoom = clamp(1 + eased * 0.85, 1, 1.85)
      effectiveTranslateX = (0.5 - (progress - 0.5)) * 14
      effectiveTranslateY = (0.5 - progress) * 10
      break
    case 'zoom-out':
      effectiveZoom = clamp(1.75 - eased * 0.75, 1, 1.75)
      effectiveTranslateX = (progress - 0.5) * 16
      effectiveTranslateY = (progress - 0.5) * 8
      break
    case 'fade':
      // Fade in at start, fade out at end
      effectiveOpacity = progress < 0.15
        ? easeInOutCubic(progress / 0.15)
        : progress > 0.85
          ? easeInOutCubic((1 - progress) / 0.15)
          : 1
      break
    case 'slide-left':
      effectiveTranslateX = (1 - eased) * 120 - 20
      effectiveOpacity = clamp(0.35 + eased * 0.65, 0.35, 1)
      break
    case 'slide-right':
      effectiveTranslateX = -(1 - eased) * 120 + 20
      effectiveOpacity = clamp(0.35 + eased * 0.65, 0.35, 1)
      break
    case 'ken-burns':
      effectiveZoom = clamp(1 + eased * 0.35, 1, 1.35)
      effectiveTranslateX = Math.sin(progress * Math.PI) * 28
      effectiveTranslateY = (progress - 0.5) * 18
      break
    case 'blur': {
      const blurAmt = progress < 0.2
        ? (1 - progress / 0.2) * 8
        : progress > 0.8
          ? ((progress - 0.8) / 0.2) * 8
          : 0
      transitionFilterExtra = blurAmt > 0.05 ? ` blur(${blurAmt.toFixed(2)}px)` : ''
      effectiveOpacity = progress < 0.2
        ? 0.4 + (progress / 0.2) * 0.6
        : progress > 0.8
          ? 1 - ((progress - 0.8) / 0.2) * 0.45
          : 1
      break
    }
    case 'flash': {
      // Flash peaks near start and mid-cut moments
      const pulse = Math.sin(progress * Math.PI * 2)
      flashIntensity = clamp(pulse * 0.55, 0, 0.7)
      effectiveZoom = clamp(1 + Math.abs(pulse) * 0.08, 1, 1.08)
      break
    }
    default:
      break
  }

  const combinedFilter = `${selectedEffect.filter}${transitionFilterExtra}`

  const sortedKeyframes = [...keyframes].sort((a, b) => a - b)
  const keyframePositions = sortedKeyframes
    .filter((time) => time >= 0 && time <= totalDuration)
    .map((time) => (time / totalDuration) * 100)

  const selectTool = (tool: ToolId, action?: () => void) => {
    action?.()
    setActiveTool(tool)
  }

  const activeTransition = TRANSITION_PRESETS.find((item) => item.id === videoTransition) ?? TRANSITION_PRESETS[0]

  return (
    <Container>
      <PreviewBlock>
        <VideoStage>
          <Video
            ref={videoRef}
            src={sourceUrl ?? undefined}
            controls={false}
            preload="metadata"
            $zoom={effectiveZoom}
            $translateX={effectiveTranslateX}
            $translateY={effectiveTranslateY}
            $opacity={effectiveOpacity}
            $filter={combinedFilter}
            onLoadedMetadata={() => {
              void detectKeyMoments()
            }}
            onTimeUpdate={(event) => {
              setPlayhead(event.currentTarget.currentTime)
            }}
          />
          <FlashOverlay $intensity={flashIntensity} />
        </VideoStage>

        <TransportBar>
          <TransportLeft>
            <PlayButton type="button" onClick={togglePreview} aria-label="Play or pause">
              ▶
            </PlayButton>
            <Timecode>
              {formatTime(playhead)}
              {' / '}
              {formatTime(totalDuration)}
            </Timecode>
          </TransportLeft>
          <TransportActions>
            <TransportBtn type="button" onClick={() => handleZoom('out')} aria-label="Zoom out">
              −
            </TransportBtn>
            <TransportBtn type="button" onClick={() => handleZoom('in')} aria-label="Zoom in">
              +
            </TransportBtn>
            <TransportBtn type="button" onClick={splitAtPlayhead} aria-label="Split">
              Split
            </TransportBtn>
            <TransportBtn
              type="button"
              onClick={async () => {
                const handle = ref && typeof ref !== 'function' ? ref.current : null
                await (handle as ShotstackEditorHandle | null)?.saveTrimmedClip()
              }}
            >
              Save clip
            </TransportBtn>
          </TransportActions>
        </TransportBar>
      </PreviewBlock>

      <Toolbar>
        <ToolGroup>
          <ToolBtn type="button" $active={activeTool === 'trim'} onClick={() => selectTool('trim')}>
            Trim
          </ToolBtn>
          <ToolBtn type="button" $active={activeTool === 'split'} onClick={() => selectTool('split', splitAtPlayhead)}>
            Split
          </ToolBtn>
          <ToolBtn type="button" $active={activeTool === 'cut'} onClick={() => selectTool('cut')}>
            Cut
          </ToolBtn>
        </ToolGroup>
        <ToolGroup>
          <ToolBtn type="button" $active={activeTool === 'crop'} onClick={() => selectTool('crop')}>
            Crop
          </ToolBtn>
          <ToolBtn type="button" $active={activeTool === 'zoom'} onClick={() => selectTool('zoom', () => handleZoom('in'))}>
            Zoom
          </ToolBtn>
          <ToolBtn type="button" $active={activeTool === 'transition'} onClick={() => selectTool('transition')}>
            Transition
          </ToolBtn>
        </ToolGroup>
        <ToolGroup>
          <ToolBtn type="button" $active={activeTool === 'speed'} onClick={() => selectTool('speed')}>
            Speed
          </ToolBtn>
          <ToolBtn type="button" $active={activeTool === 'caption'} onClick={() => selectTool('caption')}>
            Captions
          </ToolBtn>
          <ToolBtn type="button" $active={activeTool === 'effect'} onClick={() => selectTool('effect', addKeyframeAtPlayhead)}>
            Keyframe
          </ToolBtn>
        </ToolGroup>
      </Toolbar>

      <EffectsSection>
        <EffectsLabel>
          Transitions
          {videoTransition !== 'none' ? ` · ${activeTransition.name}` : ''}
        </EffectsLabel>
        <EffectsStrip>
          {TRANSITION_PRESETS.map((transition) => (
            <EffectChip
              key={transition.id}
              type="button"
              $active={videoTransition === transition.id}
              onClick={() => applyTransition(transition.id)}
              title={transition.description}
            >
              <EffectSwatch style={{ background: transition.accent }} />
              <EffectName>{transition.name}</EffectName>
            </EffectChip>
          ))}
        </EffectsStrip>
      </EffectsSection>

      <EffectsSection>
        <EffectsLabel>Look</EffectsLabel>
        <EffectsStrip>
          {EFFECT_PRESETS.map((effect) => (
            <EffectChip
              key={effect.id}
              type="button"
              $active={selectedEffect.id === effect.id}
              onClick={() => {
                setSelectedEffect(effect)
                setActiveTool('filter')
              }}
              title={effect.description}
            >
              <EffectSwatch style={{ background: effect.accent }} />
              <EffectName>{effect.name}</EffectName>
            </EffectChip>
          ))}
        </EffectsStrip>
      </EffectsSection>

      <TimelineBlock>
        <TimelineMeta>
          <span>Timeline</span>
          <span>{totalDuration.toFixed(1)}s</span>
        </TimelineMeta>
        <TimelineViewport>
          <Track id="editor-track" onClick={seekToClick}>
            <TrackRail />
            <TrackFill $left={startPercent} $width={selectionWidth} />
            {segments.map((segment, index) => (
              <SegmentBlock
                key={`${segment.start}-${segment.end}-${index}`}
                $left={(segment.start / totalDuration) * 100}
                $width={Math.max(1, ((segment.end - segment.start) / totalDuration) * 100)}
                $active={segment.start <= playhead && playhead <= segment.end}
              />
            ))}
            {keyframePositions.map((position, index) => {
              const time = sortedKeyframes[index] ?? 0
              return (
                <KeyframeDot
                  key={`${position}-${index}`}
                  $position={position}
                  $active={Math.abs(playhead - time) < 0.4}
                />
              )
            })}
            <Selection $left={startPercent} $width={selectionWidth} />
            <Handle
              type="button"
              aria-label="Trim start"
              style={{ left: `${startPercent}%` }}
              onMouseDown={(event) => {
                event.stopPropagation()
                setDragging('start')
              }}
            />
            <Handle
              type="button"
              aria-label="Trim end"
              style={{ left: `${endPercent}%` }}
              onMouseDown={(event) => {
                event.stopPropagation()
                setDragging('end')
              }}
            />
            <Playhead $position={playheadPercent} />
          </Track>
        </TimelineViewport>
      </TimelineBlock>
    </Container>
  )
})
