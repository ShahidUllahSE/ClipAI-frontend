import { API_BASE_URL, ApiError, apiFetch, getToken } from './client'
import type {
  CreateProjectInput,
  ProjectStatus,
  UploadProgress,
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

interface UploadResponse {
  upload: { id: string }
}

interface UploadSessionResponse {
  upload?: { id: string }
  session: {
    id: string
    chunkSize: number
    totalChunks: number
    uploadedChunks: number[]
    totalSize: number
  }
}

const TERMINAL: ProjectStatus[] = ['Completed', 'Failed']

function chunkBytes(fileSize: number, chunkSize: number, index: number) {
  return Math.max(0, Math.min(chunkSize, fileSize - index * chunkSize))
}

function uploadChunk(
  sessionId: string,
  index: number,
  chunk: Blob,
  onProgress: (loaded: number) => void,
) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(
      'POST',
      `${API_BASE_URL}/uploads/sessions/${sessionId}/chunks/${index}`,
    )
    xhr.timeout = 10 * 60 * 1000
    const token = getToken()
    if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(Math.min(chunk.size, event.loaded))
    }
    xhr.onerror = () => reject(new ApiError('Upload connection was interrupted.', 503))
    xhr.ontimeout = () => reject(new ApiError('Upload chunk timed out.', 504))
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(chunk.size)
        resolve()
        return
      }
      let message = 'Chunk upload failed.'
      try {
        message = JSON.parse(xhr.responseText)?.message || message
      } catch {
        // Keep the safe fallback message.
      }
      reject(new ApiError(message, xhr.status || 500))
    }
    const form = new FormData()
    form.append('chunk', chunk, `chunk-${index}`)
    xhr.send(form)
  })
}

async function uploadFileResumable(
  file: File,
  durationSeconds: number,
  onProgress?: (progress: UploadProgress) => void,
): Promise<UploadResponse> {
  const fingerprint = [
    file.name,
    file.size,
    file.lastModified,
    file.type,
  ].join(':')
  const initialized = await apiFetch<UploadSessionResponse>(
    '/uploads/sessions',
    {
      method: 'POST',
      body: JSON.stringify({
        fingerprint,
        filename: file.name,
        mimeType: file.type,
        totalSize: file.size,
        durationSeconds,
      }),
    },
  )
  if (initialized.upload) {
    onProgress?.({
      uploadedBytes: file.size,
      totalBytes: file.size,
      percent: 100,
      bytesPerSecond: 0,
      remainingSeconds: 0,
    })
    return { upload: initialized.upload }
  }
  const { session } = initialized

  const uploaded = new Set(session.uploadedChunks)
  let completedBytes = [...uploaded].reduce(
    (sum, index) => sum + chunkBytes(file.size, session.chunkSize, index),
    0,
  )
  const startedAt = performance.now()
  const startingBytes = completedBytes

  const emit = (uploadedBytes: number) => {
    const elapsedSeconds = Math.max(0.001, (performance.now() - startedAt) / 1000)
    const transferred = Math.max(0, uploadedBytes - startingBytes)
    const bytesPerSecond = transferred / elapsedSeconds
    const remainingBytes = Math.max(0, file.size - uploadedBytes)
    onProgress?.({
      uploadedBytes,
      totalBytes: file.size,
      percent: Math.min(100, (uploadedBytes / file.size) * 100),
      bytesPerSecond,
      remainingSeconds:
        bytesPerSecond > 0 ? remainingBytes / bytesPerSecond : null,
    })
  }

  emit(completedBytes)
  for (let index = 0; index < session.totalChunks; index++) {
    if (uploaded.has(index)) continue
    const start = index * session.chunkSize
    const chunk = file.slice(start, Math.min(file.size, start + session.chunkSize))
    let lastError: unknown
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await uploadChunk(session.id, index, chunk, (loaded) => {
          emit(completedBytes + loaded)
        })
        lastError = null
        break
      } catch (error) {
        lastError = error
        if (attempt < 3) {
          await new Promise((resolve) => setTimeout(resolve, attempt * 1000))
        }
      }
    }
    if (lastError) throw lastError
    uploaded.add(index)
    completedBytes += chunk.size
    emit(completedBytes)
  }

  const result = await apiFetch<UploadResponse>(
    `/uploads/sessions/${session.id}/complete`,
    { method: 'POST' },
  )
  emit(file.size)
  return result
}

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
    onUploadProgress?: (progress: UploadProgress) => void,
  ): Promise<VideoProject> {
    const totalBytes = input.file.size + (input.secondaryFile?.size ?? 0)
    const reportFileProgress = (baseBytes: number) => (progress: UploadProgress) => {
      const uploadedBytes = Math.min(totalBytes, baseBytes + progress.uploadedBytes)
      onUploadProgress?.({
        ...progress,
        uploadedBytes,
        totalBytes,
        percent: totalBytes > 0 ? (uploadedBytes / totalBytes) * 100 : 100,
        remainingSeconds:
          progress.bytesPerSecond > 0
            ? (totalBytes - uploadedBytes) / progress.bytesPerSecond
            : null,
      })
    }

    const uploadData = await uploadFileResumable(
      input.file,
      input.durationSeconds,
      reportFileProgress(0),
    )

    let secondaryUploadId: string | undefined
    if (input.secondaryFile) {
      const uploadB = await uploadFileResumable(
        input.secondaryFile,
        input.secondaryDurationSeconds ?? 0,
        reportFileProgress(input.file.size),
      )
      secondaryUploadId = uploadB.upload.id
    }

    const data = await apiFetch<ProjectResponse>('/projects', {
      method: 'POST',
      body: JSON.stringify({
        uploadId: uploadData.upload.id,
        secondaryUploadId,
        mode: input.mode,
        options: input.options,
        title: input.title,
        durationSeconds:
          input.durationSeconds + (input.secondaryDurationSeconds ?? 0),
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
