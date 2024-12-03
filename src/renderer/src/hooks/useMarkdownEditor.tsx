import { saveNoteAtom, selectedNoteAtom } from '@/store'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { autoSavingTime } from '@shared/constants'
import { NoteContent } from '@shared/model'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const useMarkdownEditor = () => {
  const selectNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  // auto save
  const handleAutoSave = throttle(
    async (content: NoteContent) => {
      if (!selectNote) return
      console.log('auto save')
      await saveNote(content)
    },
    autoSavingTime,
    {
      loading: false,
      trailing: true
    }
  )

  const handleBlur = async () => {
    if (!selectNote) return
    handleAutoSave.cancel()
    const content = editorRef.current?.getMarkdown()
    if (content) {
      await saveNote(content)
    }
  }

  return {
    selectNote,
    handleAutoSave,
    editorRef,
    handleBlur
  }
}
