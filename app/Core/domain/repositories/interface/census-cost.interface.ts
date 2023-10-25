import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import { ICensusCost } from 'App/Types/ICensus'

export interface CensusCostManagerContract {
	findCost: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusCost[]>
}
