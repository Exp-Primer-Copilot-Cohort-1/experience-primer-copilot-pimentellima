import { Document, ObjectId } from '@ioc:Mongoose'

export interface IDefaultConfig extends Document {
	_id: ObjectId
	bank: {
		value: string
		label: string
	}
	cost_center: {
		value: string
		label: string
	}
	payment_form: {
		label: string
		value: string
		key: string
	}
	active: boolean
	unity_id: ObjectId
	created_at: Date
	updated_at: Date
}
