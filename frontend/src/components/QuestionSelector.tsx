import type { Question } from './questionData'

interface Props {
  questions: Question[]
  current: number
  onSelect: (id: number) => void
  visible?: boolean
  onMouseLeave?: React.MouseEventHandler<HTMLElement>
}
/**
 * List all questions and allow one to be selected.
 */

export default function QuestionSelector({
  questions,
  current,
  onSelect,
  visible = false,
  onMouseLeave,
}: Props) {
  return (
    <aside
      onMouseLeave={onMouseLeave}
      className={`selector fixed top-0 left-0 h-full bg-white transform transition-transform ${visible ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <ul>
        {questions.map(q => (
          <li key={q.id}>
            <button
              className={q.id === current ? 'active' : ''}
              onClick={() => onSelect(q.id)}
            >
              {q.id}. {q.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
