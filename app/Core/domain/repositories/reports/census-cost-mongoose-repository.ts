import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared'
import Transactions from 'App/Models/Transactions'
import { ICensusCost } from 'App/Types/ICensus'
import { CensusCostManagerInterface } from '../interface/census-cost.interface'
import generateMatch from './generate-match-census'

export class CensusCostMongooseRepository implements CensusCostManagerInterface {
	async findCost(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string | undefined,
	): PromiseEither<AbstractError, ICensusCost[]> {
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
					'procedures.0.payment_participation': { $exists: true },
					'procedures.0.stock': { $exists: true },
					type: 'income',
				},
			},
			{
				$unwind: '$procedures',
			},
			{
				$addFields: {
					cost: {
						$reduce: {
							input: '$procedures.stock',
							initialValue: 0,
							in: {
								$add: [
									'$$value',
									{
										$multiply: [
											'$$this.quantity',
											'$$this.price_cost',
										],
									},
								],
							},
						},
					},
				},
			},
			{
				$group: {
					_id: {
						procedure: '$procedures.value',
						health_insurance: '$procedures.health_insurance.value',
						prof: '$prof.value',
					},
					label: { $first: '$procedures.label' },
					health_insurance: { $first: '$procedures.health_insurance.label' },
					prof: { $first: '$prof.label' },
					cost: { $sum: '$cost' },
					participation: { $sum: '$calculatedPayment' },
				},
			},
			{
				$project: {
					_id: 0,
					value: '$_id.procedure',
					health_insurance: 1,
					prof: 1,
					procedure: '$label',
					total: {
						$round: [
							{
								$add: ['$cost', '$participation'],
							},
							2, // arredonda para duas casas decimais
						],
					},
				},
			},
		]

		const activities = await Transactions.aggregate(pipeline)

		return right(activities)
	}
}
