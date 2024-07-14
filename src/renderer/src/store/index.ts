import { notesMocks } from '@/store/mocks'
import { NoteInfo } from '@shared/model'
import { atom } from 'jotai'

export const notesAtom = atom<NoteInfo[]>(notesMocks)

// 选中的索引
export const selectedNoteIndexAtom = atom<number | null>(null)

export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom)
  const selectNoteIndex = get(selectedNoteIndexAtom)
  if (selectNoteIndex == null) return null

  const selectNote = notes[selectNoteIndex]

  return {
    ...selectNote,
    content: `Hello from ${selectNoteIndex}`
  }
})
