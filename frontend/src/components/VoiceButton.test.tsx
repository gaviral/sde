import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import VoiceButton from './VoiceButton'

declare global {
  interface Window {
    SpeechRecognition: typeof FakeRec
    webkitSpeechRecognition: typeof FakeRec
  }
}

interface SpeechRecognitionResult {
  transcript: string
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResult[][]
}

class FakeRec {
  onresult: ((e: SpeechRecognitionEvent) => void) | null = null
  start() {
    this.onresult?.({ results: [[{ transcript: 'check code' }]] })
  }
}

describe('VoiceButton', () => {
  it('passes transcript to onCommand', () => {
    window.SpeechRecognition = FakeRec
    window.webkitSpeechRecognition = FakeRec
    const handler = vi.fn()
    render(<VoiceButton onCommand={handler} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledWith('check code')
  })
})
