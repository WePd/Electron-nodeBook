import { notesMocks } from '@/store/mocks'
import { NoteInfo } from '@shared/model'
import { ComponentProps } from 'react'
import { NoteProview } from '@/components'

export const NotePreviewList = ({ ...props }: ComponentProps<'ul'>) => {
  return (
    <ul {...props}>
      {notesMocks.map((note: NoteInfo) => (
        <NoteProview key={note.title + note.lastEditTime} {...note} />
      ))}
    </ul>
  )
}
