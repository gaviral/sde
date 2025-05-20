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

// Create an empty storage object with default values
export const createEmptyStorage = (): StorageData => ({
    version: '1.0',
    settings: {
        mode: 'learning',
    },
    lastQuestionId: 1,
    questions: {}
});

// Save to localStorage
export const saveToLocalStorage = (data: StorageData): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
};

// Load from localStorage
export const loadFromLocalStorage = (): StorageData => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return createEmptyStorage();
        return JSON.parse(data) as StorageData;
    } catch (error) {
        console.error('Failed to load from localStorage:', error);
        return createEmptyStorage();
    }
};

// Clear all data from localStorage
export const clearLocalStorage = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear localStorage:', error);
    }
};

// Export storage to a file
export const exportToFile = (): void => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        alert('No data to export');
        return;
    }

    try {
        const formattedData = JSON.stringify(JSON.parse(data), null, 2); // Pretty print
        const blob = new Blob([formattedData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'leetcode-practice-backup.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Failed to export data:', error);
        alert('Failed to export data');
    }
};

// Import data from a file
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

                // Verify required fields
                if (!data.version || !data.settings || !data.questions) {
                    reject(new Error('Invalid backup file format'));
                    return;
                }

                // Merge with any existing data for safety
                const existingData = loadFromLocalStorage();
                const mergedData = {
                    ...existingData,
                    ...data,
                    questions: {
                        ...existingData.questions,
                        ...data.questions
                    }
                };

                // Save merged data
                saveToLocalStorage(mergedData);
                resolve(true);
            } catch (error) {
                console.error('Failed to import data:', error);
                reject(new Error('Invalid JSON file'));
            }
        };

        reader.onerror = () => {
            console.error('Error reading file');
            reject(new Error('Failed to read file'));
        };

        reader.readAsText(file);
    });
}; 