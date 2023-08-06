import { ObjectId } from '@ioc:Mongoose'

export interface IProcedureTransaction {
	value: string
	label: string
	price: number
	color: string
	minutes: number
	health_insurance: {
		value: string
		label: string
	}
	payment_participation: {
		value: string
		price: number
		percent: number
	}
	stock?: {
		value: string
		label: string
		quantity: number
		price_cost: number
		price_final: number
	}[]
}

export interface ITransaction {
	_id?: string | ObjectId
	group_by?: string
	activity_id?: string
	prof?: {
		value: string
		label: string
	}
	client?: {
		value: string
		label: string
	}
	procedures?: IProcedureTransaction[]
	bank: {
		value: string | ObjectId
		label: string
	}
	cost_center: {
		value: string | ObjectId
		label: string
	}
	category: {
		value: string | ObjectId
		label: string
	}
	paid?: boolean
	unity_id: string | ObjectId
	value: number
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
