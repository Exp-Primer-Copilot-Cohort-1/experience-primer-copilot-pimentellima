import { ObjectId } from '@ioc:Mongoose'
import { Generic } from './ITransaction'

export interface ICategory {
	_id?: ObjectId | string
	name: string
	prof: Generic
	active?: boolean
	unity_id?: ObjectId | string
	created_at?: Date
	updated_at?: Date
}
