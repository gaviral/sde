import type { AppMode } from '../types';

const STORAGE_KEY = 'leetcode-practice-v1';

export interface StorageData {
    version: string;
    settings: {
        mode: AppMode;
    };
    lastQuestionId: number;
    questions: Record<string, {
        userCode: string;
        lastSaved: string;
    }>;
}

export const saveToLocalStorage = (data: StorageData): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadFromLocalStorage = (): StorageData | null => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    try {
        return JSON.parse(data) as StorageData;
    } catch (e) {
        console.error('Failed to parse localStorage data:', e);
        return null;
    }
};

export const exportToFile = (): void => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        alert('No data to export');
        return;
    }

    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leetcode-practice-backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export const importFromFile = (file: File): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const result = e.target?.result;
                if (typeof result !== 'string') {
                    reject(new Error('Failed to read file'));
                    return;
                }

                // Validate the JSON structure
                const data = JSON.parse(result) as StorageData;
                if (!data.version || !data.settings || !data.questions) {
                    reject(new Error('Invalid backup file format'));
                    return;
                }

                localStorage.setItem(STORAGE_KEY, result);
                resolve(true);
            } catch (e) {
                reject(new Error('Invalid JSON file'));
            }
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}; 