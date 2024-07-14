import { ActionButton, ActionButtonProps } from '@/components'
import { deleteNoteAtom } from '@/store'
import { useSetAtom } from 'jotai'
import { FaRegTrashCan } from 'react-icons/fa6'


export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom)

  const handleDeleteNote = () => {
    deleteNote()
  }
  return (
    <ActionButton onClick={handleDeleteNote} {...props}>
      <FaRegTrashCan className="h-4 w-4 text-zinc-300" />
    </ActionButton>
  )
}
