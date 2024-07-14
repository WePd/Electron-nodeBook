import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// 用来合并tailwindcss的样式
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}

export const dateFormatter = (lastEditTime: any) => {
  const date = new Date(lastEditTime)
  // 获取年、月、日
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // getMonth() 返回的月份是从0开始的，所以需要加1
  const day = date.getDate()

  // 获取时、分、秒
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  // 构建自己的日期格式字符串
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  return formattedDate
}

const dateFormatter_old = new Intl.DateTimeFormat(window.AudioContext.locale, {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone:'UTC'
})

export const dateFormatter_New = (ms: bumber) => dateFormatter_old.format()
