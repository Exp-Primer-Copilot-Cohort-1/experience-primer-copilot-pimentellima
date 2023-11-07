import { ObjectId } from '@ioc:Mongoose'

export type ProfWithAccess = {
	id: string
	name: string
}

export interface IFormAnswer {
	_id?: ObjectId
	form: { id: ObjectId | string; name: string }
	activity_id: ObjectId | string
	prof: { value: string | ObjectId; label: string }
	profs_with_access?: ProfWithAccess[]
	field_answers: {
		question: string
		answer: string
	}[]
}
