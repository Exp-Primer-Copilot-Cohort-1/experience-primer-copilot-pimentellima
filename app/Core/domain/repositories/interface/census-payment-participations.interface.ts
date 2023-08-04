import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import { ICensusParticipationPaymentByProf } from 'Types/ICensus'

export interface CensusPaymentParticipationsManagerInterface {
	findPaymentsParticipationByProf: (
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	) => PromiseEither<AbstractError, ICensusParticipationPaymentByProf[]>
}
