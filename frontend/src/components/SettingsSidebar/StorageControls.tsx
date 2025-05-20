import { useRef, useState } from 'react';
import { exportToFile, importFromFile, clearLocalStorage } from '../../data/localStorage';

const StorageControls: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [confirmingClear, setConfirmingClear] = useState(false);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        importFromFile(file)
            .then(() => {
                alert('Progress imported successfully! The page will reload.');
                window.location.reload();
            })
            .catch((error) => {
                alert(`Error importing file: ${error.message}`);
            });

        // Clear the input so the same file can be selected again
        event.target.value = '';
    };

    const handleClearClick = () => {
        if (!confirmingClear) {
            setConfirmingClear(true);
            return;
        }

        clearLocalStorage();
        setConfirmingClear(false);
        alert('All progress has been cleared. The page will reload.');
        window.location.reload();
    };

    return (
        <div>
            <h3 className="text-lg font-medium mb-4">Storage</h3>
            <div className="space-y-3">
                <button
                    onClick={exportToFile}
                    className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition flex items-center justify-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export Progress
                </button>

                <button
                    onClick={handleImportClick}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center justify-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Import Progress
                </button>

                <button
                    onClick={handleClearClick}
                    className={`w-full py-2 px-4 rounded transition flex items-center justify-center ${confirmingClear ? 'bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {confirmingClear ? 'Confirm Clear' : 'Clear All Progress'}
                </button>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".json"
                    className="hidden"
                />

                <p className="text-xs text-gray-500 mt-2">
                    All progress is saved automatically in your browser's local storage.
                    Export to create a backup file you can use to restore your progress later.
                </p>
            </div>
        </div>
    );
};

export default StorageControls; 