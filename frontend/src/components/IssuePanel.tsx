/**
 * Display a list of validation issues if any exist.
 *
 * The panel is hidden when the issue array is empty.
 */
export default function IssuePanel({ issues }: { issues: string[] }) {
  if (issues.length === 0) return null
  return (
    <aside className="issues">
      <h3>Issues</h3>
      <ul>
        {issues.map((iss, i) => (
          <li key={i}>{iss}</li>
        ))}
      </ul>
    </aside>
  )
}
