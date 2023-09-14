import { ObjectId } from '@ioc:Mongoose'
import { IProf } from './IProf'

export interface IProcedure {
	_id: string
	active: boolean
	value: number
	color: string
	profs: IProf[]
	name: string
	avgPrice?: number
	minutes: number
	health_insurances: {
		value: string
		label: string
		price: string
	}[]
	products?: {
		value: string
		label: string
		quantity: number
		price_cost: number
		price_final: number
	}[]
	unity_id: string | ObjectId
	created_at: Date | string
	updated_at: Date | string
}
