import { useEffect, useState, useRef } from 'react';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';
import { parseVoiceCommand } from '../../utils/voiceCommandParser';
import { useAppContext } from '../../context/AppContext';
import TranscriptionToast from './TranscriptionToast';

interface VoiceCommandButtonProps {
    provideButtonRef?: (ref: HTMLButtonElement | null) => void;
}

const VoiceCommandButton: React.FC<VoiceCommandButtonProps> = ({ provideButtonRef }) => {
    const {
        isListening,
        transcript,
        error,
        startListening,
        recognitionSupported
    } = useVoiceRecognition();

    const {
        setCurrentQuestionId,
        currentQuestionId,
        questions
    } = useAppContext();

    // Debug state for development
    const [debug, setDebug] = useState(false);
    const [lastCommand, setLastCommand] = useState<string | null>(null);

    // Ref for the voice button
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Provide the ref to the parent component
    useEffect(() => {
        if (provideButtonRef && buttonRef.current) {
            provideButtonRef(buttonRef.current);
        }
    }, [provideButtonRef]);

    // Process voice commands when the transcript changes
    useEffect(() => {
        if (!transcript) return;

        const command = parseVoiceCommand(transcript);
        if (command) {
            console.log('Voice command detected:', command);

            // Store last command for debug view
            setLastCommand(`${command.command} ${JSON.stringify(command.params)}`);

            switch (command.command) {
                case 'navigate':
                    const questionId = command.params.questionId;
                    if (questionId >= 1 && questionId <= questions.length) {
                        setCurrentQuestionId(questionId);
                    }
                    break;
                case 'check':
                    // Find and trigger the Check button
                    const checkButton = document.querySelector('[data-action="check"]') as HTMLButtonElement;
                    checkButton?.click();
                    break;
                case 'showSettings':
                    // Find and trigger the settings button
                    const settingsButton = document.querySelector('[data-action="settings"]') as HTMLButtonElement;
                    settingsButton?.click();
                    break;
                case 'showQuestions':
                    // Find and trigger the questions button
                    const questionsButton = document.querySelector('[data-action="questions"]') as HTMLButtonElement;
                    questionsButton?.click();
                    break;
                case 'showIssues':
                    // Find and trigger the issues button
                    const issuesButton = document.querySelector('[data-action="issues"]') as HTMLButtonElement;
                    issuesButton?.click();
                    break;
                case 'debug':
                    // Toggle debug mode
                    setDebug(prev => !prev);
                    break;
                default:
                    break;
            }
        }
    }, [transcript, setCurrentQuestionId, questions]);

    if (!recognitionSupported) {
        return (
            <div className="fixed bottom-4 right-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white cursor-not-allowed opacity-50">
                    🎙️
                </div>
                <span className="absolute -top-8 right-0 bg-white p-1 rounded shadow-md text-xs whitespace-nowrap">
                    Voice commands not supported in this browser
                </span>
            </div>
        );
    }

    return (
        <>
            <div className="fixed bottom-4 right-4">
                <button
                    ref={buttonRef}
                    className={`w-12 h-12 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-orange-500 hover:bg-orange-600'
                        } flex items-center justify-center text-white transition`}
                    onClick={startListening}
                    disabled={isListening}
                    data-action="voice"
                    aria-label="Voice command"
                    onDoubleClick={() => setDebug(prev => !prev)}
                >
                    🎙️
                </button>

                {/* Debug overlay (double-click mic button to show) */}
                {debug && (
                    <div className="absolute bottom-16 right-0 bg-black bg-opacity-80 text-white p-2 rounded text-xs w-48">
                        <div className="mb-1"><strong>Debug:</strong> Voice Commands</div>
                        {error && <div className="text-red-400">Error: {error}</div>}
                        {lastCommand && <div>Last command: {lastCommand}</div>}
                        <div className="mt-1 text-gray-400">Available commands:</div>
                        <ul className="text-gray-300 list-disc list-inside">
                            <li>go to question [number]</li>
                            <li>check code</li>
                            <li>show settings</li>
                            <li>show questions</li>
                            <li>show issues</li>
                            <li>debug</li>
                        </ul>
                    </div>
                )}
            </div>

            <TranscriptionToast
                transcript={transcript}
                isListening={isListening}
            />
        </>
    );
};

export default VoiceCommandButton; 