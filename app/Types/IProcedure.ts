import { ObjectId } from '@ioc:Mongoose'
import { Generic, StockProcedure } from './ITransaction'

export interface IHealthInsuranceInProcedure {
	_id: string | ObjectId
	price: number
}

export interface IProcedure {
	_id?: string
	active: boolean
	color: string
	profs: Generic[] | string[] | ObjectId[]
	name: string
	avgPrice?: number
	minutes: number
	health_insurances: IHealthInsuranceInProcedure[]
	products?: StockProcedure[]
	unity_id: string | ObjectId
	created_at: Date | string
	updated_at: Date | string
}

export interface BasicProcedure {
	price: number
	name: string
	health_insurance: string
	color: string
	minutes: number
}