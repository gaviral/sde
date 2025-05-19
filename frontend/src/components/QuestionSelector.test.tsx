import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import QuestionSelector from './QuestionSelector'
import type { Question } from './questionData'

const qs: Question[] = [
  { id: 1, title: 'One', description: '', starter: '', solution: '' },
  { id: 2, title: 'Two', description: '', starter: '', solution: '' }
]

describe('QuestionSelector', () => {
  it('calls onSelect when a question button is clicked', () => {
    const onSelect = vi.fn()
    render(<QuestionSelector questions={qs} current={1} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('2. Two'))
    expect(onSelect).toHaveBeenCalledWith(2)
  })
})
