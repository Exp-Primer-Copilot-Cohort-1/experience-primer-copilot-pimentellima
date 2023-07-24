import { ObjectId } from '@ioc:Mongoose'

export interface ITransaction {
	group_by?: string
	activity_id?: string
	prof: {
		value: string
		label: string
	}
	client: {
		value: string
		label: string
	}
	procedures: {
		value: string
		label: string
	}[]
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
	value: number | string
	date: string | Date
	paymentForm: string
	description?: string
	type?: 'income' | 'expense'
	occurrences?: 'once' | 'daily' | 'weekly' | 'biweekly' | 'monthly'
	installment: boolean
	installmentCurrent?: number
	installments?: number
	active?: boolean
	unity_id: string | ObjectId
}
