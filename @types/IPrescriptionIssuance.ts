import { ObjectId } from '@ioc:Mongoose'

export interface IPrescriptionIssuance {
	client: {
		label: string
		value: string
	}
	prescription: {
		name: string
		text: string
	}
	date: Date
	unity_id: string | ObjectId
}
