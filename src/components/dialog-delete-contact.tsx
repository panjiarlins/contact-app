'use client'

import { useAction } from 'next-safe-action/hooks'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { deleteContact } from '@/action/contact'
import { toast } from 'sonner'

export default function DialogDeleteContact({
  id,
  isOpen,
  setIsOpen,
}: {
  id: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { execute, status } = useAction(deleteContact, {
    onExecute: () => {
      toast.loading('Deleting contact...', {
        duration: Infinity,
        dismissible: true,
        id,
      })
    },
    onError: (error) => {
      toast.error(
        error.fetchError ?? error.serverError ?? 'Failed to delete contact',
        { duration: 4000, id }
      )
    },
    onSuccess: () => {
      toast.success('Contact is deleted', { duration: 4000, id })
    },
  })

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This contact will be deleted
            permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={status === 'executing'}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={status === 'executing'}
            onClick={() => {
              execute({ id })
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
