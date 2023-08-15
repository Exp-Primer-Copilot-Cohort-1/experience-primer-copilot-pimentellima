import { Document, ObjectId } from '@ioc:Mongoose'

export interface IPartner extends Document {
	_id: ObjectId | string
	name: string
	active: boolean
	unity_id: ObjectId | string
	created_at: Date
	updated_at: Date
}
