import { useState, useCallback } from 'react';

// TypeScript type for Web Speech API, which isn't fully typed in lib.dom.d.ts
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    abort: () => void;
    onresult: (event: any) => void;
    onerror: (event: any) => void;
    onend: () => void;
}

declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognition;
        webkitSpeechRecognition: new () => SpeechRecognition;
    }
}

export function useVoiceRecognition() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Create a recognition instance
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionSupported = !!SpeechRecognition;

    // Use useCallback to ensure we don't create a new function on each render
    const startListening = useCallback(() => {
        if (!recognitionSupported) {
            setError('Speech recognition not supported in this browser');
            return;
        }

        try {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onresult = (event: any) => {
                const currentTranscript = Array.from(event.results)
                    .map((result: any) => result[0].transcript)
                    .join('');

                setTranscript(currentTranscript);
            };

            recognition.onerror = (event: any) => {
                setError(`Speech recognition error: ${event.error}`);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.start();
            setIsListening(true);
            setError(null);

            // Automatically stop after 5 seconds to prevent indefinite listening
            setTimeout(() => {
                recognition.stop();
            }, 5000);
        } catch (err) {
            setError(`Failed to start speech recognition: ${err}`);
        }
    }, [recognitionSupported]);

    return {
        isListening,
        transcript,
        error,
        startListening,
        recognitionSupported
    };
} 