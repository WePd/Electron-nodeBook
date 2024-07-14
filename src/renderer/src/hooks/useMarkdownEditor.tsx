import { selectedNoteAtom } from '@/store'
import { useAtomValue } from 'jotai'

export const useMarkdownEditor = () => {
  const selectNote = useAtomValue(selectedNoteAtom)

  return {
    selectNote
  }
}
