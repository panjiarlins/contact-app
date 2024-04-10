import mongoose from 'mongoose'

export interface Contact {
  name: string
  email: string
  phone: string
  imageURL: string
  relationship: string
  address: string
}

const contactShema = new mongoose.Schema<Contact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  imageURL: { type: String, required: true },
  relationship: { type: String, required: true },
  address: { type: String, required: true },
})

export default mongoose.models.Contact ??
  mongoose.model<Contact>('Contact', contactShema)
