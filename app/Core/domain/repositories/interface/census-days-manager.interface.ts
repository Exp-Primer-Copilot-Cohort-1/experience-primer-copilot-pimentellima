import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import {
	ICensusActivitiesByDays,
	ICensusActivitiesByDaysOfMonth,
	ICensusWorkedHoursByProf,
} from 'Types/ICensus'

export interface CensusDaysManagerInterface {
	findActivitiesByDaysOfWeek: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusActivitiesByDays[]>

	findActivitiesByDaysOfMonth: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusActivitiesByDaysOfMonth[]>

	findHoursWorked: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusWorkedHoursByProf[]>
}
