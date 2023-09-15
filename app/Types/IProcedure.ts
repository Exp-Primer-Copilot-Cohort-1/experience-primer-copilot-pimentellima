import { ObjectId } from '@ioc:Mongoose'
import { IProf } from './IProf'
import { StockProcedure } from './ITransaction'

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
		_id: string | ObjectId
		price: string
	}[]
	products?: StockProcedure[]
	unity_id: string | ObjectId
	created_at: Date | string
	updated_at: Date | string
}
