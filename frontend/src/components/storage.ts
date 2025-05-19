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
    } catch (e) {
      console.error('Failed to parse progress data from local storage:', e)
    }
  }
  return { mode: 'learning', selected: 1, codes: {} }
}

export function saveProgress(progress: Progress) {
  localStorage.setItem(KEY, JSON.stringify(progress))
}
