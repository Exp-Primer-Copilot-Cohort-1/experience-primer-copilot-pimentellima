import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { IBilling } from 'Types/IBilling'

export interface ReportsUnitiesManagerInterface {
	findByDesirableBillingByMonth: (
		unity_id: string,
		month: string,
		year?: number,
	) => PromiseEither<AbstractError, IBilling>

	findAllBillingByYear: (
		unity_id: string,
		year: number,
	) => PromiseEither<AbstractError, IBilling[]>

	updateAttrBilling: (
		unity_id: string,
		attr: 'desirable' | 'expected' | 'current',
		value: number,
		month: number,
	) => PromiseEither<AbstractError, IBilling>

	updateBillingByMonth: (
		unity_id: string,
		billing: IBilling,
		month: number,
	) => PromiseEither<AbstractError, IBilling>
}
