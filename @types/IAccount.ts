import { Document, ObjectId } from '@ioc:Mongoose'
import { PaymentStatus, PaymentType } from './IHelpers'

export interface IAccount extends Document {
  _id: ObjectId
  name: string
  value: number
  date: Date
  bank: string
  active: boolean
  unity_id: ObjectId
  description?: string
  status: PaymentStatus
  type: PaymentType
  user_id?: ObjectId
  transaction_id?: string
  created_at: Date
  updated_at: Date
}
