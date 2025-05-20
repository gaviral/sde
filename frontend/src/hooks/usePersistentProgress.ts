import { useEffect, useState } from 'react'
import { loadProgress, saveProgress } from '../components/storage'
import type { Progress } from '../components/storage'

/**
 * Provides access to the user's progress with persistence.
 *
 * The hook initializes state from `loadProgress()` and automatically
 * saves any updates using `saveProgress()`.
 *
 * @returns A `[progress, setProgress]` tuple.
 */
export default function usePersistentProgress() {
  const [progress, setProgress] = useState<Progress>(() => loadProgress())

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  return [progress, setProgress] as const
}
