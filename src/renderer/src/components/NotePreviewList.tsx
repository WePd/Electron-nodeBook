import { NoteProview } from '@/components'
import { notesMocks } from '@/store/mocks'
import { NoteInfo } from '@shared/model'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const NotePreviewList = ({ className, ...props }: ComponentProps<'ul'>) => {
  if (notesMocks.length === 0) {
    return <ul className={twMerge('text-center pt-2', className)}>NO Note Yet!</ul>
  }
  return (
    <ul className={className} {...props}>
      {notesMocks.map((note: NoteInfo) => (
        <NoteProview key={note.title + note.lastEditTime} {...note} />
      ))}
    </ul>
  )
}
