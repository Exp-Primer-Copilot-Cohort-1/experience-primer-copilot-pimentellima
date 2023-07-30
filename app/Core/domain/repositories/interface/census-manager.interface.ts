import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import {
	ICensusActivitiesByDays,
	ICensusActivitiesByHealthInsurance,
	ICensusActivitiesByProf,
	ICensusCountHealthInsurances,
	ICensusCountPartners,
	ICensusCountProcedure,
	ICensusGenrerClient,
	ICensusMediaTimeAttendance,
	ICensusNewAndOldClients,
	ICensusParticipationPaymentByProf,
	ICensusPaymentByProf,
	ICensusPaymentForm,
	ICensusScheduledEvent,
} from 'Types/ICensus'

export interface CensusUnitiesManagerInterface {
	findCensusActivitiesByUnityOrProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusScheduledEvent>
	findCesusGenrerClientByUnityOrProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusGenrerClient>
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

	findCensusPartnersByUnityOrProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusCountPartners[]>

	findMediaTimeAttendanceByUnityOrProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusMediaTimeAttendance>

	findNewAndOldClientsByUnityOrProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusNewAndOldClients>

	findActivitiesByDaysByUnityOrProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusActivitiesByDays>

	findActivitiesByProfByUnity: (
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
}
