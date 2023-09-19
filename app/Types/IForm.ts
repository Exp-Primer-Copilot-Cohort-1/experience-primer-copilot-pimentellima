import { ObjectId } from '@ioc:Mongoose'

export type Prof = {
	label: string
	value: string
}

export interface IForm {
	_id: ObjectId | string
	prof: Prof
	profs_with_access: Prof[]
	unity_id: ObjectId | string
	name: string
	fields: any[]
	active: boolean
}
