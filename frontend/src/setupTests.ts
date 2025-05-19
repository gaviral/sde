import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import React from 'react';

// Mock Monaco Editor
vi.mock('@monaco-editor/react', () => ({
    default: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
        function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
            onChange(e.target.value);
        }

        return React.createElement('textarea', {
            'data-testid': 'monaco-editor',
            value,
            onChange: handleChange
        });
    }
}));
