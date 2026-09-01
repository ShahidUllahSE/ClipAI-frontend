import { apiFetch } from './client'

export type CaptionCue = {
  start: number
  end: number
  text: string
}

export const captionsApi = {
  async transcribe(file: File): Promise<{ transcript: string; cues: CaptionCue[] }> {
    const form = new FormData()
    form.append('file', file)
    return apiFetch('/captions/transcribe', {
      method: 'POST',
      body: form,
    })
  },
}
