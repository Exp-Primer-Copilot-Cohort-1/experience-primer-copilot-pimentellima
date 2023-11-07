import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IFinancialCategory } from 'App/Types/IFinancialCategory'

export interface FinancialCategoryManagerContract {
	findAll: (
		unity_id: string,
	) => PromiseEither<AbstractError, IFinancialCategory[]>
	findById: (id: string) => PromiseEither<AbstractError, IFinancialCategory>
	update: (id: string, data: IFinancialCategory) => PromiseEither<AbstractError, IFinancialCategory>
	create: (data: IFinancialCategory) => PromiseEither<AbstractError, IFinancialCategory>
}
