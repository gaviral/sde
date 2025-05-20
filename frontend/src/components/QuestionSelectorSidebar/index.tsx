import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import QuestionItem from './QuestionItem';

interface QuestionSelectorSidebarProps {
    isVisible: boolean;
    onVisibilityChange: (visible: boolean) => void;
}

const QuestionSelectorSidebar: React.FC<QuestionSelectorSidebarProps> = ({
    isVisible,
    onVisibilityChange
}) => {
    const { questions, currentQuestionId, setCurrentQuestionId } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');

    const handleQuestionSelect = (id: number) => {
        setCurrentQuestionId(id);
        // On mobile, automatically hide the sidebar after selection
        if (window.innerWidth < 768) {
            onVisibilityChange(false);
        }
    };

    const filteredQuestions = questions.filter(q =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.id.toString().includes(searchTerm)
    );

    return (
        <div
            className={`
        question-selector fixed top-0 left-0 h-full bg-white shadow-lg z-20 transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0' : '-translate-x-full'} 
        w-72 md:relative md:shadow-none
        ${isVisible ? 'md:flex' : 'md:hidden'}
      `}
        >
            <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Questions</h2>
                        <button
                            onClick={() => onVisibilityChange(false)}
                            className="p-1 rounded hover:bg-gray-200 md:hidden"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="overflow-y-auto flex-grow">
                    {filteredQuestions.length > 0 ? (
                        filteredQuestions.map(question => (
                            <QuestionItem
                                key={question.id}
                                question={question}
                                isSelected={question.id === currentQuestionId}
                                onSelect={handleQuestionSelect}
                            />
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500">
                            No questions found matching "{searchTerm}"
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionSelectorSidebar; 