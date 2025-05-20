import { useState } from 'react'
import useSpeechRecognition from '../hooks/useSpeechRecognition'
import TranscriptionToast from './TranscriptionToast'

interface Props {
  onCommand: (cmd: string) => void
}

export default function VoiceButton({ onCommand }: Props) {
  const [text, setText] = useState('')
  const { start } = useSpeechRecognition(t => {
    setText(t)
    onCommand(t)
  })

  return (
    <div>
      <button className="voice" onClick={start}>🎤</button>
      <TranscriptionToast text={text} />
    </div>
  )
}
