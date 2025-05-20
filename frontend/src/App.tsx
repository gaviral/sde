import { useState } from 'react'
import QuestionSelector from './components/QuestionSelector'
import QuestionDetails from './components/QuestionDetails'
import CodeEditor from './components/CodeEditor'
import IssuePanel from './components/IssuePanel'
import SettingsSidebar from './components/SettingsSidebar'
import VoiceButton from './components/VoiceButton'
import { questions } from './components/questionData'
import usePersistentProgress from './hooks/usePersistentProgress'
import type { Progress } from './components/storage'
import { saveAs } from './utils/file'
import './App.css'

/**
 * Main application component wiring together all UI pieces.
 */
function App() {
  // persistent progress backed by localStorage via custom hook
  const [progress, setProgress] = usePersistentProgress()
  const [issues, setIssues] = useState<string[]>([])
  const [showSelector, setShowSelector] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showIssues, setShowIssues] = useState(false)

  const current = questions.find(q => q.id === progress.selected) || questions[0]


  // update stored code when the editor changes
  function setCode(code: string) {
    setProgress(p => ({ ...p, codes: { ...p.codes, [current.id]: code } }))
  }

  // interpret voice commands like "go to question two"
  function handleCommand(cmd: string) {
    const match = cmd.match(/question (\d+)/i)
    if (match) {
      const id = parseInt(match[1], 10)
      if (questions.some(q => q.id === id)) {
        setProgress(p => ({ ...p, selected: id }))
      }
    }
    if (/check code/i.test(cmd)) {
      // trigger the editor validation
      document.getElementById('check-btn')?.click()
    }
  }

  return (
    <div className="app">
      <div
        className="fixed top-0 left-0 h-full w-1"
        onMouseEnter={() => setShowSelector(true)}
      />
      <div
        className="fixed top-0 right-0 h-full w-1"
        onMouseEnter={() => setShowSettings(true)}
      />
      <div
        className="fixed bottom-0 left-0 w-full h-1"
        onMouseEnter={() => setShowIssues(true)}
      />
      <QuestionSelector
        questions={questions}
        current={current.id}
        onSelect={id => setProgress(p => ({ ...p, selected: id }))}
        visible={showSelector}
        onMouseLeave={() => setShowSelector(false)}
      />
      <QuestionDetails question={current} />
      <CodeEditor
        question={current}
        code={progress.codes[current.id] || current.starter}
        onChange={setCode}
        onCheck={iss => {
          setIssues(iss)
          if (iss.length > 0) setShowIssues(true)
        }}
      />
      <IssuePanel
        issues={issues}
        visible={showIssues}
        onMouseLeave={() => setShowIssues(false)}
      />
      <SettingsSidebar
        mode={progress.mode}
        onModeChange={mode => setProgress(p => ({ ...p, mode }))}
        onExport={() => saveAs(progress)} // download progress to a file
        onImport={raw => {
          try {
            const data = JSON.parse(raw) as Progress
            setProgress(data)
          } catch (e) {
            console.error('Failed to parse progress data from local storage:', e)
          }
        }}
        visible={showSettings}
        onMouseLeave={() => setShowSettings(false)}
      />
      <VoiceButton onCommand={handleCommand} /> {/* voice recognition */}
    </div>
  )
}

export default App
