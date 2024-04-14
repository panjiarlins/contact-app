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
  z.object({
    page: z.number(),
    perPage: z.number(),
    search: z.string().optional(),
  }),
  async ({ page, perPage, search }) => {
    const searchTrim = search?.trim()
    const searchQuery = !searchTrim
      ? {}
      : {
          $or: [
            { name: { $regex: '.*' + searchTrim + '.*', $options: 'i' } },
            { email: { $regex: '.*' + searchTrim + '.*', $options: 'i' } },
            { phone: { $regex: '.*' + searchTrim + '.*', $options: 'i' } },
            { imageURL: { $regex: '.*' + searchTrim + '.*', $options: 'i' } },
            {
              relationship: { $regex: '.*' + searchTrim + '.*', $options: 'i' },
            },
            { address: { $regex: '.*' + searchTrim + '.*', $options: 'i' } },
          ],
        }
    const skip = (page - 1) * perPage
    const limit = perPage

    const contacts = (await Contact.find(searchQuery)
      .limit(limit)
      .skip(skip)) as ContactType[]

    const totalContacts = await Contact.countDocuments(searchQuery)

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
