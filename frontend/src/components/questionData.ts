import data from '../../content/questions.json'

export interface Question {
  id: number
  title: string
  description: string
  starter: string
  solution: string
}

const baseQuestions = data as Question[]

export const questions: Question[] = [...baseQuestions]

for (let i = baseQuestions.length + 1; i <= 50; i++) {
  questions.push({
    id: i,
    title: `Placeholder ${i}`,
    description: 'Coming soon.',
    starter: 'def solution():\n    pass',
    solution: 'def solution():\n    pass',
  })
}
