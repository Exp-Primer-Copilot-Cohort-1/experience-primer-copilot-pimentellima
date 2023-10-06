import { ObjectId } from '@ioc:Mongoose'

export type IForm = {
	version: number
	questions: {
		question: string
	}[]
}
export interface IBusinessFranchises {
	_id: ObjectId | string
	name: string
	unities: ObjectId[]
	superAdmins: ObjectId[]
	admins: ObjectId[]
	questions: IForm[]
	created_at: Date
	updated_at: Date
}
