import { useState, useEffect, useRef } from 'react';
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

  // Refs for elements that need focus
  const voiceButtonRef = useRef<HTMLButtonElement>(null);
  const checkButtonRef = useRef<HTMLButtonElement>(null);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add keyboard shortcuts here for accessibility
      // Control + key combinations
      if (e.ctrlKey) {
        switch (e.key) {
          case 'q':
            e.preventDefault();
            setLeftSidebarVisible(prev => !prev);
            break;
          case 's':
            e.preventDefault();
            setRightSidebarVisible(prev => !prev);
            break;
          case 'i':
            e.preventDefault();
            setIssuePanelVisible(prev => !prev);
            break;
          case 'Enter':
            e.preventDefault();
            // Find and click the check button
            document.querySelector<HTMLButtonElement>('[data-action="check"]')?.click();
            break;
          case 'v':
            e.preventDefault();
            // Focus the voice button
            voiceButtonRef.current?.focus();
            voiceButtonRef.current?.click();
            break;
          default:
            break;
        }
      }

      // Alt + key combinations for navigation
      if (e.altKey) {
        const questionNumber = parseInt(e.key);
        if (!isNaN(questionNumber) && questionNumber >= 0 && questionNumber <= 9) {
          e.preventDefault();
          // Find and click the respective question (0 = 10)
          const targetQuestion = questionNumber === 0 ? 10 : questionNumber;
          document.querySelector<HTMLElement>(`[data-question-id="${targetQuestion}"]`)?.click();
        }
      }

      // Escape key to close all panels
      if (e.key === 'Escape') {
        setLeftSidebarVisible(false);
        setRightSidebarVisible(false);
        setIssuePanelVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Provide the refs to the components
  const provideVoiceButtonRef = (ref: HTMLButtonElement | null) => {
    if (ref) voiceButtonRef.current = ref;
  };

  const provideCheckButtonRef = (ref: HTMLButtonElement | null) => {
    if (ref) checkButtonRef.current = ref;
  };

  const handleCheckCode = () => {
    // Find and click the check button in the IssuePanel
    document.querySelector<HTMLButtonElement>('[data-action="check"]')?.click();
    // Make sure the issue panel is visible
    setIssuePanelVisible(true);
  };

  return (
    <AppProvider>
      <div className="app-container h-screen w-screen flex overflow-hidden relative">
        {/* Sidebars are now absolutely positioned */}
        <QuestionSelectorSidebar
          isVisible={leftSidebarVisible}
          onVisibilityChange={setLeftSidebarVisible}
        />

        {/* Main content area */}
        <div className="main-content-area flex flex-col flex-grow h-full overflow-hidden">
          <div className="main-content flex flex-grow overflow-hidden">
            <QuestionDetailsPanel />
            <div className="code-editor-container flex-grow overflow-hidden relative">
              <CodeEditor />
              {/* Persistent Check Button */}
              <button
                onClick={handleCheckCode}
                className="absolute bottom-4 right-4 px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition z-20"
                data-action="persistent-check"
              >
                Check Solution
              </button>
            </div>
          </div>

          {/* Issue Panel is now absolutely positioned */}
          <IssuePanel
            isVisible={issuePanelVisible}
            onVisibilityChange={setIssuePanelVisible}
            provideCheckButtonRef={provideCheckButtonRef}
          />
        </div>

        {/* Settings Sidebar is now absolutely positioned */}
        <SettingsSidebar
          isVisible={rightSidebarVisible}
          onVisibilityChange={setRightSidebarVisible}
        />

        <VoiceCommandButton provideButtonRef={provideVoiceButtonRef} />

        {/* Hover detection zones */}
        <div
          className="hover-zone-left"
          onMouseEnter={() => setLeftSidebarVisible(true)}
          data-action="questions"
        />
        <div
          className="hover-zone-right"
          onMouseEnter={() => setRightSidebarVisible(true)}
          data-action="settings"
        />
        <div
          className="hover-zone-bottom"
          onMouseEnter={() => setIssuePanelVisible(true)}
          data-action="issues"
        />

        {/* Keyboard shortcut help tooltip */}
        <div className="fixed bottom-4 left-4 bg-gray-800 text-white text-xs p-2 rounded-md opacity-50 hover:opacity-100 transition-opacity">
          <strong>Shortcuts:</strong> Ctrl+Q (Questions), Ctrl+S (Settings), Ctrl+I (Issues), Ctrl+Enter (Check), Ctrl+V (Voice)
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
