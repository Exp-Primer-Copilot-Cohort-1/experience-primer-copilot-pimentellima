import { ObjectId } from '@ioc:Mongoose'

export type IQuestion = {
	question: string
	answer: string
}

export interface IFormStandardBusinessFranchises {
	_id: ObjectId | string
	version: number
	client: ObjectId | string
	prof: ObjectId | string
	unity_id: ObjectId | string
	franchise: ObjectId | string
	activity: ObjectId | string
	questions: IQuestion[]
}
