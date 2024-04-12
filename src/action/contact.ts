'use server'

import { action } from '@/lib/safe-action'
import Contact, { type ContactType } from '@/models/Contact'
import { z } from 'zod'

const createContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  imageURL: z.string().url(),
  relationship: z.string().min(3),
  address: z.string().min(5),
})

export const createContact = action(
  createContactSchema,
  async ({ name, email, phone, imageURL, relationship, address }) => {
    await Contact.create({
      name,
      email,
      phone,
      imageURL,
      relationship,
      address,
    })

    // revalidateTag()
  }
)

export const getContacts = action(
  z.object({ page: z.number(), perPage: z.number() }),
  async ({ page, perPage }) => {
    const skip = (page - 1) * perPage
    const limit = perPage

    const contacts = (await Contact.find()
      .limit(limit)
      .skip(skip)) as ContactType[]

    const totalContacts = await Contact.countDocuments()

    return {
      contacts,
      page,
      perPage,
      totalPages: Math.ceil(totalContacts / perPage),
      total: totalContacts,
      start: skip + 1,
      end: Math.min(skip + limit, totalContacts),
    }
  }
)
