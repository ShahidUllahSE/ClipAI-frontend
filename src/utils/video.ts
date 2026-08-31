import {
  UPLOAD_LIMITS,
  type EditingModeId,
  type ProjectOptions,
} from '@/types/app'

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

export function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function modeLabel(mode: EditingModeId) {
  switch (mode) {
    case 'talking-head':
      return 'Talking-head'
    case 'rapid-cut':
      return 'Rapid-cut'
    case 'asmr':
      return 'ASMR & unboxing'
    case 'ai-combine':
      return 'AI Combine'
  }
}

export function statusTone(status: string): 'neutral' | 'active' | 'ok' | 'bad' {
  if (status === 'Completed') return 'ok'
  if (status === 'Failed') return 'bad'
  if (
    status === 'Queued' ||
    status === 'Analyzing' ||
    status === 'Preparing edit' ||
    status === 'Rendering' ||
    status === 'Uploading'
  )
    return 'active'
  return 'neutral'
}

export async function readVideoDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.onloadedmetadata = () => {
      const duration = video.duration
      URL.revokeObjectURL(url)
      if (!Number.isFinite(duration) || duration <= 0) {
        reject(new Error('Could not read video duration.'))
        return
      }
      resolve(duration)
    }
    video.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not load video for validation.'))
    }
    video.src = url
  })
}

export async function validateVideoFile(file: File): Promise<{
  ok: true
  durationSeconds: number
} | { ok: false; error: string }> {
  const name = file.name.toLowerCase()
  const extOk = UPLOAD_LIMITS.acceptExt.some((ext) => name.endsWith(ext))
  const mimeOk =
    !file.type ||
    (UPLOAD_LIMITS.acceptMime as readonly string[]).includes(file.type)

  if (!extOk && !mimeOk) {
    return {
      ok: false,
      error: 'Unsupported format. Use MP4, MOV, or WebM.',
    }
  }

  if (file.size > UPLOAD_LIMITS.maxBytes) {
    return {
      ok: false,
      error: `File is too large. Maximum size is ${formatBytes(UPLOAD_LIMITS.maxBytes)}.`,
    }
  }

  try {
    const durationSeconds = await readVideoDuration(file)
    if (durationSeconds > UPLOAD_LIMITS.maxDurationSeconds) {
      return {
        ok: false,
        error: `Video is too long. Maximum duration is ${UPLOAD_LIMITS.maxDurationSeconds / 60} minutes.`,
      }
    }
    return { ok: true, durationSeconds }
  } catch {
    return {
      ok: false,
      error: 'Could not validate video duration. Try another file.',
    }
  }
}

export function optionsSummary(options: Partial<ProjectOptions> = {}): string[] {
  const lines: string[] = [
    `Aspect ${options.aspectRatio ?? '9:16'}`,
    options.captions
      ? `Captions (${options.captionPosition ?? 'bottom'})`
      : 'Captions off',
    `Speed ramp: ${options.speedRamp ?? 'off'}`,
    options.keyframing
      ? `Keyframes: ${options.keyframePreset ?? 'speaker-punch-in'}`
      : 'Keyframes off',
    options.keepAudio !== false ? 'Original audio on' : 'Audio muted',
    options.audioNormalize !== false
      ? 'Audio normalize on'
      : 'Audio normalize off',
    `Crop: ${options.cropPreset ?? 'none'}`,
    `Grade: ${options.colorGrade ?? 'none'}`,
    options.fadeInOut !== false ? 'Fade in/out on' : 'Fade in/out off',
    options.mirrorHorizontal ? 'Mirror on' : 'Mirror off',
    options.introTitleCard !== false
      ? 'Intro title card on'
      : 'Intro title card off',
  ]
  return lines
}
