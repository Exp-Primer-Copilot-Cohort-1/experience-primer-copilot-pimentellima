import { ObjectId } from "@ioc:Mongoose"

export interface IForm {
    _id: ObjectId | string
	prof: {
		label: string
		value: string
	}[]
    unity_id: ObjectId | string
	name: string
	fields: any[]
	active: boolean
}