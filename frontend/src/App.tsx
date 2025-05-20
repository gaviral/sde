import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import './App.css';

function App() {
  // State for controlling sidebar visibility
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(false);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(false);
  const [issuePanelVisible, setIssuePanelVisible] = useState(false);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add keyboard shortcuts here for accessibility
      if (e.key === 'q' && e.ctrlKey) setLeftSidebarVisible(prev => !prev);
      if (e.key === 's' && e.ctrlKey) setRightSidebarVisible(prev => !prev);
      if (e.key === 'i' && e.ctrlKey) setIssuePanelVisible(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppProvider>
      <div className="app-container h-screen w-screen flex overflow-hidden">
        {/* Placeholder for Left Sidebar */}
        <div className={`left-sidebar ${leftSidebarVisible ? 'visible' : 'hidden'}`}>
          Question Selector (To be implemented)
        </div>

        {/* Main Work Area */}
        <div className="main-area flex flex-col flex-grow h-full">
          <div className="main-content flex flex-grow">
            <div className="question-details p-4 border-r border-gray-200">
              Question Details (To be implemented)
            </div>
            <div className="code-editor-container flex-grow p-4">
              Code Editor (To be implemented)
            </div>
          </div>
          <div className={`issue-panel p-2 border-t border-gray-200 ${issuePanelVisible ? 'visible' : 'hidden'}`}>
            Issue Panel (To be implemented)
          </div>
        </div>

        {/* Placeholder for Right Sidebar */}
        <div className={`right-sidebar ${rightSidebarVisible ? 'visible' : 'hidden'}`}>
          Settings (To be implemented)
        </div>

        {/* Placeholder for Voice Command Button */}
        <div className="voice-command-button fixed bottom-4 right-4 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white cursor-pointer">
          🎙️
        </div>

        {/* Hover detection zones */}
        <div
          className="hover-zone-left"
          onMouseEnter={() => setLeftSidebarVisible(true)}
          onMouseLeave={() => setLeftSidebarVisible(false)}
        />
        <div
          className="hover-zone-right"
          onMouseEnter={() => setRightSidebarVisible(true)}
          onMouseLeave={() => setRightSidebarVisible(false)}
        />
        <div
          className="hover-zone-bottom"
          onMouseEnter={() => setIssuePanelVisible(true)}
          onMouseLeave={() => setIssuePanelVisible(false)}
        />
      </div>
    </AppProvider>
  );
}

export default App;
