import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    // Get from localStorage or use initial value
    const readValue = (): T => {
        try {
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState<T>(readValue);

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value: T) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            // Save state
            setStoredValue(valueToStore);

            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));

            // Dispatch a custom event so other instances can update
            window.dispatchEvent(new Event('local-storage-update'));
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    };

    // Listen for changes to this localStorage key in other tabs/windows
    useEffect(() => {
        // Handle storage events from other tabs/windows
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.newValue) {
                try {
                    setStoredValue(JSON.parse(e.newValue));
                } catch (error) {
                    console.warn(`Error parsing localStorage value:`, error);
                }
            }
        };

        // Handle storage events from this tab
        const handleLocalChange = () => {
            setStoredValue(readValue());
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('local-storage-update', handleLocalChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('local-storage-update', handleLocalChange);
        };
    }, [key, readValue]);

    return [storedValue, setValue];
} 