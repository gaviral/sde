import type { AppMode } from '../../types';

interface ModeToggleProps {
    mode: AppMode;
    onChange: (mode: AppMode) => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onChange }) => {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Mode</h3>
            <div className="flex space-x-4">
                <button
                    className={`flex-1 py-2 px-4 rounded ${mode === 'learning'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    onClick={() => onChange('learning')}
                >
                    Learning
                </button>
                <button
                    className={`flex-1 py-2 px-4 rounded ${mode === 'mock'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    onClick={() => onChange('mock')}
                >
                    Mock
                </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
                {mode === 'learning'
                    ? 'Learning mode shows hints and detailed feedback.'
                    : 'Mock mode simulates a real interview environment.'}
            </p>
        </div>
    );
};

export default ModeToggle; 