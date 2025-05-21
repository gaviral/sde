import { useState, useMemo } from 'react';
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
    const { questions, currentQuestionId, setCurrentQuestionId, completedQuestions } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');

    // Calculate progress statistics
    const stats = useMemo(() => {
        const total = questions.length;
        const completed = completedQuestions.size;
        const realQuestions = questions.filter(q => !q.isPlaceholder).length;
        const realCompleted = [...completedQuestions].filter(id =>
            questions.find(q => q.id === id && !q.isPlaceholder)
        ).length;

        return {
            totalProgress: total > 0 ? (completed / total) * 100 : 0,
            realProgress: realQuestions > 0 ? (realCompleted / realQuestions) * 100 : 0,
            completed,
            total,
            realCompleted,
            realQuestions
        };
    }, [questions, completedQuestions]);

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
        question-selector fixed top-0 left-0 h-full bg-white shadow-lg z-20 transition-transform duration-300 ease-in-out w-72
        ${isVisible ? 'translate-x-0' : '-translate-x-full invisible'}
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

                    {/* Progress statistics */}
                    <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Real Questions: {stats.realCompleted}/{stats.realQuestions}</span>
                            <span>{Math.round(stats.realProgress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-green-600 h-2.5 rounded-full"
                                style={{ width: `${stats.realProgress}%` }}
                            ></div>
                        </div>
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