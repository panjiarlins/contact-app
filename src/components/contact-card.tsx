import { EllipsisVertical, Home, Mail, Phone } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from './ui/menubar'
import Link from 'next/link'

export default function ContactCard({
  id,
  name,
  email,
  phone,
  imageURL,
  relationship,
  address,
}: {
  id: string
  name: string
  email: string
  phone: string
  imageURL: string
  relationship: string
  address: string
}) {
  return (
    <div className="relative mx-auto flex size-fit h-[359px] w-[276px] flex-col justify-evenly overflow-hidden rounded-xl bg-background p-4 shadow-sm">
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
            <MenubarItem>Delete</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <div>
        <div className="relative mx-auto size-fit">
          <Image
            unoptimized
            priority
            src={imageURL}
            alt={`Photo of ${name}`}
            width={105}
            height={105}
            className="rounded-3xl border-4 border-white"
          />
          <Image
            unoptimized
            priority
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`}
            alt={`Avatar of ${name}`}
            width={42}
            height={42}
            className="absolute -right-[24px] bottom-0 mx-auto rounded-2xl border border-white"
          />
        </div>
      </div>

      <div className="text-center">
        <div className="font-bold">{name}</div>
        <div className="text-sm">
          <div className="text-primary">{relationship}</div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <span className="size-fit">
          <Button size="icon" className="pointer-events-none size-8 rounded-xl">
            <Phone className="size-4" />
          </Button>
        </span>
        <span className="truncate text-sm">{phone}</span>
      </div>

      <div className="flex flex-row items-center gap-2">
        <span className="size-fit">
          <Button size="icon" className="pointer-events-none size-8 rounded-xl">
            <Mail className="size-4" />
          </Button>
        </span>
        <span className="truncate text-sm">{email}</span>
      </div>

      <div className="flex flex-row items-center gap-2">
        <span className="size-fit">
          <Button size="icon" className="pointer-events-none size-8 rounded-xl">
            <Home className="size-4" />
          </Button>
        </span>
        <span className="text-wrap text-sm">{address}</span>
      </div>
    </div>
  )
}
