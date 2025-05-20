import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import QuestionSelectorSidebar from './components/QuestionSelectorSidebar';
import QuestionDetailsPanel from './components/QuestionDetailsPanel';
import CodeEditor from './components/CodeEditor';
import IssuePanel from './components/IssuePanel';
import SettingsSidebar from './components/SettingsSidebar';
import VoiceCommandButton from './components/VoiceCommandButton';
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
      if (e.ctrlKey && e.key === 'q') {
        e.preventDefault();
        setLeftSidebarVisible(prev => !prev);
      }
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        setRightSidebarVisible(prev => !prev);
      }
      if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        setIssuePanelVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppProvider>
      <div className="app-container h-screen w-screen flex overflow-hidden">
        <QuestionSelectorSidebar
          isVisible={leftSidebarVisible}
          onVisibilityChange={setLeftSidebarVisible}
        />

        <div className="main-area flex flex-col flex-grow h-full overflow-hidden">
          <div className="main-content flex flex-grow overflow-hidden">
            <QuestionDetailsPanel />
            <div className="code-editor-container flex-grow overflow-hidden">
              <CodeEditor />
            </div>
          </div>

          <IssuePanel
            isVisible={issuePanelVisible}
            onVisibilityChange={setIssuePanelVisible}
          />
        </div>

        <SettingsSidebar
          isVisible={rightSidebarVisible}
          onVisibilityChange={setRightSidebarVisible}
        />

        <VoiceCommandButton />

        {/* Hover detection zones */}
        <div
          className="hover-zone-left"
          onMouseEnter={() => setLeftSidebarVisible(true)}
        />
        <div
          className="hover-zone-right"
          onMouseEnter={() => setRightSidebarVisible(true)}
        />
        <div
          className="hover-zone-bottom"
          onMouseEnter={() => setIssuePanelVisible(true)}
        />
      </div>
    </AppProvider>
  );
}

export default App;
