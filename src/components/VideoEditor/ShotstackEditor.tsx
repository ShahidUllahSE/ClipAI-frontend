import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  box-sizing: border-box;
`

const PreviewBlock = styled.div`
  display: grid;
  gap: 0;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.ink};
  box-shadow: ${({ theme }) => theme.shadows.md};
  isolation: isolate;
`

const VideoStage = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: min(22rem, 42vh);
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
  $crop: string
}>`
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: ${({ $crop }) => ($crop === 'none' ? 'contain' : 'cover')};
  object-position: ${({ $crop }) => {
    switch ($crop) {
      case 'top':
        return 'center top'
      case 'bottom':
        return 'center bottom'
      case 'tight':
        return 'center center'
      case 'center':
        return 'center center'
      default:
        return 'center center'
    }
  }};
  transform: translate(${({ $translateX }) => `${$translateX}px`}, ${({ $translateY }) => `${$translateY}px`})
    scale(${({ $zoom, $crop }) => ($crop === 'tight' ? $zoom * 1.25 : $zoom)});
  transform-origin: center center;
  opacity: ${({ $opacity }) => $opacity};
  filter: ${({ $filter }) => $filter};
  will-change: transform, opacity, filter;
`

const CaptionOverlay = styled.div<{ $position: 'bottom' | 'top' }>`
  position: absolute;
  left: 50%;
  ${({ $position }) => ($position === 'top' ? 'top: 1rem;' : 'bottom: 3.6rem;')}
  transform: translateX(-50%);
  max-width: 86%;
  padding: 0.45rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: rgba(18, 16, 31, 0.72);
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-align: center;
  line-height: 1.3;
  pointer-events: none;
  z-index: 4;
`

const ToolPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem 0.65rem;
  padding: 0.65rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.elevated};
  min-width: 0;
`

const ToolHint = styled.p`
  margin: 0;
  flex: 1 1 12rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.4;
`

const MiniControl = styled.button<{ $active?: boolean }>`
  appearance: none;
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, $active }) => ($active ? theme.colors.primarySoft : theme.colors.surface)};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.ink)};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 0.32rem 0.7rem;
  font-size: 0.72rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryMuted};
    color: ${({ theme }) => theme.colors.primary};
  }
`

const CaptionInput = styled.input`
  flex: 1 1 14rem;
  min-width: 10rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  padding: 0.4rem 0.65rem;
  font-size: 0.8125rem;
  font-family: ${({ theme }) => theme.fonts.body};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
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
  gap: 0.65rem;
  padding: 0.65rem 0.85rem;
  background: rgba(18, 16, 31, 0.96);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
`

const SeekBar = styled.div`
  flex: 1;
  min-width: 3rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const SeekTrack = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
`

const SeekFill = styled.div<{ $percent: number }>`
  position: absolute;
  inset: 0 auto 0 0;
  width: ${({ $percent }) => Math.min(100, Math.max(0, $percent))}%;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  pointer-events: none;
`

const SeekThumb = styled.div<{ $percent: number }>`
  position: absolute;
  top: 50%;
  left: ${({ $percent }) => Math.min(100, Math.max(0, $percent))}%;
  width: 12px;
  height: 12px;
  margin-left: -6px;
  margin-top: -6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  pointer-events: none;
`

const EffectsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
  max-width: 100%;
`

const EffectsStrip = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
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

const TimelineBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-width: 0;
  max-width: 100%;
`

