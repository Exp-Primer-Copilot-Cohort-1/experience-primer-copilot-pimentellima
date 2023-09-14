import { ObjectId } from '@ioc:Mongoose'

export type Generic = {
	label: string
	value: string | ObjectId
}

export type StockProcedure = {
	_id: string
	quantity: number
	price_cost: number
	price_final: number
}
export interface IProcedureTransaction {
	_id?: string | ObjectId
	price: number
	color: string
	minutes: number
	health_insurance: string | ObjectId | Generic
	payment_participation: {
		value: string
		price: number
		percent: number
	}
	stock?: StockProcedure[]
}

export interface ITransaction {
	_id?: string | ObjectId
	group_by?: string
	activity_id?: string
	prof?: string | ObjectId | Generic
	client?: Generic | string | ObjectId
	procedures?: IProcedureTransaction[]
	account: Generic | string | ObjectId
	cost_center: Generic | string | ObjectId
	financial_category: Generic | string | ObjectId
	paid?: boolean
	unity_id: string | ObjectId
	amount: number
	date: Date
	paymentForm: string
	description?: string
	type: 'income' | 'expense'
	occurrences?: 'once' | 'daily' | 'weekly' | 'biweekly' | 'monthly'
	installment: boolean
	installmentCurrent?: number
	installments?: number
	active?: boolean
}
