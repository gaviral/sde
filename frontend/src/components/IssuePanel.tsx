import { useState, useRef, useEffect } from 'react';
import { validateCode } from '../utils/codeValidator';
import { useAppContext } from '../context/AppContext';

interface IssuePanelProps {
    isVisible: boolean;
    onVisibilityChange: (visible: boolean) => void;
    provideCheckButtonRef?: (ref: HTMLButtonElement | null) => void;
}

const IssuePanel: React.FC<IssuePanelProps> = ({
    isVisible,
    onVisibilityChange,
    provideCheckButtonRef
}) => {
    const { currentQuestionId, questions, userCode, markQuestionCompleted } = useAppContext();
    const [issues, setIssues] = useState<string[]>([]);
    const checkButtonRef = useRef<HTMLButtonElement>(null);

    // Provide the ref to the parent component
    useEffect(() => {
        if (provideCheckButtonRef && checkButtonRef.current) {
            provideCheckButtonRef(checkButtonRef.current);
        }
    }, [provideCheckButtonRef]);

    const currentQuestion = questions.find(q => q.id === currentQuestionId);
    const currentUserCode = userCode[currentQuestionId] || '';

    const checkCode = () => {
        if (!currentQuestion) return;

        const result = validateCode(currentUserCode, currentQuestion.solution);

        if (result.isValid) {
            setIssues(['✅ Your solution is correct!']);
            // Mark the question as completed
            markQuestionCompleted(currentQuestionId);
        } else {
            setIssues(result.issues);
        }

        // Show the panel if there are issues
        if (result.issues.length > 0 || result.isValid) {
            onVisibilityChange(true);
        }
    };

    return (
        <div className={`issue-panel p-4 border-t border-gray-200 ${isVisible ? 'h-40' : 'h-0 overflow-hidden'} transition-all duration-300 ease-in-out`}>
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">Issues</h3>
                <div className="flex space-x-2">
                    <button
                        ref={checkButtonRef}
                        onClick={checkCode}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
                        data-action="check"
                    >
                        Check
                    </button>
                    <button
                        onClick={() => onVisibilityChange(false)}
                        className="px-2 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300 transition"
                    >
                        Close
                    </button>
                </div>
            </div>

            <div className="overflow-y-auto max-h-28">
                {issues.length > 0 ? (
                    <ul className="list-disc list-inside text-sm">
                        {issues.map((issue, index) => (
                            <li key={index} className={issue.includes('✅') ? 'text-green-600' : 'text-red-500'}>
                                {issue}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-sm">Click "Check" to validate your code.</p>
                )}
            </div>
        </div>
    );
};

export default IssuePanel; 