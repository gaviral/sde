import { useRef } from 'react'

/**
 * Provides simple speech recognition using the Web Speech API.
 *
 * The hook sets up a `SpeechRecognition` instance and returns a
 * `start()` function. When recognition captures speech it calls the
 * supplied callback with the resulting transcript.
 *
 * @param onResult Function invoked with the recognized transcript.
 * @returns An object containing the `start()` function.
 */
export default function useSpeechRecognition(onResult: (text: string) => void) {
  const recRef = useRef<SpeechRecognition | null>(null)

  if (recRef.current === null && typeof window !== 'undefined') {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition
    if (Speech) {
      const rec = new Speech()
      rec.lang = 'en-US'
      rec.onresult = e => {
        const text = e.results[0][0].transcript
        onResult(text)
      }
      recRef.current = rec
    }
  }

  function start() {
    recRef.current?.start()
  }

  return { start }
}
