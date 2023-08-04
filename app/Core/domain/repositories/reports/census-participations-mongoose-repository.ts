import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared'
import { ICensusParticipationPaymentByProf } from 'Types/ICensus'
import { CensusPaymentParticipationsManagerInterface } from '../interface/census-payment-participations.interface'
import generateMatch from './generate-match-census'

export class CensusPaymentParticipationsMongooseRepository
	implements CensusPaymentParticipationsManagerInterface {
	async findPaymentsParticipation(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string | undefined,
	): PromiseEither<AbstractError, ICensusParticipationPaymentByProf[]> {
		const match = generateMatch({
			date_start,
			date_end,
			unity_id: unity_id.toString(),
			prof_id,
		})

		return right([])
	}
}
