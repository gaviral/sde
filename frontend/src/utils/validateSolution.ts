import type { Question } from '../components/questionData'

/**
 * Validate the given code against the question's solution.
 *
 * Returns an array of issue messages if the provided code does not
 * exactly match the expected solution. The array will be empty when
 * the code passes all checks.
 *
 * @param question - The question to validate against.
 * @param code - The candidate solution code.
 * @returns A list of issues found while validating.
 */
export function validateSolution(question: Question, code: string): string[] {
  const issues: string[] = []
  if (code.trim() !== question.solution.trim()) {
    issues.push('Solution does not match exactly.')
  }
  return issues
}
