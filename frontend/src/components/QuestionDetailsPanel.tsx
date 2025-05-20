import { useAppContext } from '../context/AppContext';

const QuestionDetailsPanel: React.FC = () => {
    const { currentQuestionId, questions } = useAppContext();
    const currentQuestion = questions.find(q => q.id === currentQuestionId);

    if (!currentQuestion) {
        return (
            <div className="question-details p-4 w-72 overflow-y-auto h-full">
                <p className="text-gray-500">No question selected</p>
            </div>
        );
    }

    // Function to render the description with line breaks
    const renderDescription = (text: string) => {
        return text.split('\n').map((line, index) => (
            <p key={index} className={index > 0 ? 'mt-2' : ''}>
                {line}
            </p>
        ));
    };

    return (
        <div className="question-details p-4 w-72 overflow-y-auto h-full">
            <h2 className="text-xl font-bold mb-2">{currentQuestion.title}</h2>
            <div className="mt-4 text-sm">
                {renderDescription(currentQuestion.description)}
            </div>
        </div>
    );
};

export default QuestionDetailsPanel; 