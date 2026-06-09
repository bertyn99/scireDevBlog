import * as monaco from 'monaco-editor'

export function useMonaco(
  container: Ref<HTMLElement | null>,
  initialCode: string,
  language: string = 'css',
  onChange?: (code: string) => void,
) {
  let editor: monaco.editor.IStandaloneCodeEditor | null = null

  onMounted(() => {
    if (!container.value) return

    editor = monaco.editor.create(container.value, {
      value: initialCode,
      language,
      theme: 'vs-dark',
      fontSize: 14,
      minimap: { enabled: false },
      automaticLayout: true,
      tabSize: 2,
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      padding: { top: 12, bottom: 12 },
    })

    editor.onDidChangeModelContent(() => {
      onChange?.(editor!.getValue())
    })
  })

  onUnmounted(() => {
    editor?.dispose()
  })

  const setCode = (code: string) => {
    editor?.setValue(code)
  }

  const getCode = () => editor?.getValue() ?? ''

  return { setCode, getCode }
}
