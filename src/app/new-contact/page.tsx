'use client'

import { createContact } from '@/action/contact'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  BookUser,
  ContactRound,
  Handshake,
  Home,
  Mail,
  Phone,
  UserRound,
} from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const TOAST_ID = 'create-contact'

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  imageURL: z.string().url(),
  relationship: z.string().min(3),
  address: z.string().min(5),
})

export default function NewContact() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      imageURL: '',
      relationship: '',
      address: '',
    },
  })

  const { execute } = useAction(createContact, {
    onExecute: () => {
      toast.loading('Creating contact...', {
        duration: Infinity,
        dismissible: true,
        id: TOAST_ID,
      })
    },
    onError: (error) => {
      toast.error(
        error.fetchError ?? error.serverError ?? 'Failed to create contact',
        { duration: 4000, id: TOAST_ID }
      )
    },
    onSuccess: () => {
      toast.success('Contact created', { duration: 4000, id: TOAST_ID })
      form.reset()
      router.push('/')
    },
  })

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      execute(values)
    },
    [execute]
  )

  return (
    <main className="mx-auto max-w-screen-lg">
      <section className="mx-auto p-8 sm:px-12 lg:px-16 lg:py-12">
        <Link className="text-primary" href="/">
          <span className="sr-only">Home</span>
          <BookUser className="size-8 sm:size-10" />
        </Link>

        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Create a new contact
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500">
          Fill in the form below to create a new contact
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 start-0 grid w-10 place-content-center text-gray-500">
                        <UserRound className="size-4" />
                      </span>
                      <input
                        type="text"
                        className="size-full rounded-md border-none ps-10 shadow-sm focus:ring-0 sm:text-sm"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Image URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 start-0 grid w-10 place-content-center text-gray-500">
                        <ContactRound className="size-4" />
                      </span>
                      <input
                        type="url"
                        className="size-full rounded-md border-none ps-10 shadow-sm focus:ring-0 sm:text-sm"
                        placeholder="https://www.google.com"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 start-0 grid w-10 place-content-center text-gray-500">
                        <Mail className="size-4" />
                      </span>
                      <input
                        type="email"
                        className="size-full rounded-md border-none ps-10 shadow-sm focus:ring-0 sm:text-sm"
                        placeholder="example@mail.com"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Phone</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 start-0 grid w-10 place-content-center text-gray-500">
                        <Phone className="size-4" />
                      </span>
                      <input
                        type="tel"
                        className="size-full rounded-md border-none ps-10 shadow-sm focus:ring-0 sm:text-sm"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Relationship</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 start-0 grid w-10 place-content-center text-gray-500">
                        <Handshake className="size-4" />
                      </span>
                      <input
                        type="text"
                        className="size-full rounded-md border-none ps-10 shadow-sm focus:ring-0 sm:text-sm"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 start-0 grid w-10 place-content-center text-gray-500">
                        <Home className="size-4" />
                      </span>
                      <input
                        type="text"
                        className="size-full rounded-md border-none ps-10 shadow-sm focus:ring-0 sm:text-sm"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              Submit
            </Button>
          </form>
        </Form>
      </section>
    </main>
  )
}
