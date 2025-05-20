import { useEffect, useState } from 'react';

interface TranscriptionToastProps {
    transcript: string;
    isListening: boolean;
}

const TranscriptionToast: React.FC<TranscriptionToastProps> = ({
    transcript,
    isListening
}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isListening || transcript) {
            setVisible(true);
        } else {
            // Hide the toast after a delay
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isListening, transcript]);

    if (!visible && !isListening && !transcript) {
        return null;
    }

    return (
        <div
            className={`
        absolute bottom-20 right-4 bg-white shadow-lg rounded-lg p-3 max-w-sm transition-opacity duration-300
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
        >
            <div className="flex items-start">
                {isListening && (
                    <div className="mr-2 mt-1 flex-shrink-0">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                )}
                <div>
                    {isListening && !transcript && (
                        <p className="text-gray-500 text-sm italic">Listening...</p>
                    )}
                    {transcript && (
                        <p className="text-sm">{transcript}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TranscriptionToast; 