import { ObjectId } from 'mongoose'

export enum FinancialCategoryType {
	Revenue = 'revenue',
	Expense = 'expense',
}

export interface IFinancialCategory {
	_id?: string | ObjectId
	name: string
	type: FinancialCategoryType
	sub_categories?: Array<any>
	active: boolean
	unity_id: string | ObjectId
	created_at?: Date | string
	updated_at?: Date | string
}
