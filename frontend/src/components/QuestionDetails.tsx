import { Question } from './questionData'

export default function QuestionDetails({ question }: { question: Question }) {
  return (
    <section className="details">
      <h2>{question.title}</h2>
      <pre>{question.description}</pre>
    </section>
  )
}
