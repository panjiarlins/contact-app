import { Button } from '@/components/ui/button'
import { Search, UserRoundPlus } from 'lucide-react'

export default function Header() {
  return (
    <header className="columns-2">
      <div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Contact App</span>
          <span className="text-sm text-secondary-foreground">
            Save your contact here
          </span>
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div className="relative">
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
            className="size-full rounded-md border-none ps-10 shadow-sm focus:bg-background focus:ring-0 sm:text-sm"
          />
        </div>

        <Button className="space-x-1 rounded-lg shadow-sm">
          <UserRoundPlus className="size-4" />
          <span>New Contact</span>
        </Button>
      </div>
    </header>
  )
}
