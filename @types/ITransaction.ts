import { ObjectId } from '@ioc:Mongoose'

export interface ITransaction {
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
		id: string | ObjectId
		name: string
	}
	cost_center: {
		id: string | ObjectId
		name: string
	}
	category: {
		id: string | ObjectId
		name: string
	}
	value: string
	date: string
	paymentForm: string
	description?: string
	type?: 'income' | 'expense'
	occurrences?: 'once' | 'daily' | 'weekly' | 'biweekly' | 'monthly'
	installment: boolean
	installmentCurrent?: number
	installments?: number
	active?: boolean
}
