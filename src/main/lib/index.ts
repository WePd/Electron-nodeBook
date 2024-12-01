// 渲染进程不能直接使用node

import { appDirectoryName, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/model'
import { GetNotes, ReadNoteDetail, SaveNote } from '@shared/types'
import { ensureDir, readdir, readFile, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  // 拿到文件夹根目录
  const rootDir = getRootDir()
  // 判断目录是否存在
  await ensureDir(rootDir)
  //获取文件名
  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })
  // 判断文件的类型 是否是以md结尾
  const notes = notesFileNames.filter((note) => note.endsWith('.md'))

  return Promise.all(notes.map(getNoteInfoFromFileName))
}

export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${fileName}`)

  return {
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStats.atimeMs
  }
}

export const readNoteDetail: ReadNoteDetail = (filename) => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}

export const saveNote: SaveNote = (filename, content) => {
  const rootDir = getRootDir()

  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}
