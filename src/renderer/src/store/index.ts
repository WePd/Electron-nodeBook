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

// new
export const createEmptyNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)

  const title = `Note ${notes.length + 1}`

  const newNote: NoteInfo = {
    title,
    lastEditTime: Date.now()
  }

  // 更新
  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])

  // 默认选中
  set(selectedNoteIndexAtom, 0)
})

// delete
export const deleteNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)

  const selectedNote = get(selectedNoteAtom)
  if (!selectedNote) return
  // 删除更新
  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
  )

  // 删除后默认没有选中的note
  set(selectedNoteIndexAtom, null)
})
