import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared'
import Transactions from 'App/Models/Transactions'
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
		const pipeline = [
			{
				$match: {
					...match,
					'procedures.0': { $exists: true },
					type: 'income',
					paid: true,
				},
			},
			{
				$group: {
					_id: { $month: '$date' },
					price: { $sum: '$value' },
				},
			},
			{
				$project: {
					_id: 0,
					month: '$_id',
					price: {
						$round: [
							'$price',
							2, // arredonda para duas casas decimais
						],
					},
				},
			},
		]

		const activities = await Transactions.aggregate(pipeline)

		return right([])
	}
}
