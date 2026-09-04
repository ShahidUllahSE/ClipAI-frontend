import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { projectsApi } from '@/api'
import { useAuth } from '@/context/AuthContext'
import type {
  CreateProjectInput,
  UploadProgress,
  VideoProject,
} from '@/types/app'

interface ProjectsContextValue {
  projects: VideoProject[]
  loading: boolean
  refresh: () => Promise<void>
  create: (
    input: CreateProjectInput,
    onUploadProgress?: (progress: UploadProgress) => void,
  ) => Promise<VideoProject>
  get: (id: string) => VideoProject | undefined
  updateTitle: (id: string, generatedTitle: string) => Promise<void>
  remove: (id: string) => Promise<void>
  process: (id: string) => Promise<void>
  retry: (id: string) => Promise<void>
  processingIds: Set<string>
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null)

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const { user, refreshUser } = useAuth()
  const [projects, setProjects] = useState<VideoProject[]>([])
  const [loading, setLoading] = useState(true)
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set())

  const refresh = useCallback(async () => {
    if (!user) {
      setProjects([])
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const list = await projectsApi.list(user.id)
      setProjects(list)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const hasProcessing =
    processingIds.size > 0 ||
    projects.some(
      (project) =>
        project.status === 'Queued' ||
        project.status === 'Analyzing' ||
        project.status === 'Preparing edit' ||
        project.status === 'Rendering' ||
        project.status === 'Uploading',
    )

  useEffect(() => {
    if (!user || !hasProcessing) return
    let cancelled = false
    const tick = async () => {
      try {
        const list = await projectsApi.list(user.id)
        if (!cancelled) setProjects(list)
      } catch {
        /* keep last snapshot */
      }
    }
    const timer = window.setInterval(() => {
      void tick()
    }, 1000)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [user, hasProcessing])

  const applyProject = useCallback((project: VideoProject) => {
    setProjects((prev) => {
      const index = prev.findIndex((p) => p.id === project.id)
      if (index < 0) return [project, ...prev]
      const next = [...prev]
      next[index] = { ...next[index], ...project }
      return next
    })
  }, [])

  const create = useCallback(
    async (
      input: CreateProjectInput,
      onUploadProgress?: (progress: UploadProgress) => void,
    ) => {
      if (!user) throw new Error('Not signed in.')
      const project = await projectsApi.create(user.id, input, onUploadProgress)
      setProjects((prev) => [project, ...prev])
      return project
    },
    [user],
  )

  const get = useCallback(
    (id: string) => projects.find((p) => p.id === id),
    [projects],
  )

  const updateTitle = useCallback(
    async (id: string, generatedTitle: string) => {
      if (!user) throw new Error('Not signed in.')
      const next = await projectsApi.update(id, user.id, { generatedTitle })
      setProjects((prev) => prev.map((p) => (p.id === id ? next : p)))
    },
    [user],
  )

  const remove = useCallback(
    async (id: string) => {
      if (!user) throw new Error('Not signed in.')
      await projectsApi.remove(id, user.id)
      setProjects((prev) => prev.filter((p) => p.id !== id))
    },
    [user],
  )

  const runPipeline = useCallback(
    async (id: string, kind: 'process' | 'retry') => {
      if (!user) throw new Error('Not signed in.')
      setProcessingIds((prev) => new Set(prev).add(id))
      try {
        if (kind === 'retry') {
          await projectsApi.retry(id, user.id, applyProject)
        } else {
          await projectsApi.startProcessing(id, user.id, applyProject)
        }
        await refresh()
        await refreshUser()
      } finally {
        setProcessingIds((prev) => {
          const next = new Set(prev)
          next.delete(id)
          return next
        })
      }
    },
    [user, applyProject, refresh, refreshUser],
  )

  const process = useCallback(
    (id: string) => runPipeline(id, 'process'),
    [runPipeline],
  )

  const retry = useCallback(
    (id: string) => runPipeline(id, 'retry'),
    [runPipeline],
  )

  const value = useMemo(
    () => ({
      projects,
      loading,
      refresh,
      create,
      get,
      updateTitle,
      remove,
      process,
      retry,
      processingIds,
    }),
    [
      projects,
      loading,
      refresh,
      create,
      get,
      updateTitle,
      remove,
      process,
      retry,
      processingIds,
    ],
  )

  return (
    <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
  )
}

export function useProjects() {
  const ctx = useContext(ProjectsContext)
  if (!ctx) throw new Error('useProjects must be used within ProjectsProvider')
  return ctx
}
