export type {
  User,
  VideoProject,
  ProjectStatus,
  ProjectOptions,
  EditingModeId,
  PlanId,
  CreateProjectInput,
} from './app'

export {
  DEFAULT_PROJECT_OPTIONS,
  PLAN_EDIT_QUOTA,
  UPLOAD_LIMITS,
  PROJECT_STATUS_FLOW,
} from './app'

export interface Video {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  duration: number
  createdAt: string
}

export type Nullable<T> = T | null
export type Optional<T> = T | undefined
