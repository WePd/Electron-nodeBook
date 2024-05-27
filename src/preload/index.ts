import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolated must bb enable in windows')
}

try {
  contextBridge.exposeInMainWorld('context', {})
} catch (error) {
  console.error(error)
}
