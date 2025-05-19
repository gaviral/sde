import { useRef } from 'react'

interface Props {
  onCommand: (cmd: string) => void
}

// Define the interfaces needed for speech recognition
interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionAlternative {
  0: SpeechRecognitionResult;
}

interface SpeechRecognitionResultList {
  0: SpeechRecognitionAlternative;
  length: number;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  start: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: {
      new(): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new(): SpeechRecognition;
    };
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
