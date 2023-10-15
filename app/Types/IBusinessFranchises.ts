import { ObjectId } from '@ioc:Mongoose'

export enum TypeForms {
	START = 'start',
	END = 'end',
}

export type IForm = {
	version: number
	type: TypeForms
	min: number
	max: number
	questions: {
		_id?: ObjectId | string
		question: string
		description?: string
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
