import { useEffect } from 'react';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';
import { parseVoiceCommand } from '../../utils/voiceCommandParser';
import { useAppContext } from '../../context/AppContext';
import TranscriptionToast from './TranscriptionToast';

const VoiceCommandButton: React.FC = () => {
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

    // Process voice commands when the transcript changes
    useEffect(() => {
        if (!transcript) return;

        const command = parseVoiceCommand(transcript);
        if (command) {
            console.log('Voice command detected:', command);

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
                    className={`w-12 h-12 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-orange-500 hover:bg-orange-600'
                        } flex items-center justify-center text-white transition`}
                    onClick={startListening}
                    disabled={isListening}
                    data-action="voice"
                    aria-label="Voice command"
                >
                    🎙️
                </button>
            </div>

            <TranscriptionToast
                transcript={transcript}
                isListening={isListening}
            />
        </>
    );
};

export default VoiceCommandButton; 