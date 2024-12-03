import { NoteContent, NoteInfo } from '@shared/model'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

const loadNotes = async () => {
  const notes = await window.rendererApi.getNotes()
  console.log(notes, '---')
  // sort by most recently etited
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

// export const notesAtom = atom<NoteInfo[]>(notesMocks)
export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

// 选中的索引
export const selectedNoteIndexAtom = atom<number | null>(null)

const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectNoteIndex = get(selectedNoteIndexAtom)
  if (selectNoteIndex == null || !notes) return null

  const selectNote = notes[selectNoteIndex]
  // 获取note的内容
  const noteContent = await window.rendererApi.readNoteDatail(selectNote.title)

  return {
    ...selectNote,
    content: noteContent
  }
})

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      title: '',
      content: '',
      lastEditTime: Date.now()
    }
)

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  // save constent
  await window.rendererApi.saveNote(selectedNote.title, newContent)

  // upsate last edit time
  set(
    notesAtom,
    notes.map((note) => {
      if (note.title === selectedNote.title) {
        return {
          ...note,
          lastEditTime: Date.now()
        }
      }
      return note
    })
  )
})

// new
export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  debugger
  if (!notes) return

  const title = await window.rendererApi.createNote()

  if (!title) return

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
  if (!selectedNote || !notes) return
  // 删除更新
  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNote.title)
  )

  // 删除后默认没有选中的note
  set(selectedNoteIndexAtom, null)
})
