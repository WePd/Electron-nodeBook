// 渲染进程不能直接使用node

import { appDirectoryName } from '@shared/constants'
import { homedir } from 'os'

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}
