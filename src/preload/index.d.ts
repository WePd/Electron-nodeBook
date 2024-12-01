import { GetNots, ReadNoteDetail, SaveNote } from '@shared/types'

declare global {
  interface Window {
    rendererApi: {
      locale: string
      getNotes: GetNots
      readNoteDatail: ReadNoteDetail
      saveNote: SaveNote
    }
  }
}
