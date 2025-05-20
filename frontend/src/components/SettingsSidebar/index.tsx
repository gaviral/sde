import { useAppContext } from '../../context/AppContext';
import ModeToggle from './ModeToggle';
import StorageControls from './StorageControls';

interface SettingsSidebarProps {
    isVisible: boolean;
    onVisibilityChange: (visible: boolean) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
    isVisible,
    onVisibilityChange
}) => {
    const { mode, setMode } = useAppContext();

    return (
        <div
            className={`
        settings-sidebar fixed top-0 right-0 h-full bg-white shadow-lg z-20 transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0' : 'translate-x-full'} 
        w-72 md:relative md:shadow-none
        ${isVisible ? 'md:flex' : 'md:hidden'}
      `}
        >
            <div className="h-full flex flex-col p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold">Settings</h2>
                    <button
                        onClick={() => onVisibilityChange(false)}
                        className="p-1 rounded hover:bg-gray-200 md:hidden"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <ModeToggle mode={mode} onChange={setMode} />

                <div className="border-t border-gray-200 my-4 pt-4">
                    <StorageControls />
                </div>

                <div className="mt-auto text-center text-xs text-gray-500 pt-4 border-t border-gray-200">
                    <p>LeetCode Practice App</p>
                    <p>Version 1.0</p>
                </div>
            </div>
        </div>
    );
};

export default SettingsSidebar; 