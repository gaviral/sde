interface Props {
  mode: string
  onModeChange: (mode: string) => void
  onExport: () => void
  onImport: (data: string) => void
}

/**
 * Sidebar for switching modes and importing/exporting progress.
 */
export default function SettingsSidebar({ mode, onModeChange, onExport, onImport }: Props) {
  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onImport(reader.result)
      }
    }
    reader.readAsText(file)
  }

  return (
    <aside className="settings">
      <h3>Settings</h3>
      <label>
        Mode:
        <select value={mode} onChange={e => onModeChange(e.target.value)}>
          <option value="learning">Learning</option>
          <option value="mock">Mock</option>
        </select>
      </label>
      <div>
        <button onClick={onExport}>Download Progress</button>
        <input type="file" onChange={handleUpload} />
      </div>
    </aside>
  )
}
