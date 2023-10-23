import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import {
	ICensusActivitiesByProf,
	ICensusCountHealthInsurances,
	ICensusCountProcedure,
	ICensusMediaTimeAttendance,
	ICensusScheduledEvent,
} from 'App/Types/ICensus'

export interface CensusUnitiesManagerContract {
	findCensusActivitiesOfScheduledByUnityOrProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusScheduledEvent>

	findCensusProcedureByUnityOrProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusCountProcedure[]>
	findCensusHealthInsurancesByUnityOrProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusCountHealthInsurances[]>

	findMediaTimeAttendanceByUnityOrProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusMediaTimeAttendance>

	findActivitiesOfProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id: string,
	) => PromiseEither<AbstractError, ICensusActivitiesByProf[]>
}
