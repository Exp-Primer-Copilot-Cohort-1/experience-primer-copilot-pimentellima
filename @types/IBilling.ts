import { ObjectId } from '@ioc:Mongoose'

export interface IBilling {
	_id: ObjectId | string
	month: number
	current: number
	desirable: number
	expected: number
}
