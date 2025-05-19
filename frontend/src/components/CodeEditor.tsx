import { useState, useEffect } from 'react'
import MonacoEditor from '@monaco-editor/react'
import type { Question } from './questionData'

interface Props {
  question: Question
  code: string
  onChange: (code: string) => void
  onCheck: (issues: string[]) => void
}

export default function CodeEditor({ question, code, onChange, onCheck }: Props) {
  const [local, setLocal] = useState(code)

  useEffect(() => {
    setLocal(code)
  }, [code, question.id])

  function handleChange(value: string | undefined) {
    const val = value ?? ''
    setLocal(val)
    onChange(val)
  }

  function handleCheck() {
    const issues: string[] = []
    if (local.trim() !== question.solution.trim()) {
      issues.push('Solution does not match exactly.')
    }
    onCheck(issues)
  }

  return (
    <div className="editor">
      <MonacoEditor
        value={local}
        language="python"
        onChange={handleChange}
        options={{ automaticLayout: true }}
        className="h-96 w-full"
      />
      <div>
        <button id="check-btn" onClick={handleCheck}>Check</button>
      </div>
    </div>
  )
}
