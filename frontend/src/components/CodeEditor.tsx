import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useAppContext } from '../context/AppContext';

const CodeEditor: React.FC = () => {
    const { currentQuestionId, questions, userCode, updateUserCode } = useAppContext();
    const editorRef = useRef(null);

    const currentQuestion = questions.find(q => q.id === currentQuestionId);
    const currentCode = userCode[currentQuestionId] || currentQuestion?.starterCode || '';

    const handleEditorDidMount = (editor: any) => {
        editorRef.current = editor;
    };

    const handleChange = (value: string | undefined) => {
        if (value !== undefined) {
            updateUserCode(currentQuestionId, value);
        }
    };

    return (
        <div className="h-full w-full">
            <Editor
                height="100%"
                language="python"
                theme="vs-dark"
                value={currentCode}
                onChange={handleChange}
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default CodeEditor; 