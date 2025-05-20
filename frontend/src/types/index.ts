export interface Question {
    id: number;
    title: string;
    description: string;
    starterCode: string;
    solution: string;
    isPlaceholder?: boolean;
}

export interface UserCodeState {
    [questionId: string]: {
        userCode: string;
        lastSaved: string;
    };
}

export type AppMode = 'learning' | 'mock';

export interface AppState {
    currentQuestionId: number;
    mode: AppMode;
    questions: Record<string, UserCodeState>;
} 