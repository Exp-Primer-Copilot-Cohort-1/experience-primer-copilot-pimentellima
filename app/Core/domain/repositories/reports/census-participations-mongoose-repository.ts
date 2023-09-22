import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared'
import Transactions from 'App/Models/Transactions'
import { ICensusParticipationPaymentByProf } from 'App/Types/ICensus'
import { CensusPaymentParticipationsManagerInterface } from '../interface/census-payment-participations.interface'
import generateMatch from './generate-match-census'

export class CensusPaymentParticipationsMongooseRepository
	implements CensusPaymentParticipationsManagerInterface { // eslint-disable-line
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
					'procedures.0.payment_participation': { $exists: true },
					type: 'income',
					paid: true,
				},
			},
			{
				$unwind: '$procedures',
			},
			{
				$lookup: {
					from: 'procedures',
					localField: 'procedures._id',
					foreignField: '_id',
					as: 'procedures._id',
					pipeline: [
						{
							$project: {
								_id: 0,
								value: '$_id',
								label: '$name',
							},
						},
					],
				},
			},
			{
				$unwind: '$procedures._id',
			},
			{
				$lookup: {
					from: 'health_insurances',
					localField: 'procedures.health_insurance',
					foreignField: '_id',
					as: 'procedures.health_insurance',
					pipeline: [
						{
							$project: {
								_id: 0,
								value: '$_id',
								label: '$name',
							},
						},
					],
				},
			},
			{
				$unwind: '$procedures.health_insurance',
			},
			{
				$lookup: {
					from: 'users',
					localField: 'prof',
					foreignField: '_id',
					as: 'prof',
					pipeline: [
						{
							$project: {
								_id: 0,
								value: '$_id',
								label: '$name',
							},
						},
					],
				},
			},
			{
				$unwind: '$prof',
			},
			{
				$addFields: {
					calculatedPayment: {
						$cond: [
							{ $gt: ['$procedures.payment_participation.percent', 0] },
							{
								$multiply: [
									'$procedures.payment_participation.percent',
									{
										$divide: ['$procedures.price', 100],
									},
								],
							},
							'$procedures.payment_participation.price',
						],
					},
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
						procedure: '$procedures._id.value',
						health_insurance: '$procedures.health_insurance.value',
						prof: '$prof.value',
					},
					label: { $first: '$procedures._id.label' },
					prof: { $first: '$prof.label' },
					health_insurance: { $first: '$procedures.health_insurance.label' },
					cost: { $sum: '$cost' },
					total: { $sum: '$procedures.price' },
					calculatedPayment: { $sum: '$calculatedPayment' },
				},
			},
			{
				$project: {
					_id: 1,
					procedure: {
						value: '$_id.procedure',
						label: '$label',
					},
					health_insurance: {
						value: '$_id.health_insurance',
						label: '$health_insurance',
					},
					prof: {
						value: '$_id.prof',
						label: '$prof',
					},
					cost: {
						$round: [
							'$cost',
							2, // arredonda para duas casas decimais
						],
					},
					label: 1,
					total: {
						$round: [
							'$total',
							2, // arredonda para duas casas decimais
						],
					},
					participation: {
						$round: [
							'$calculatedPayment',
							2, // arredonda para duas casas decimais
						],
					},
				},
			},
		]

		const items = await Transactions.aggregate(pipeline)

		return right(items)
	}
}
