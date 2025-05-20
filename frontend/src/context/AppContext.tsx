import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AppMode, Question } from '../types';
import { questionData } from '../data/questions';

interface AppContextType {
    currentQuestionId: number;
    setCurrentQuestionId: (id: number) => void;
    mode: AppMode;
    setMode: (mode: AppMode) => void;
    questions: Question[];
    userCode: Record<number, string>;
    updateUserCode: (questionId: number, code: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [currentQuestionId, setCurrentQuestionId] = useState(1);
    const [mode, setMode] = useState<AppMode>('learning');
    const [userCode, setUserCode] = useState<Record<number, string>>({});

    const updateUserCode = (questionId: number, code: string) => {
        setUserCode(prev => ({
            ...prev,
            [questionId]: code
        }));
        // Later we'll add localStorage persistence here
    };

    return (
        <AppContext.Provider value={{
            currentQuestionId,
            setCurrentQuestionId,
            mode,
            setMode,
            questions: questionData,
            userCode,
            updateUserCode
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}; 