import { ObjectId } from '@ioc:Mongoose'

export interface IHealthInsurance {
	_id: string
	name: string
	register_code: string
	carence: number
	profs: string[] | ObjectId[]
	active: boolean
	unity_id: ObjectId | string
	created_at: Date | string
	updated_at: Date | string
}

export type Prof = {
	value: string
	label: string
}

export type HealthInsuranceParams = {
	_id?: string
	name: string
	profs: Prof[] | string[]
	register_code: string
	carence: number
}
