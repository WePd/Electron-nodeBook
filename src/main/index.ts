import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { GetNotes, ReadNoteDetail, SaveNote } from '@shared/types'
import { BrowserWindow, app, ipcMain, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { getNotes, readNoteDetail, saveNote } from './lib'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    center: true, // 初次打开后显示在屏幕中间
    title: 'NoteBook',
    // frame: false, // 创建无帧窗口
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 15, y: 10 },
    // vibrancy: 'under-window', // mac下使用
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 在主进程中
  mainWindow.webContents.openDevTools()

  // // 在渲染进程中，可以直接使用
  // window.openDevTools()

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // 获取nots  需要的是主渲相互通信 则选择 invoke(渲) handle(主)通信
  ipcMain.handle('getNotes', async (_, ...args: Parameters<GetNotes>) => {
    console.log(...args, '主进程')
    // return `torender`
    return getNotes(...args)
  })

  // 读取note的内容
  ipcMain.handle('getNoteDetail', async (_, ...args: Parameters<ReadNoteDetail>) =>
    readNoteDetail(...args)
  )

  // 保存note的内容

  ipcMain.handle('saveNote', async (_, ...args: Parameters<SaveNote>) => saveNote(...args))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
