import { useRef } from 'react'

interface Props {
  onCommand: (cmd: string) => void
}

export default function VoiceButton({ onCommand }: Props) {
  const toastRef = useRef<HTMLDivElement>(null)

  function listen() {
    const SpeechCtor =
      (window as Window & { webkitSpeechRecognition?: typeof SpeechRecognition })
        .SpeechRecognition ||
      (window as Window & { webkitSpeechRecognition?: typeof SpeechRecognition })
        .webkitSpeechRecognition
    if (!SpeechCtor) return
    const rec = new SpeechCtor()
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
