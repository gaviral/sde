import * as monaco from 'monaco-editor';

declare module '@monaco-editor/react' {
  import * as React from 'react'
  export interface OnChange {
    (value: string | undefined, event?: monaco.editor.IModelContentChangedEvent): void
  }
  export interface MonacoEditorProps {
    value?: string
    language?: string
    height?: string | number
    width?: string | number
    onChange?: OnChange
    options?: Record<string, unknown>
    className?: string
  }
  export default function MonacoEditor(props: MonacoEditorProps): React.ReactElement
}
