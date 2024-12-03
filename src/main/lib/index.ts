// 渲染进程不能直接使用node

import { appDirectoryName, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/model'
import { CreateNote, GetNotes, ReadNoteDetail, SaveNote } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readdir, readFile, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import path from 'path'

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
  console.log(`文件写入${filename}`)

  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { canceled, filePath } = await dialog.showSaveDialog({
    title: '创建笔记',
    defaultPath: `${rootDir}/新建笔记.md`,
    filters: [{ name: 'Markdown', extensions: ['md'] }],
    buttonLabel: '创建',
    properties: ['createDirectory', 'showOverwriteConfirmation']
  })

  if (!canceled || !filePath) {
    return false
  }

  const { name: fileName, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: '错误',
      message: '只能创建在根目录下'
    })
    return false
  }

  await writeFile(`${rootDir}/${fileName}.md`, '')

  return fileName
}
