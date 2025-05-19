import { Question } from './questionData'

interface Props {
  questions: Question[]
  current: number
  onSelect: (id: number) => void
}

export default function QuestionSelector({ questions, current, onSelect }: Props) {
  return (
    <aside className="selector">
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
