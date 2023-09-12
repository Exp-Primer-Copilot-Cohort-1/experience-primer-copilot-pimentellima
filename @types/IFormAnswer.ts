import { ObjectId } from '@ioc:Mongoose'

export interface IFormAnswer {
	_id?: ObjectId
	form: { id: ObjectId | string; name: string }
	activity_id: ObjectId | string
	field_answers: {
		question: string
		answer: string
	}[]
}
