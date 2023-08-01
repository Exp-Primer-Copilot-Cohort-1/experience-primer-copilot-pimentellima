import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import { ICensusActivitiesByDays, ICensusActivitiesByDaysOfMonth } from 'Types/ICensus'

export interface CensusDaysManagerInterface {
	findActivitiesByDaysOfWeekByUnityOrProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusActivitiesByDays[]>

	findActivitiesByDaysOfMonthByUnityOrProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusActivitiesByDaysOfMonth[]>
}
