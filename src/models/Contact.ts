import mongoose from 'mongoose'

export interface ContactType {
  _id: string
  name: string
  email: string
  phone: string
  imageURL: string
  relationship: string
  address: string
}

const contactShema = new mongoose.Schema<ContactType>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  imageURL: { type: String, required: true },
  relationship: { type: String, required: true },
  address: { type: String, required: true },
})

const Contact =
  mongoose.models.Contact ??
  mongoose.model<ContactType>('Contact', contactShema)

export default Contact
