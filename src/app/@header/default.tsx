'use client'

import { Button } from '@/components/ui/button'
import { Search, UserRoundPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  if (pathname !== '/') return <></>

  return (
    <header className="mx-auto flex max-w-screen-lg flex-col items-center gap-4 px-4 pt-8 sm:flex-row sm:justify-between">
      <div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Contact App</span>
          <span className="text-sm text-secondary-foreground">
            Save your contact here
          </span>
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div className="relative flex-1">
          <label htmlFor="search-contact" className="sr-only">
            Search
          </label>
          <span className="pointer-events-none absolute inset-y-0 start-0 grid w-10 place-content-center text-gray-500">
            <Search className="size-4 -scale-x-100" />
          </span>
          <input
            type="search"
            id="search-contact"
            placeholder="Search here"
            className="size-full rounded-md border-none ps-10 shadow-sm focus:ring-0 sm:text-sm"
            defaultValue={searchParams.get('search') ?? ''}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams.toString())
              params.set('search', e.target.value)
              params.set('page', '1')
              router.push('?' + params.toString())
            }}
          />
        </div>

        <Button asChild className="space-x-1 rounded-lg shadow-sm">
          <Link href="/new-contact">
            <UserRoundPlus className="size-4" />
            <span>New Contact</span>
          </Link>
        </Button>
      </div>
    </header>
  )
}
