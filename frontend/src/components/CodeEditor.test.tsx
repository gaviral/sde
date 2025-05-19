import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CodeEditor from './CodeEditor'
import type { Question } from './questionData'

const q1: Question = { id: 1, title: 'One', description: 'd1', starter: 's1', solution: 's1' }
const q2: Question = { id: 2, title: 'Two', description: 'd2', starter: 's2', solution: 's2' }

describe('CodeEditor', () => {
  it('updates local state when props change', () => {
    const onChange = vi.fn()
    const onCheck = vi.fn()
    const { rerender } = render(
      <CodeEditor question={q1} code={q1.starter} onChange={onChange} onCheck={onCheck} />,
    )
    expect(screen.getByRole('textbox')).toHaveValue('s1')

    rerender(
      <CodeEditor question={q2} code={q2.starter} onChange={onChange} onCheck={onCheck} />,
    )
    expect(screen.getByRole('textbox')).toHaveValue('s2')
  })

  it('calls onCheck with issues when code is wrong', () => {
    const onChange = vi.fn()
    const onCheck = vi.fn()
    render(
      <CodeEditor question={q1} code={q1.starter} onChange={onChange} onCheck={onCheck} />,
    )
    screen.getByRole('button', { name: 'Check' }).click()
    expect(onCheck).toHaveBeenCalledWith(['Solution does not match exactly.'])
  })
})
