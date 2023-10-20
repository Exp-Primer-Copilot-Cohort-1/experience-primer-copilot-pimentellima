import { ObjectId } from '@ioc:Mongoose'
import { TypeForms } from './IBusinessFranchises'

export type IQuestion = {
	value?: ObjectId | string
	question: string
	answer: number
}

export interface IReplyFormStandardFranchises {
	_id?: ObjectId | string
	version: number
	type: TypeForms
	client: ObjectId | string
	group_id: string
	prof: ObjectId | string
	unity_id: ObjectId | string
	franchise: ObjectId | string
	activity: ObjectId | string
	questions: IQuestion[]
	created_at?: Date | string
	updated_at?: Date | string
}

export interface IInfoReplyFormStandardFranchises {
	client: {
		name: string
		email: string
	}
	coordinator: {
		name: string
		email: string
	}
	unity: {
		name: string
		email: string
	}
	prof: {
		name: string
		email: string
	}
	procedures: {
		color: string,
		name: string,
		minutes: number,
	}[]
	date: string
}