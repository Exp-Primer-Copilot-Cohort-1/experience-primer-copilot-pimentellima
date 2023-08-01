import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import {
	ICensusActivitiesByHealthInsurance,
	ICensusActivitiesByProf,
	ICensusCountHealthInsurances,
	ICensusCountPartners,
	ICensusCountProcedure,
	ICensusMediaTimeAttendance,
	ICensusParticipationPaymentByProf,
	ICensusPaymentByProf,
	ICensusPaymentForm,
	ICensusRevenuesOfYearByUnityByProf,
	ICensusScheduledEvent
} from 'Types/ICensus'

export interface CensusUnitiesManagerInterface {
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

	findActivitiesOfProfByProfByUnity: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id: string,
	) => PromiseEither<AbstractError, ICensusActivitiesByProf[]>
}

export interface CensusPaymentsManagerInterface {
	findPaymentsByHealthInsurance: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusActivitiesByHealthInsurance[]>

	findPaymentsByForm: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusPaymentForm[]>

	findPaymentsByPartners: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusCountPartners[]>

	findPaymentsByProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusPaymentByProf[]>

	findPaymentsParticipationByProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusParticipationPaymentByProf[]>

	findRevenuesActivitiesByUnityByProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusRevenuesOfYearByUnityByProf>
}
