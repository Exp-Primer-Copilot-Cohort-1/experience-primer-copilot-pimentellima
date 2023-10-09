import { ObjectId } from '@ioc:Mongoose'
import { TypeForms } from './IBusinessFranchises'

export type IQuestion = {
	question: string
	answer: string
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
}
