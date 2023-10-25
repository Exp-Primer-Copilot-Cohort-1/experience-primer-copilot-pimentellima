import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared'
import Transactions from 'App/Models/Transactions'
import { ICensusCost } from 'App/Types/ICensus'
import { CensusCostManagerContract } from '../interface/census-cost.interface'
import generateMatch from './generate-match-census'

export class CensusCostMongooseRepository implements CensusCostManagerContract {
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
						procedure: '$procedures._id',
						health_insurance: '$procedures.health_insurance',
						prof: '$prof',
					},
					health_insurance: { $first: '$procedures.health_insurance' },
					prof: { $first: '$prof' },
					cost: { $sum: '$cost' },
					participation: { $sum: '$calculatedPayment' },
				},
			},
			{
				$lookup: {
					from: 'health_insurances', // substitua com o nome da sua coleção de seguros de saúde
					localField: 'health_insurance',
					foreignField: '_id',
					as: 'health_insurance_info',
				},
			},
			{
				$lookup: {
					from: 'users', // substitua com o nome da sua coleção de profissionais
					localField: 'prof',
					foreignField: '_id',
					as: 'prof_info',
				},
			},
			{
				$lookup: {
					from: 'procedures', // substitua com o nome da sua coleção de procedimentos
					localField: '_id.procedure',
					foreignField: '_id',
					as: 'procedure_info',
				},
			},
			{
				$project: {
					value: '$_id.procedure',
					_id: 0,
					procedure: {
						$arrayElemAt: ['$procedure_info.name', 0],
					},
					health_insurance: {
						$arrayElemAt: ['$health_insurance_info.name', 0],
					},
					prof: {
						$arrayElemAt: ['$prof_info.name', 0],
					},
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