const TimelineViewport = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.elevated};
  overflow: hidden;
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
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
`

const TransportLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
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

const SkipButton = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.75);
  min-width: 1.75rem;
  height: 1.75rem;
  padding: 0 0.25rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.65rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: -0.02em;
  cursor: pointer;
  flex-shrink: 0;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: rgba(255, 255, 255, 0.08);
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
  flex-shrink: 0;
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

const EffectsLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
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
  { id: 'zoom-in', name: 'Zoom in', description: 'Cinematic push-in', accent: 'linear-gradient(135deg, #7c3aed, #1e1b4b)' },
  { id: 'zoom-out', name: 'Zoom out', description: 'Cinematic pull-back', accent: 'linear-gradient(135deg, #c4b5fd, #7c3aed)' },
  { id: 'ken-burns', name: 'Ken Burns', description: 'Slow pan + zoom', accent: 'linear-gradient(135deg, #f59e0b, #7c3aed)' },
  { id: 'fade', name: 'Fade', description: 'Soft opacity', accent: 'linear-gradient(135deg, #1e1b4b, #f5f3ff)' },
  { id: 'slide-left', name: 'Slide ←', description: 'Drift left', accent: 'linear-gradient(90deg, #7c3aed, #a78bfa)' },
  { id: 'slide-right', name: 'Slide →', description: 'Drift right', accent: 'linear-gradient(270deg, #7c3aed, #a78bfa)' },
  { id: 'blur', name: 'Blur', description: 'Soft dissolve', accent: 'linear-gradient(135deg, #38bdf8, #c4b5fd)' },
  { id: 'flash', name: 'Flash', description: 'White flash cut', accent: 'linear-gradient(135deg, #ffffff, #7c3aed)' },
]

const TRANSITION_SPEED_PRESETS = [
  { id: 'fast', label: 'Fast', seconds: 0.8 },
  { id: 'normal', label: 'Normal', seconds: 1.4 },
  { id: 'smooth', label: 'Smooth', seconds: 2.2 },
  { id: 'cinematic', label: 'Cinematic', seconds: 3.5 },
] as const

type TransitionSpeedId = (typeof TRANSITION_SPEED_PRESETS)[number]['id']

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

/** Smoother cinematic curve for zoom push / pull. */
const easeInOutQuint = (t: number) =>
  t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

type CropId = 'none' | 'center' | 'top' | 'bottom' | 'tight'

const SPEED_PRESETS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const
const CROP_PRESETS: Array<{ id: CropId; label: string }> = [
  { id: 'none', label: 'Fit' },
  { id: 'center', label: 'Center' },
  { id: 'tight', label: 'Tight' },
  { id: 'top', label: 'Top' },
  { id: 'bottom', label: 'Bottom' },
]

const buildTimelineJson = (
  src: string,
  start: number,
  end: number,
  keyframes: number[] = [],
  segments: Array<{ start: number; end: number }> = [],
  selectedEffect: EffectPreset | null = null,
  videoTransition: TransitionId = 'none',
  extras: {
    speed?: number
    crop?: CropId
    captionsEnabled?: boolean
    captionText?: string
    zoom?: number
    transitionDuration?: number
    transitionSpeed?: TransitionSpeedId
  } = {},
) => ({
  timeline: {
    tracks: [
      {
        clips: [
          {
            asset: { type: 'video', src },
            start,
            length: Math.max(0.1, end - start),
            transition: videoTransition !== 'none'
              ? {
                  in: videoTransition,
                  out: videoTransition,
                  duration: extras.transitionDuration ?? 2.2,
                }
              : undefined,
            speed: extras.speed ?? 1,
            crop: extras.crop ?? 'none',
            zoom: extras.zoom ?? 1,
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
      ? {
          type: videoTransition,
          duration: extras.transitionDuration ?? 2.2,
          speed: extras.transitionSpeed ?? 'smooth',
        }
      : null,
    captions: extras.captionsEnabled
      ? [{ text: extras.captionText || '', start, end }]
      : [],
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
      ? {
          type: videoTransition,
          duration: extras.transitionDuration ?? 2.2,
          speed: extras.transitionSpeed ?? 'smooth',
        }
      : null,
    speed: extras.speed ?? 1,
    crop: extras.crop ?? 'none',
    zoom: extras.zoom ?? 1,
    captionsEnabled: Boolean(extras.captionsEnabled),
    captionText: extras.captionText || '',
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
  const [isPlaying, setIsPlaying] = useState(false)
  const [dragging, setDragging] = useState<'start' | 'end' | null>(null)
  const [keyframes, setKeyframes] = useState<number[]>([])
  const [segments, setSegments] = useState<Array<{ start: number; end: number }>>([])
  const [videoZoom, setVideoZoom] = useState(1)
  const [videoTransition, setVideoTransition] = useState<TransitionId>('none')
  const [transitionSpeedId, setTransitionSpeedId] = useState<TransitionSpeedId>('smooth')
  const [selectedEffect, setSelectedEffect] = useState<EffectPreset>(EFFECT_PRESETS[0])
  const [activeTool, setActiveTool] = useState<ToolId>('trim')
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [cropPreset, setCropPreset] = useState<CropId>('none')
  const [captionsEnabled, setCaptionsEnabled] = useState(false)
  const [captionText, setCaptionText] = useState('')
  const [captionPosition, setCaptionPosition] = useState<'bottom' | 'top'>('bottom')
  const [toolMessage, setToolMessage] = useState('Drag the purple handles to set in/out points.')
  const transitionsRef = useRef<HTMLDivElement | null>(null)

  const transitionDuration =
    TRANSITION_SPEED_PRESETS.find((item) => item.id === transitionSpeedId)?.seconds ?? 2.2

  const editorExtras = {
    speed: playbackSpeed,
    crop: cropPreset,
    captionsEnabled,
    captionText,
    zoom: videoZoom,
    transitionDuration,
    transitionSpeed: transitionSpeedId,
  }

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

    const json = buildTimelineJson(nextUrl, 0, total, autoKeyframes, defaultSegments, selectedEffect, videoTransition, editorExtras)
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
    const current = buildTimelineJson(sourceUrl, trimStart, trimEnd, keyframes, segments, selectedEffect, videoTransition, editorExtras)
    notifyTimelineChange(current)
  }, [sourceUrl, trimStart, trimEnd, keyframes, segments, selectedEffect, videoTransition, playbackSpeed, cropPreset, captionsEnabled, captionText, videoZoom, transitionSpeedId, transitionDuration])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed
    }
  }, [playbackSpeed, sourceUrl])

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

  const saveTrimmedClip = async (): Promise<File | null> => {
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
    Object.defineProperty(savedFile, 'duration', {
      value: Math.max(0.1, trimEnd - trimStart),
      enumerable: true,
    })

    onCutSaved?.(savedFile)
    setToolMessage(`Clip saved · ${formatTime(trimStart)}–${formatTime(trimEnd)}`)
    return savedFile
  }

  useImperativeHandle(ref, () => ({
    async getTimelineJson() {
      const src = sourceUrl || fileUrlRef.current || ''
      return buildTimelineJson(src, trimStart, trimEnd, keyframes, segments, selectedEffect, videoTransition, editorExtras)
    },
    saveTrimmedClip,
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
    setToolMessage(`Keyframe added at ${formatTime(nextTime)}`)
  }

  const removeNearestKeyframe = () => {
    if (!keyframes.length) {
      setToolMessage('No keyframes to remove.')
      return
    }
    let nearest = keyframes[0]
    let best = Math.abs(playhead - nearest)
    for (const time of keyframes) {
      const dist = Math.abs(playhead - time)
      if (dist < best) {
        best = dist
        nearest = time
      }
    }
    setKeyframes((current) => current.filter((time) => time !== nearest))
    setToolMessage(`Removed keyframe at ${formatTime(nearest)}`)
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
    setToolMessage(`Split at ${formatTime(splitPoint)}`)
  }

  const cutAtPlayhead = () => {
    const cutPoint = clamp(playhead, 0, totalDuration)
    const active = segments.find((segment) => segment.start <= cutPoint && cutPoint <= segment.end)

    if (active && active.end - active.start > 0.6) {
      // Remove a short bite around the playhead from the active segment
      const bite = 0.35
      const leftEnd = Math.max(active.start, cutPoint - bite)
      const rightStart = Math.min(active.end, cutPoint + bite)
      setSegments((current) => {
        const next: Array<{ start: number; end: number }> = []
        for (const segment of current) {
          if (segment !== active) {
            next.push(segment)
            continue
          }
          if (leftEnd - segment.start >= 0.25) next.push({ start: segment.start, end: leftEnd })
          if (segment.end - rightStart >= 0.25) next.push({ start: rightStart, end: segment.end })
        }
        return next.length ? next : [{ start: trimStart, end: trimEnd }]
      })
      setToolMessage(`Cut gap around ${formatTime(cutPoint)}`)
    } else {
      // Fallback: tighten trim to the kept selection / playhead side
      if (cutPoint - trimStart > trimEnd - cutPoint) {
        setTrimEnd(Math.max(trimStart + 0.3, cutPoint))
      } else {
        setTrimStart(Math.min(trimEnd - 0.3, cutPoint))
      }
      setToolMessage(`Cut applied · trim updated at ${formatTime(cutPoint)}`)
    }
    setActiveTool('cut')
  }

  const activateTrim = () => {
    setActiveTool('trim')
    setToolMessage('Trim mode: drag the purple handles on the timeline to set in/out.')
  }

  const handleZoom = (direction: 'in' | 'out') => {
    setVideoZoom((value) => {
      const next = direction === 'in' ? value + 0.15 : value - 0.15
      const clamped = clamp(next, 0.8, 2.4)
      setToolMessage(`Zoom ${clamped.toFixed(2)}×`)
      return clamped
    })
    setActiveTool('zoom')
  }

  const cycleCrop = (next?: CropId) => {
    if (next) {
      setCropPreset(next)
      setActiveTool('crop')
      setToolMessage(`Crop: ${CROP_PRESETS.find((c) => c.id === next)?.label ?? next}`)
      return
    }
    const index = CROP_PRESETS.findIndex((c) => c.id === cropPreset)
    const picked = CROP_PRESETS[(index + 1) % CROP_PRESETS.length]
    setCropPreset(picked.id)
    setActiveTool('crop')
    setToolMessage(`Crop: ${picked.label}`)
  }

  const setSpeed = (speed: number) => {
    setPlaybackSpeed(speed)
    setActiveTool('speed')
    setToolMessage(`Playback speed ${speed}×`)
    if (videoRef.current) videoRef.current.playbackRate = speed
  }

  const cycleSpeed = () => {
    const index = SPEED_PRESETS.findIndex((value) => value === playbackSpeed)
    const next = SPEED_PRESETS[(index + 1) % SPEED_PRESETS.length]
    setSpeed(next)
  }

  const toggleCaptions = () => {
    setCaptionsEnabled((value) => {
      const next = !value
      setToolMessage(next ? 'Captions on — edit the text below.' : 'Captions off')
      if (next && !captionText.trim()) {
        setCaptionText('Your caption here')
      }
      return next
    })
    setActiveTool('caption')
  }

  const focusTransitions = () => {
    setActiveTool('transition')
    setToolMessage('Pick Zoom in / Zoom out, then set transition speed below.')
    transitionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  const setTransitionSpeed = (speedId: TransitionSpeedId) => {
    setTransitionSpeedId(speedId)
    const seconds = TRANSITION_SPEED_PRESETS.find((item) => item.id === speedId)?.seconds ?? 2.2
    setActiveTool('transition')
    setToolMessage(`Transition speed: ${speedId} (${seconds.toFixed(1)}s)`)
  }

  const applyTransition = (transitionId: TransitionId) => {
    setVideoTransition(transitionId)
    setActiveTool('transition')

    // Zoom transitions look best a bit slower — nudge to cinematic if still on Fast
    if ((transitionId === 'zoom-in' || transitionId === 'zoom-out') && transitionSpeedId === 'fast') {
      setTransitionSpeedId('cinematic')
    }

    const speedLabel =
      TRANSITION_SPEED_PRESETS.find((item) => item.id === (
        (transitionId === 'zoom-in' || transitionId === 'zoom-out') && transitionSpeedId === 'fast'
          ? 'cinematic'
          : transitionSpeedId
      ))?.seconds ?? transitionDuration

    setToolMessage(
      transitionId === 'none'
        ? 'Transition cleared'
        : `${TRANSITION_PRESETS.find((t) => t.id === transitionId)?.name ?? transitionId} · ${speedLabel.toFixed(1)}s — hit play to preview`,
    )

    if (transitionId === 'none') return

    const startTime = Number(trimStart.toFixed(2))
    const endTime = Number(trimEnd.toFixed(2))
    setKeyframes((current) => {
      const merged = [...current, startTime, endTime].filter((value, index, arr) => arr.indexOf(value) === index)
      return [...merged].sort((a, b) => a - b)
    })
  }

  const seekToTime = (nextTime: number) => {
    const clamped = clamp(nextTime, 0, totalDuration)
    setPlayhead(clamped)
    if (videoRef.current) {
      videoRef.current.currentTime = clamped
    }
  }

  const seekBy = (deltaSeconds: number) => {
    const current = videoRef.current?.currentTime ?? playhead
    seekToTime(current + deltaSeconds)
  }

  const togglePreview = async () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      // Restart from start when already at the end
      if (videoRef.current.ended || playhead >= totalDuration - 0.05) {
        videoRef.current.currentTime = trimStart
        setPlayhead(trimStart)
      } else if (videoTransition === 'zoom-in') {
        // For zoom transitions, restart near the transition window so speed is obvious
        videoRef.current.currentTime = trimStart
      } else if (videoTransition === 'zoom-out') {
        videoRef.current.currentTime = Math.max(trimStart, trimEnd - transitionDuration)
      }
      await videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }

  const seekToClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const track = event.currentTarget
    const rect = track.getBoundingClientRect()
    const ratio = clamp((event.clientX - rect.left) / rect.width, 0, 1)
    seekToTime(ratio * totalDuration)
  }

  // Transition progress is driven by the user-selected duration (not the whole clip).
  const clipSpan = Math.max(0.2, trimEnd - trimStart)
  const localDuration = clamp(transitionDuration, 0.4, clipSpan)

  let rawTransitionProgress = 0
  if (videoTransition === 'none') {
    rawTransitionProgress = 0
  } else if (videoTransition === 'zoom-out') {
    const windowStart = Math.max(trimStart, trimEnd - localDuration)
    rawTransitionProgress = clamp((playhead - windowStart) / localDuration, 0, 1)
  } else if (videoTransition === 'ken-burns') {
    rawTransitionProgress = clamp((playhead - trimStart) / clipSpan, 0, 1)
  } else {
    // zoom-in, fade, slides, blur, flash — play over the opening window
    rawTransitionProgress = clamp((playhead - trimStart) / localDuration, 0, 1)
  }

  const eased = easeInOutQuint(rawTransitionProgress)
  const softEased = easeInOutCubic(rawTransitionProgress)

  let effectiveZoom = videoZoom
  let effectiveTranslateX = 0
  let effectiveTranslateY = 0
  let effectiveOpacity = 1
  let transitionFilterExtra = ''
  let flashIntensity = 0

  switch (videoTransition) {
    case 'zoom-in': {
      // Cinematic push-in: gentle start, confident finish
      const zoomAmount = 0.55
      effectiveZoom = clamp(1 + eased * zoomAmount, 1, 1.55)
      effectiveTranslateX = (1 - eased) * -10
      effectiveTranslateY = (1 - eased) * 6
      break
    }
    case 'zoom-out': {
      // Start tight, pull back to reveal
      const zoomAmount = 0.55
      effectiveZoom = clamp(1 + zoomAmount - eased * zoomAmount, 1, 1.55)
      effectiveTranslateX = eased * 8
      effectiveTranslateY = eased * -4
      break
    }
    case 'fade':
      effectiveOpacity = softEased
      break
    case 'slide-left':
      effectiveTranslateX = (1 - eased) * 56
      effectiveOpacity = clamp(0.4 + eased * 0.6, 0.4, 1)
      break
    case 'slide-right':
      effectiveTranslateX = -(1 - eased) * 56
      effectiveOpacity = clamp(0.4 + eased * 0.6, 0.4, 1)
      break
    case 'ken-burns':
      effectiveZoom = clamp(1 + softEased * 0.32, 1, 1.32)
      effectiveTranslateX = Math.sin(rawTransitionProgress * Math.PI) * 18
      effectiveTranslateY = (rawTransitionProgress - 0.5) * 12
      break
    case 'blur': {
      const blurAmt = (1 - softEased) * 7
      transitionFilterExtra = blurAmt > 0.05 ? ` blur(${blurAmt.toFixed(2)}px)` : ''
      effectiveOpacity = clamp(0.45 + softEased * 0.55, 0.45, 1)
      break
    }
    case 'flash': {
      const pulse = Math.sin(rawTransitionProgress * Math.PI)
      flashIntensity = clamp(pulse * 0.65, 0, 0.75)
      effectiveZoom = clamp(1 + Math.abs(pulse) * 0.1, 1, 1.1)
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
            $crop={cropPreset}
            onLoadedMetadata={() => {
              void detectKeyMoments()
              if (videoRef.current) videoRef.current.playbackRate = playbackSpeed
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onTimeUpdate={(event) => {
              setPlayhead(event.currentTarget.currentTime)
            }}
          />
          <FlashOverlay $intensity={flashIntensity} />
          {captionsEnabled && captionText.trim() && (
            <CaptionOverlay $position={captionPosition}>{captionText}</CaptionOverlay>
          )}
        </VideoStage>

        <TransportBar>
          <TransportLeft>
            <SkipButton type="button" onClick={() => seekBy(-5)} aria-label="Back 5 seconds" title="Back 5s">
              −5s
            </SkipButton>
            <PlayButton type="button" onClick={togglePreview} aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? '❚❚' : '▶'}
            </PlayButton>
            <SkipButton type="button" onClick={() => seekBy(5)} aria-label="Forward 5 seconds" title="Forward 5s">
              +5s
            </SkipButton>
            <Timecode>
              {formatTime(playhead)}
              {' / '}
              {formatTime(totalDuration)}
              {playbackSpeed !== 1 ? ` · ${playbackSpeed}×` : ''}
            </Timecode>
          </TransportLeft>
          <SeekBar
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.round(totalDuration)}
            aria-valuenow={Math.round(playhead)}
            onClick={seekToClick}
          >
            <SeekTrack>
              <SeekFill $percent={playheadPercent} />
              <SeekThumb $percent={playheadPercent} />
            </SeekTrack>
          </SeekBar>
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
            <TransportBtn type="button" onClick={() => void saveTrimmedClip()}>
              Save clip
            </TransportBtn>
          </TransportActions>
        </TransportBar>
      </PreviewBlock>

      <Toolbar>
        <ToolGroup>
          <ToolBtn type="button" $active={activeTool === 'trim'} onClick={activateTrim}>
            Trim
          </ToolBtn>
          <ToolBtn type="button" $active={activeTool === 'split'} onClick={splitAtPlayhead}>
            Split
          </ToolBtn>
          <ToolBtn type="button" $active={activeTool === 'cut'} onClick={cutAtPlayhead}>
            Cut
          </ToolBtn>
        </ToolGroup>
        <ToolGroup>
          <ToolBtn type="button" $active={activeTool === 'crop'} onClick={() => cycleCrop()}>
            Crop
          </ToolBtn>
          <ToolBtn type="button" $active={activeTool === 'zoom'} onClick={() => handleZoom('in')}>
            Zoom
          </ToolBtn>
          <ToolBtn type="button" $active={activeTool === 'transition'} onClick={focusTransitions}>
            Transition
          </ToolBtn>
        </ToolGroup>
        <ToolGroup>
          <ToolBtn type="button" $active={activeTool === 'speed'} onClick={cycleSpeed}>
            Speed
          </ToolBtn>
          <ToolBtn type="button" $active={activeTool === 'caption'} onClick={toggleCaptions}>
            Captions
          </ToolBtn>
          <ToolBtn type="button" $active={activeTool === 'effect'} onClick={addKeyframeAtPlayhead}>
            Keyframe
          </ToolBtn>
        </ToolGroup>
      </Toolbar>

      <ToolPanel>
        <ToolHint>{toolMessage}</ToolHint>

        {activeTool === 'trim' && (
          <>
            <MiniControl type="button" onClick={() => { setTrimStart(0); setTrimEnd(totalDuration); setToolMessage('Trim reset to full clip') }}>
              Reset trim
            </MiniControl>
            <MiniControl type="button" onClick={() => { setTrimStart(playhead); setToolMessage(`In point → ${formatTime(playhead)}`) }}>
              Mark in
            </MiniControl>
            <MiniControl type="button" onClick={() => { setTrimEnd(Math.max(trimStart + 0.3, playhead)); setToolMessage(`Out point → ${formatTime(playhead)}`) }}>
              Mark out
            </MiniControl>
          </>
        )}

        {activeTool === 'split' && (
          <MiniControl type="button" onClick={splitAtPlayhead}>Split at playhead</MiniControl>
        )}

        {activeTool === 'cut' && (
          <MiniControl type="button" onClick={cutAtPlayhead}>Cut at playhead</MiniControl>
        )}

        {activeTool === 'crop' &&
          CROP_PRESETS.map((crop) => (
            <MiniControl
              key={crop.id}
              type="button"
              $active={cropPreset === crop.id}
              onClick={() => cycleCrop(crop.id)}
            >
              {crop.label}
            </MiniControl>
          ))}

        {activeTool === 'zoom' && (
          <>
            <MiniControl type="button" onClick={() => handleZoom('out')}>Zoom −</MiniControl>
            <MiniControl type="button" onClick={() => handleZoom('in')}>Zoom +</MiniControl>
            <MiniControl type="button" onClick={() => { setVideoZoom(1); setToolMessage('Zoom reset to 1×') }}>Reset</MiniControl>
          </>
        )}

        {activeTool === 'speed' &&
          SPEED_PRESETS.map((speed) => (
            <MiniControl
              key={speed}
              type="button"
              $active={playbackSpeed === speed}
              onClick={() => setSpeed(speed)}
            >
              {speed}×
            </MiniControl>
          ))}

        {activeTool === 'caption' && (
          <>
            <MiniControl type="button" $active={captionsEnabled} onClick={toggleCaptions}>
              {captionsEnabled ? 'On' : 'Off'}
            </MiniControl>
            <MiniControl
              type="button"
              $active={captionPosition === 'bottom'}
              onClick={() => setCaptionPosition('bottom')}
            >
              Bottom
            </MiniControl>
            <MiniControl
              type="button"
              $active={captionPosition === 'top'}
              onClick={() => setCaptionPosition('top')}
            >
              Top
            </MiniControl>
            <CaptionInput
              value={captionText}
              onChange={(event) => setCaptionText(event.target.value)}
              placeholder="Caption text"
            />
          </>
        )}

        {activeTool === 'effect' && (
          <>
            <MiniControl type="button" onClick={addKeyframeAtPlayhead}>Add keyframe</MiniControl>
            <MiniControl type="button" onClick={removeNearestKeyframe}>Remove nearest</MiniControl>
          </>
        )}

        {activeTool === 'transition' && (
          <>
            {TRANSITION_SPEED_PRESETS.map((speed) => (
              <MiniControl
                key={speed.id}
                type="button"
                $active={transitionSpeedId === speed.id}
                onClick={() => setTransitionSpeed(speed.id)}
              >
                {speed.label} · {speed.seconds}s
              </MiniControl>
            ))}
          </>
        )}
      </ToolPanel>

      <EffectsSection ref={transitionsRef}>
        <EffectsLabel>
          Transitions
          {videoTransition !== 'none'
            ? ` · ${activeTransition.name} · ${transitionDuration.toFixed(1)}s`
            : ''}
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
        {videoTransition !== 'none' && (
          <ToolPanel style={{ marginTop: '0.35rem' }}>
            <ToolHint>
              Transition speed controls how long the motion lasts.
              {(videoTransition === 'zoom-in' || videoTransition === 'zoom-out') &&
                ' Zoom in/out look best on Smooth or Cinematic.'}
            </ToolHint>
            {TRANSITION_SPEED_PRESETS.map((speed) => (
              <MiniControl
                key={`speed-${speed.id}`}
                type="button"
                $active={transitionSpeedId === speed.id}
                onClick={() => setTransitionSpeed(speed.id)}
              >
                {speed.label}
              </MiniControl>
            ))}
          </ToolPanel>
        )}
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
