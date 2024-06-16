import { NoteInfo } from '@shared/model'
import { ComponentProps } from 'react'
import { cn, dateFormatter } from '../utils/index'
export type NotePreviewProps = NoteInfo & { isActive?: boolean } & ComponentProps<'div'>

export const NoteProview = ({
  title,
  lastEditTime,
  content,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {
  const date = dateFormatter(lastEditTime)
  return (
    // 左侧文件名的显示组件
    <div
      className={cn(
        'cursor-pointer px-3 py-2 rounded-md transition-colors duration-75',
        {
          'bg-zinc-400/75': isActive,
          'hover:bg-zinc-500/75': !isActive
        },
        className
      )}
      {...props}
    >
      <h3 className="mb-1 font-bold truncate">{title}</h3>
      <span className="inline-block w-full mb-2 text-xs font-light text-left">{date}</span>
    </div>
  )
}
