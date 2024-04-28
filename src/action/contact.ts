'use server'

import { action } from '@/lib/safe-action'
import Contact, { type ContactType } from '@/models/Contact'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const createContact = action(
  z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(5),
    imageURL: z.string().url(),
    relationship: z.string().min(3),
    address: z.string().min(5),
  }),
  async ({ name, email, phone, imageURL, relationship, address }) => {
    await Contact.create({
      name,
      email,
      phone,
      imageURL,
      relationship,
      address,
    })

    revalidatePath('/', 'page')
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

    const contacts = await Contact.find<ContactType>(searchQuery)
      .limit(limit)
      .skip(skip)

    const totalContacts = await Contact.countDocuments(searchQuery)

    return {
      contacts: JSON.parse(JSON.stringify(contacts)) as typeof contacts,
      page,
      perPage,
      totalPages: Math.ceil(totalContacts / perPage),
      total: totalContacts,
      start: skip + 1,
      end: Math.min(skip + limit, totalContacts),
    }
  }
)

export const getContactById = action(
  z.object({ id: z.string() }),
  async ({ id }) => {
    const contact = await Contact.findById<ContactType>(id)

    return JSON.parse(JSON.stringify(contact)) as typeof contact
  }
)

export const editContact = action(
  z.object({
    id: z.string(),
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(5).optional(),
    imageURL: z.string().url().optional(),
    relationship: z.string().min(3).optional(),
    address: z.string().min(5).optional(),
  }),
  async ({ id, name, email, phone, imageURL, relationship, address }) => {
    await Contact.findByIdAndUpdate(id, {
      name,
      email,
      phone,
      imageURL,
      relationship,
      address,
    })

    revalidatePath('/', 'page')
  }
)
