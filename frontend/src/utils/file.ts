/**
 * Trigger a download of the provided data as a JSON file.
 *
 * The function serializes the object, creates a blob and
 * programmatically clicks an anchor element to start the download.
 *
 * @param data - Data to serialize as JSON.
 * @param filename - Optional filename for the download.
 */
export function saveAs(data: unknown, filename = 'progress.json') {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
}

