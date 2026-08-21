import { apiFetch } from './client'
import type {
  CreateProjectInput,
  ProjectStatus,
  VideoProject,
} from '@/types/app'

interface ProjectResponse {
  project: VideoProject
}

interface ProjectsResponse {
  projects: VideoProject[]
}

interface ProcessResponse {
  project: VideoProject
  job: { id: string; status: string }
}

const TERMINAL: ProjectStatus[] = ['Completed', 'Failed']

async function pollProject(
  id: string,
  onStatus: (status: ProjectStatus) => void,
): Promise<VideoProject> {
  let last: ProjectStatus | null = null
  for (let i = 0; i < 120; i++) {
    await new Promise((r) => setTimeout(r, 1000))
    const { project } = await apiFetch<ProjectResponse>(`/projects/${id}`)
    if (project.status !== last) {
      last = project.status
      onStatus(project.status)
    }
    if (TERMINAL.includes(project.status)) return project
  }
  throw new Error('Processing timed out. Refresh and check project status.')
}

export const projectsApi = {
  async list(_userId: string): Promise<VideoProject[]> {
    const data = await apiFetch<ProjectsResponse>('/projects')
    return data.projects
  },

  async get(id: string, _userId: string): Promise<VideoProject | null> {
    try {
      const data = await apiFetch<ProjectResponse>(`/projects/${id}`)
      return data.project
    } catch {
      return null
    }
  },

  async create(
    _userId: string,
    input: CreateProjectInput,
  ): Promise<VideoProject> {
    const form = new FormData()
    form.append('file', input.file)
    form.append('durationSeconds', String(input.durationSeconds))

    const uploadData = await apiFetch<{
      upload: { id: string }
    }>('/uploads', {
      method: 'POST',
      body: form,
    })

    const data = await apiFetch<ProjectResponse>('/projects', {
      method: 'POST',
      body: JSON.stringify({
        uploadId: uploadData.upload.id,
        mode: input.mode,
        options: input.options,
        title: input.title,
        durationSeconds: input.durationSeconds,
      }),
    })
    return data.project
  },

  async update(
    id: string,
    _userId: string,
    patch: Partial<
      Pick<
        VideoProject,
        'title' | 'generatedTitle' | 'outputFilename' | 'status' | 'errorMessage'
      >
    >,
  ): Promise<VideoProject> {
    const data = await apiFetch<ProjectResponse>(`/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: patch.title,
        generatedTitle: patch.generatedTitle,
        outputFilename: patch.outputFilename,
      }),
    })
    return data.project
  },

  async remove(id: string, _userId: string): Promise<void> {
    await apiFetch(`/projects/${id}`, { method: 'DELETE' })
  },

  async startProcessing(
    id: string,
    _userId: string,
    onStatus: (status: ProjectStatus) => void,
  ): Promise<VideoProject> {
    const started = await apiFetch<ProcessResponse>(`/projects/${id}/process`, {
      method: 'POST',
    })
    onStatus(started.project.status)
    return pollProject(id, onStatus)
  },

  async retry(
    id: string,
    _userId: string,
    onStatus: (s: ProjectStatus) => void,
  ): Promise<VideoProject> {
    const started = await apiFetch<ProcessResponse>(`/projects/${id}/retry`, {
      method: 'POST',
    })
    onStatus(started.project.status)
    return pollProject(id, onStatus)
  },
}
