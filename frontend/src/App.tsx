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

function App() {
  // persistent progress backed by localStorage via custom hook
  const [progress, setProgress] = usePersistentProgress()
  const [issues, setIssues] = useState<string[]>([])

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
      <QuestionSelector
        questions={questions}
        current={current.id}
        onSelect={id => setProgress(p => ({ ...p, selected: id }))}
      />
      <QuestionDetails question={current} />
      <CodeEditor
        question={current}
        code={progress.codes[current.id] || current.starter}
        onChange={setCode}
        onCheck={setIssues}
      />
      <IssuePanel issues={issues} />
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
      />
      <VoiceButton onCommand={handleCommand} /> {/* voice recognition */}
    </div>
  )
}

export default App
