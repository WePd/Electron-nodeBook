import { NoteContent, NoteInfo } from './model'

export type GetNotes = () => Promise<NoteInfo[]>
export type ReadNoteDetail = (title: NoteInfo['title']) => Promise<NoteContent>
export type SaveNote = (title: NoteInfo['title'], content: NoteContent) => Promise<void>
export type CreateNote = () => Promise<NoteInfo['title'] | false>
