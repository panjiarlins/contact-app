'use client'

import { editContact, getContactById } from '@/action/contact'
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
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  imageURL: z.string().url(),
  relationship: z.string().min(3),
  address: z.string().min(5),
})

export default function EditContact({
  params: { id },
}: {
  params: { id: string }
}) {
  const router = useRouter()

  const {
    execute: runGetContact,
    result: { data },
    status: statusGetContact,
  } = useAction(getContactById, {
    onError: (error) => {
      toast.error(
        error.fetchError ?? error.serverError ?? 'Failed to load contact'
      )
    },
  })

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

  const { execute: runEditContact } = useAction(editContact, {
    onExecute: () => {
      toast.loading('Updating contact...', {
        duration: Infinity,
        dismissible: true,
        id,
      })
    },
    onError: (error) => {
      toast.error(
        error.fetchError ?? error.serverError ?? 'Failed to update contact',
        { duration: 4000, id }
      )
    },
    onSuccess: () => {
      toast.success('Contact is updated', { duration: 4000, id })
      form.reset()
      router.push('/')
    },
  })

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      if (data) {
        const newData = Object.fromEntries(
          Object.entries(values).filter(
            ([key]) =>
              values[key as keyof typeof values] !==
              data[key as keyof typeof values]
          )
        )

        if (Object.entries(newData).length > 0)
          runEditContact({ id, ...newData })
      }
    },
    [runEditContact, data, id]
  )

  useEffect(() => {
    runGetContact({ id })
  }, [runGetContact, id])

  useEffect(() => {
    form.resetField('name', { defaultValue: data?.name ?? '' })
    form.resetField('email', { defaultValue: data?.email ?? '' })
    form.resetField('phone', { defaultValue: data?.phone ?? '' })
    form.resetField('imageURL', { defaultValue: data?.imageURL ?? '' })
    form.resetField('relationship', { defaultValue: data?.relationship ?? '' })
    form.resetField('address', { defaultValue: data?.address ?? '' })
  }, [data, form])

  return (
    <section className="mx-auto p-8 sm:px-12 lg:px-16 lg:py-12">
      <Link className="text-primary" href="/">
        <span className="sr-only">Home</span>
        <BookUser className="size-8 sm:size-10" />
      </Link>

      <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
        Edit contact
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-3">
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
            disabled={
              statusGetContact !== 'hasSucceeded' ||
              form.formState.isSubmitting ||
              !form.formState.isValid ||
              !form.formState.isDirty
            }
          >
            Submit
          </Button>
        </form>
      </Form>
    </section>
  )
}
