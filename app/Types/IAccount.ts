import { ObjectId } from '@ioc:Mongoose'

export interface IAccount {
	_id?: string | ObjectId
	name: string
	cash: number
	date: Date
	bank: string
	active: boolean
	unity_id: string | ObjectId
	description?: string
	user_id?: string | ObjectId
	created_at: Date
	updated_at: Date
}
