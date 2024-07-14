import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyNoteAtom } from '@/store'
import { useSetAtom } from 'jotai'
import { LuFileSignature } from 'react-icons/lu'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleCreateNewNote = () => {
    console.log(111)

    createEmptyNote()
  }
  return (
    <ActionButton onClick={handleCreateNewNote} {...props}>
      <LuFileSignature className="h-4 w-4 text-zinc-300" />
    </ActionButton>
  )
}
