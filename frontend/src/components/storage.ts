export interface Progress {
  mode: string
  selected: number
  codes: Record<number, string>
}

const KEY = 'sde-progress'

export function loadProgress(): Progress {
  const raw = localStorage.getItem(KEY)
  if (raw) {
    try {
      const data = JSON.parse(raw) as Progress
      return { mode: data.mode || 'learning', selected: data.selected || 1, codes: data.codes || {} }
    } catch (err) {
      console.error('Invalid progress data', err)
    }
  }
  return { mode: 'learning', selected: 1, codes: {} }
}

export function saveProgress(progress: Progress) {
  localStorage.setItem(KEY, JSON.stringify(progress))
}
