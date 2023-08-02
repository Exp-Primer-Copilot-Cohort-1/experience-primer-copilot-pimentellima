import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared'
import Activity from 'App/Models/Activity'
import Transactions from 'App/Models/Transactions'
import { ICensusRevenuesOfYearByUnityByProf } from 'Types/ICensus'
import { CensusRevenuesManagerInterface } from '../interface/census-revenues-manager.interface'
import generateMatch from './generate-match-census'

export class CensusRevenuesMongooseRepository implements CensusRevenuesManagerInterface {
	async findRevenuesAccrualRegimeActivities(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	): PromiseEither<AbstractError, ICensusRevenuesOfYearByUnityByProf> {
		const match = generateMatch({
			unity_id: unity_id.toString(),
			date_start,
			date_end,
			prof_id,
		})

		const pipeline = [
			{
				$match: {
					...match,
					payment: { $exists: true, $ne: null },
				},
			},
			{
				$addFields: {
					price: {
						$toDouble: {
							$replaceAll: {
								input: {
									$replaceAll: {
										input: '$payment.value',
										find: '.',
										replacement: '',
									},
								},
								find: ',',
								replacement: '.',
							},
						},
					},
				},
			},
			{
				$group: {
					_id: { $month: '$date' },
					price: { $sum: '$price' },
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

		const activities = await Activity.aggregate(pipeline)

		return right(
			activities.reduce((acc, activity) => {
				// O mês retornado pela pipeline é base 1 (Janeiro é 1, Dezembro é 12),
				// mas precisamos de base 0 para o array, então subtraímos 1.
				const monthIndex = activity.month - 1
				acc[monthIndex] = activity.price
				return acc
			}, Array(12).fill(0)),
		)
	}

	async findRevenuesCashRegimeActivities(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	): PromiseEither<AbstractError, ICensusRevenuesOfYearByUnityByProf> {
		const match = generateMatch({
			unity_id: unity_id.toString(),
			date_start,
			date_end,
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

		return right(
			activities.reduce((acc, activity) => {
				// O mês retornado pela pipeline é base 1 (Janeiro é 1, Dezembro é 12),
				// mas precisamos de base 0 para o array, então subtraímos 1.
				const monthIndex = activity.month - 1
				acc[monthIndex] = activity.price
				return acc
			}, Array(12).fill(0)),
		)
	}
}
