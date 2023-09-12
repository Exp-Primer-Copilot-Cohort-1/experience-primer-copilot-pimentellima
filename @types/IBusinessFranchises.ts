import { ObjectId } from '@ioc:Mongoose'

export interface IBusinessFranchises {
	_id: ObjectId | string
	name: string
	unities: ObjectId[]
	superAdmins: ObjectId[]
	admins: ObjectId[]
	created_at: Date
	updated_at: Date
}
