import { useState } from 'react'
import type { Question } from './questionData'

interface Props {
  question: Question
  code: string
  onChange: (code: string) => void
  onCheck: (issues: string[]) => void
}

export default function CodeEditor({ question, code, onChange, onCheck }: Props) {
  const [local, setLocal] = useState(code)

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setLocal(e.target.value)
    onChange(e.target.value)
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
      <textarea value={local} onChange={handleChange} rows={20} cols={60} />
      <div>
        <button id="check-btn" onClick={handleCheck}>Check</button>
      </div>
    </div>
  )
}
