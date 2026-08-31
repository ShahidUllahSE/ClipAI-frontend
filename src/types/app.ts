/** Domain types for the ClipAI app (ready to mirror API payloads). */

export type PlanId = 'basic' | 'standard' | 'pro' | 'unlimited'
export type BillingStatus = 'active' | 'past_due' | 'canceled' | 'none'
export type UserRole = 'user' | 'admin'

export type EditingModeId = 'talking-head' | 'rapid-cut' | 'asmr' | 'ai-combine'

export type ProjectStatus =
  | 'Uploading'
  | 'Uploaded'
  | 'Queued'
  | 'Analyzing'
  | 'Preparing edit'
  | 'Rendering'
  | 'Completed'
  | 'Failed'

export type AspectRatio = '9:16' | '1:1' | '16:9'
export type SilenceSensitivity = 'light' | 'medium' | 'aggressive'
export type PacingLevel = 'normal' | 'fast' | 'very-fast'
export type SpeedRampLevel = 'off' | 'light' | 'medium' | 'aggressive'
export type CaptionPosition = 'bottom' | 'top'
export type KeyframePreset =
  | 'slow-zoom-in'
  | 'slow-zoom-out'
  | 'speaker-punch-in'
  | 'product-reveal-zoom'
export type CropPreset = 'none' | 'center' | 'top' | 'bottom' | 'tight'
export type ColorGrade = 'none' | 'clean' | 'warm' | 'cool' | 'vivid'

export interface ProjectOptions {
  captions: boolean
  captionPosition: CaptionPosition
  aspectRatio: AspectRatio
  silenceSensitivity: SilenceSensitivity
  pacing: PacingLevel
  speedRamp: SpeedRampLevel
  keyframing: boolean
  keyframePreset: KeyframePreset
  keepAudio: boolean
  audioNormalize: boolean
  /** ClipAI local studio tools (no API keys) */
  cropPreset: CropPreset
  colorGrade: ColorGrade
  fadeInOut: boolean
  mirrorHorizontal: boolean
  introTitleCard: boolean
  timelineJson?: any
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  isActive: boolean
  planId: PlanId
  remainingEdits: number
  billingStatus: BillingStatus
  emailVerified: boolean
  createdAt?: string
  updatedAt?: string
}

export interface VideoProject {
  id: string
  userId: string
  title: string
  originalFilename: string
  fileSize: number
  durationSeconds: number
  mimeType: string
  mode: EditingModeId
  options: ProjectOptions
  status: ProjectStatus
  generatedTitle: string
  outputFilename: string
  createdAt: string
  updatedAt: string
  errorMessage?: string
  /** Prefer outputUrl when completed; else source */
  previewUrl?: string
  outputUrl?: string
  analysis?: {
    notes?: string[]
    removedSeconds?: number
    outputDurationSeconds?: number
  }
  editPlan?: {
    cuts?: Array<{ start: number; end: number }>
    notes?: string[]
  }
}

export interface CreateProjectInput {
  file: File
  secondaryFile?: File
  durationSeconds: number
  secondaryDurationSeconds?: number
  mode: EditingModeId
  options: ProjectOptions
  title?: string
}

export const DEFAULT_PROJECT_OPTIONS: ProjectOptions = {
  captions: true,
  captionPosition: 'bottom',
  aspectRatio: '9:16',
  silenceSensitivity: 'medium',
  pacing: 'fast',
  speedRamp: 'light',
  keyframing: true,
  keyframePreset: 'speaker-punch-in',
  keepAudio: true,
  audioNormalize: true,
  cropPreset: 'center',
  colorGrade: 'clean',
  fadeInOut: true,
  mirrorHorizontal: false,
  introTitleCard: true,
}

export const PLAN_EDIT_QUOTA: Record<PlanId, number> = {
  basic: 50,
  standard: 100,
  pro: 200,
  unlimited: 9999,
}

export const UPLOAD_LIMITS = {
  maxBytes: 2 * 1024 * 1024 * 1024,
  maxDurationSeconds: 20 * 60,
  acceptMime: ['video/mp4', 'video/quicktime', 'video/webm'] as const,
  acceptExt: ['.mp4', '.mov', '.webm'] as const,
} as const

export const PROJECT_STATUS_FLOW: ProjectStatus[] = [
  'Queued',
  'Analyzing',
  'Preparing edit',
  'Rendering',
  'Completed',
]
