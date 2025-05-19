import { useRef } from 'react'

interface Props {
  onCommand: (cmd: string) => void
}

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export default function VoiceButton({ onCommand }: Props) {
  const toastRef = useRef<HTMLDivElement>(null)

  function listen() {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) return
    const rec = new Speech()
    rec.lang = 'en-US'
    rec.onresult = (e: SpeechRecognitionEvent) => {
      const text = e.results[0][0].transcript
      if (toastRef.current) {
        toastRef.current.textContent = text
        toastRef.current.style.opacity = '1'
        setTimeout(() => { if (toastRef.current) toastRef.current.style.opacity = '0' }, 1500)
      }
      onCommand(text)
    }
    rec.start()
  }

  return (
    <div>
      <button className="voice" onClick={listen}>🎤</button>
      <div ref={toastRef} className="toast" style={{ opacity: 0 }}></div>
    </div>
  )
}
