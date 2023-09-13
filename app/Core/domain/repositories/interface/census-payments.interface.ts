import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import {
	ICensusActivitiesByHealthInsurance,
	ICensusPaymentByProf,
	ICensusPaymentForm,
} from 'App/Types/ICensus'

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
	) => PromiseEither<AbstractError, ICensusPaymentByProf[]>

	findPaymentsByProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusPaymentByProf[]>
}
