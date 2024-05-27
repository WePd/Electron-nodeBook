import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// 用来合并tailwindcss的样式
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
