import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import VoiceButton from './VoiceButton'

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

class FakeRec {
  onresult: ((e: any) => void) | null = null
  start() {
    this.onresult?.({ results: [[{ transcript: 'check code' }]] })
  }
}

describe('VoiceButton', () => {
  it('passes transcript to onCommand', () => {
    window.SpeechRecognition = FakeRec as any
    window.webkitSpeechRecognition = FakeRec as any
    const handler = vi.fn()
    render(<VoiceButton onCommand={handler} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledWith('check code')
  })
})
