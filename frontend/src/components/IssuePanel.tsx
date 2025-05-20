/**
 * Display a list of validation issues if any exist.
 *
 * The panel is hidden when the issue array is empty.
 */
interface Props {
  issues: string[]
  visible?: boolean
  onMouseLeave?: React.MouseEventHandler<HTMLElement>
}

export default function IssuePanel({ issues, visible = false, onMouseLeave }: Props) {
  if (issues.length === 0) return null
  return (
    <aside
      onMouseLeave={onMouseLeave}
      className={`issues fixed bottom-0 left-0 right-0 bg-white transform transition-transform ${visible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <h3>Issues</h3>
      <ul>
        {issues.map((iss, i) => (
          <li key={i}>{iss}</li>
        ))}
      </ul>
    </aside>
  )
}
