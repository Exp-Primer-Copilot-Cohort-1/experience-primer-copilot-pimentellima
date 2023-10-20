import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IFinancialCategory } from 'App/Types/IFinancialCategory'

export interface FinancialCategoryManagerInterface {
	findAllByUnityId: (
		unity_id: string,
	) => PromiseEither<AbstractError, IFinancialCategory[]>
}
