import { CreateNote, GetNotes, ReadNoteDetail, SaveNote } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolated must bb enable in windows')
}

try {
  contextBridge.exposeInMainWorld('rendererApi', {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
    readNoteDatail: (...args: Parameters<ReadNoteDetail>) =>
      ipcRenderer.invoke('getNoteDetail', ...args),
    saveNote: (...args: Parameters<SaveNote>) => ipcRenderer.invoke('saveNote', ...args),
    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),
  })
} catch (error) {
  console.error(error)
}
