import { useAppContext } from '../../context/AppContext';
import type { Question } from '../../types';

interface QuestionItemProps {
    question: Question;
    isSelected: boolean;
    onSelect: (id: number) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, isSelected, onSelect }) => {
    const { isQuestionCompleted } = useAppContext();
    const completed = isQuestionCompleted(question.id);

    return (
        <div
            className={`
        p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition
        ${isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}
        ${question.isPlaceholder ? 'opacity-50' : ''}
        ${completed && !isSelected ? 'bg-green-50' : ''}
      `}
            onClick={() => onSelect(question.id)}
            data-question-id={question.id}
        >
            <div className="flex justify-between items-center">
                <span className="font-medium">
                    {question.id}. {question.title}
                    {completed && <span className="text-green-600 ml-2">✓</span>}
                </span>
                {isSelected && (
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                )}
            </div>
        </div>
    );
};

export default QuestionItem; 