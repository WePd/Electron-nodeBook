import { NoteProview } from '@/components'
import { useNotesList } from '@/hooks/useNotesList'
import { NoteInfo } from '@shared/model'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({ onSelect, className, ...props }: NotePreviewListProps) => {
  const { notes, handleNoteSelect, selectedNoteIndex } = useNotesList({ onSelect })
  if (notes.length === 0) {
    return <ul className={twMerge('text-center pt-2', className)}>NO Note Yet!</ul>
  }
  return (
    <ul className={className} {...props}>
      {notes.map((note: NoteInfo, index: number) => (
        <NoteProview
          key={note.title + note.lastEditTime}
          isActive={selectedNoteIndex === index}
          onClick={handleNoteSelect(index)}
          {...note}
        />
      ))}
    </ul>
  )
}
