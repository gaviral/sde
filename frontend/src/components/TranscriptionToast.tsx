import { useEffect, useState } from 'react'

/**
 * Displays a temporary toast with the provided transcript text.
 *
 * The toast fades out after a short delay whenever the `text` prop
 * changes.
 *
 * @param text Transcript to display.
 */
export default function TranscriptionToast({ text }: { text: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (text) {
      setVisible(true)
      const id = setTimeout(() => setVisible(false), 1500)
      return () => clearTimeout(id)
    }
  }, [text])

  return (
    <div className="toast" style={{ opacity: visible ? 1 : 0 }}>
      {text}
    </div>
  )
}
