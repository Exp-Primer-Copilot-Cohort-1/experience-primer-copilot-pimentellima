import { ObjectId } from '@ioc:Mongoose'
import { PaymentStatus, PaymentType } from '../app/Helpers'

export interface IAccount {
	_id: string | ObjectId
	name: string
	value: number
	date: Date
	bank: string
	active: boolean
	unity_id: string | ObjectId
	description?: string
	status: PaymentStatus
	type: PaymentType
	user_id?: string | ObjectId
	transaction_id?: string | ObjectId
	created_at: Date
	updated_at: Date
}
