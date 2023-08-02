import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import { ICensusRevenuesOfYearByUnityByProf } from 'Types/ICensus'

export interface CensusRevenuesManagerInterface {
	findRevenuesAccrualRegimeActivities: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusRevenuesOfYearByUnityByProf>

	findRevenuesCashRegimeActivities: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusRevenuesOfYearByUnityByProf>
}
