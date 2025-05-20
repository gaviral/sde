import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AppMode, Question } from '../types';
import { questionData } from '../data/questions';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { StorageData } from '../data/localStorage';

interface AppContextType {
    currentQuestionId: number;
    setCurrentQuestionId: (id: number) => void;
    mode: AppMode;
    setMode: (mode: AppMode) => void;
    questions: Question[];
    userCode: Record<number, string>;
    updateUserCode: (questionId: number, code: string) => void;
    completedQuestions: Set<number>;
    markQuestionCompleted: (questionId: number) => void;
    isQuestionCompleted: (questionId: number) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'leetcode-practice-v1';

export const AppProvider = ({ children }: { children: ReactNode }) => {
    // Use localStorage hook
    const [storage, setStorage] = useLocalStorage<StorageData>(STORAGE_KEY, {
        version: '1.0',
        settings: {
            mode: 'learning',
        },
        lastQuestionId: 1,
        questions: {},
        completedQuestionIds: []
    });

    // Derive state from localStorage
    const [currentQuestionId, setCurrentQuestionId] = useState<number>(storage.lastQuestionId);
    const [mode, setMode] = useState<AppMode>(storage.settings.mode);
    const [userCode, setUserCode] = useState<Record<number, string>>({});
    const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(
        new Set(storage.completedQuestionIds || [])
    );

    // Load user code from localStorage on initial render
    useEffect(() => {
        const loadedUserCode: Record<number, string> = {};

        Object.entries(storage.questions).forEach(([id, data]) => {
            loadedUserCode[parseInt(id)] = data.userCode;
        });

        setUserCode(loadedUserCode);
    }, []);

    // Update localStorage when current question changes
    useEffect(() => {
        setStorage({
            ...storage,
            lastQuestionId: currentQuestionId
        });
    }, [currentQuestionId, setStorage]);

    // Update localStorage when mode changes
    useEffect(() => {
        setStorage({
            ...storage,
            settings: {
                ...storage.settings,
                mode
            }
        });
    }, [mode, setStorage]);

    // Update user code in state and localStorage
    const updateUserCode = (questionId: number, code: string) => {
        // Update state
        setUserCode(prev => ({
            ...prev,
            [questionId]: code
        }));

        // Update localStorage
        const updatedQuestions = {
            ...storage.questions,
            [questionId]: {
                userCode: code,
                lastSaved: new Date().toISOString()
            }
        };

        setStorage({
            ...storage,
            questions: updatedQuestions
        });
    };

    // Mark a question as completed
    const markQuestionCompleted = (questionId: number) => {
        const newCompletedQuestions = new Set(completedQuestions);
        newCompletedQuestions.add(questionId);
        setCompletedQuestions(newCompletedQuestions);

        // Update localStorage
        setStorage({
            ...storage,
            completedQuestionIds: Array.from(newCompletedQuestions)
        });
    };

    // Check if a question is completed
    const isQuestionCompleted = (questionId: number) => {
        return completedQuestions.has(questionId);
    };

    return (
        <AppContext.Provider value={{
            currentQuestionId,
            setCurrentQuestionId,
            mode,
            setMode,
            questions: questionData,
            userCode,
            updateUserCode,
            completedQuestions,
            markQuestionCompleted,
            isQuestionCompleted
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