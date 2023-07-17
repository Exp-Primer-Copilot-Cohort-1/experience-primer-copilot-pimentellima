import { ObjectId } from '@ioc:Mongoose'

export interface IPaymentActivity {
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
	installment: boolean
	installmentCurrent?: number
	installments?: number
	active?: boolean
}
