import type { CreateProjectInput, ProjectStatus, User, VideoProject } from '@/types/app'

/**
 * Facade for real HTTP endpoints later.
 * Example mappings:
 *  POST /auth/register
 *  POST /auth/login
 *  GET  /projects
 *  POST /projects  (multipart upload)
 *  POST /projects/:id/process
 *  GET  /projects/:id
 */
export type { CreateProjectInput, ProjectStatus, User, VideoProject }

export { authApi } from './authApi'
export { adminApi } from './adminApi'
export { captionsApi } from './captionsApi'
export { projectsApi } from './projectsApi'
export { API_BASE_URL, ApiError, apiDelay, apiFetch, getToken } from './client'
