import { Document, ObjectId } from 'mongoose'

export interface IStocksLog extends Document {
  _id: ObjectId
  title: string
  stocks_id: ObjectId
  admin: {
    _id: ObjectId
    name: string
    email: string
    password: string
    unity_id: ObjectId
    type: string
    active: boolean
    avatar: string
    due_date: Date | null
    created_at: Date
    updated_at: Date
    board: string | null
    celphone: string
    document: string
    exib_minutes: number
    gender: string
    hour_end: string | null
    hour_end_lunch: string | null
    hour_start: string | null
    hour_start_lunch: string | null
    is_friday: boolean
    is_monday: boolean
    is_saturday: boolean
    is_sunday: boolean
    is_thursday: boolean
    is_tuesday: boolean
    is_wednesday: boolean
    lunch_time_active: boolean
    occupation_code: string | null
    phone: string | null
    profession: string | null
    record: string | null
    schedule_obs: string | null
    show_lack: boolean
    specialty: string | null
  }
  created_at: Date
  updated_at: Date
}
