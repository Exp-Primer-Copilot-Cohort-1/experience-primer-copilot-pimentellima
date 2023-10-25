import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IBilling } from 'App/Types/IBilling'

export interface ReportsUnitiesManagerContract {
	findAllBillingByYear: (
		unity_id: string,
		year?: number,
	) => PromiseEither<AbstractError, IBilling>

	updateAttrBilling: (
		unity_id: string,
		attr: 'desirable' | 'expected' | 'current',
		value: number,
		month?: number,
		year?: number,
	) => PromiseEither<AbstractError, IBilling>

	addDefaultBilling: (
		unity_id: string,
		year?: number,
	) => PromiseEither<AbstractError, IBilling>

	findRevenuesByMonth: (
		unity_id: string,
		month?: number,
		year?: number,
	) => PromiseEither<AbstractError, number>
}
