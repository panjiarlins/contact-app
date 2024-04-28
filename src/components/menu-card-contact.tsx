'use client'

import { EllipsisVertical } from 'lucide-react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from './ui/menubar'
import Link from 'next/link'
import { useState } from 'react'
import DialogDeleteContact from './dialog-delete-contact'

export default function MenuCardContact({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <DialogDeleteContact id={id} isOpen={isOpen} setIsOpen={setIsOpen} />
      <Menubar className="absolute right-1 top-2 z-10 border-none bg-transparent">
        <MenubarMenu>
          <MenubarTrigger className="size-10 rounded-full">
            <EllipsisVertical />
          </MenubarTrigger>
          <MenubarContent className="bg-secondary">
            <Link href={`/edit-contact/${id}`}>
              <MenubarItem>Edit</MenubarItem>
            </Link>
            <MenubarSeparator />
            <MenubarItem
              onSelect={() => {
                setIsOpen(true)
              }}
            >
              Delete
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  )
}
