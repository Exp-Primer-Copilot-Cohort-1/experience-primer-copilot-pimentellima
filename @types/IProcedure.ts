import { ObjectId } from '@ioc:Mongoose'
import { IProf } from './IProf'

export interface IProcedure {
	_id: string
	active: boolean
	value: number
	color: string
	prof: IProf[]
	name: string
	avgPrice?: number
	minutes: number
	health_insurance: {
		value: string
		label: string
		price: string
	}[]
	unity_id: string | ObjectId
	created_at: Date | string
	updated_at: Date | string
}
