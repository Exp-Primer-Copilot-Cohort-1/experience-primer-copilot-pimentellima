import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared'
import Activity from 'App/Models/Activity'
import Transactions from 'App/Models/Transactions'
import {
	ICensusActivitiesByHealthInsurance,
	ICensusPaymentByProf,
	ICensusPaymentForm,
	ICensusRevenuesOfYearByUnityByProf
} from 'Types/ICensus'
import { CensusPaymentsManagerInterface } from '../interface/census-manager.interface'
import generateMatch from './generate-match-census'

export class CensusPaymentsMongooseRepository implements CensusPaymentsManagerInterface {
	async findPaymentsByHealthInsurance(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	): PromiseEither<AbstractError, ICensusActivitiesByHealthInsurance[]> {
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
					payment: { $exists: true, $ne: null },
				},
			},
			{
				$unwind: '$procedures',
			},
			{
				$addFields: {
					'procedures.valNumber': {
						$toDouble: {
							$replaceAll: {
								input: '$procedures.val',
								find: ',',
								replacement: '.',
							},
						},
					},
				},
			},
			{
				$group: {
					_id: '$procedures.health_insurance.value',
					total: { $sum: '$procedures.valNumber' },
					count: { $sum: 1 },
					label: { $first: '$procedures.health_insurance.label' },
				},
			},
			{
				$project: {
					_id: 0,
					label: 1,
					value: '$_id',
					total: 1,
					count: 1,
				},
			},
		]

		const activities: ICensusActivitiesByHealthInsurance[] = await Activity.aggregate(
			pipeline,
		)
		return right(activities)
	}

	async findPaymentsByForm(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string | undefined,
	): PromiseEither<AbstractError, ICensusPaymentForm[]> {
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
					payment: { $exists: true, $ne: null },
				},
			},
			{
				$addFields: {
					price: {
						$toDouble: {
							$replaceAll: {
								input: '$payment.value',
								find: ',',
								replacement: '.',
							},
						},
					},
				},
			},
			{
				$group: {
					_id: '$payment.paymentForm',
					count: { $sum: 1 },
					total: { $sum: '$price' },
				},
			},
			{
				$project: {
					_id: 0,
					value: '$_id',
					count: 1,
					total: 1,
				},
			},
		]

		const activities = await Activity.aggregate(pipeline)
		return right(activities)
	}

	async findPaymentsByPartners(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	): PromiseEither<AbstractError, ICensusPaymentByProf[]> {
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
					payment: { $exists: true, $ne: null },
				},
			},
			{
				$addFields: {
					client_id: { $toObjectId: '$client.value' },
					price: {
						$toDouble: {
							$replaceAll: {
								input: '$payment.value',
								find: ',',
								replacement: '.',
							},
						},
					},
				},
			},
			{
				$lookup: {
					from: 'clients', // substitua com o nome da sua coleção de clientes
					localField: 'client_id', // substitua com o nome do campo que referencia o cliente no seu modelo de Atividade
					foreignField: '_id',
					as: 'client',
				},
			},
			{
				$unwind: '$client',
			},
			{
				$group: {
					_id: {
						$cond: {
							if: { $eq: ['$client.partner.label', ''] }, // Condição
							then: 'SEM PARCEIROS', // Valor se a condição for verdadeira
							else: {
								$ifNull: [
									'$client.partner.label', // Expressão a ser avaliada
									'SEM PARCEIROS', // Valor a ser usado se a expressão for nula ou inexistente
								],
							}, // Valor se a condição for falsa
						},
					},
					count: { $sum: 1 }, // Contando o número de procedimentos por parceiro
					total: { $sum: '$price' }, // Somando o valor dos procedimentos por parceiro
				},
			},
			{
				$project: {
					_id: 0, // Não inclui o campo _id no resultado
					label: '$_id', // Renomeia _id para label
					count: 1, // Inclui o campo count no resultado
					total: 1, // Inclui o campo total no resultado
				},
			},
		]

		const activities = await Activity.aggregate(pipeline)

		return right(activities)
	}

	async findPaymentsByProf(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string | undefined,
	): PromiseEither<AbstractError, ICensusPaymentByProf[]> {
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
					payment: { $exists: true, $ne: null },
				},
			},
			{
				$unwind: '$procedures',
			},
			{
				$addFields: {
					price: {
						$toDouble: {
							$replaceAll: {
								input: '$procedures.val',
								find: ',',
								replacement: '.',
							},
						},
					},
				},
			},
			{
				$group: {
					_id: {
						prof: '$prof.value',
						procedure: '$procedures.value',
					},
					procedureLabel: { $first: '$procedures.label' },
					label: { $first: '$prof.label' },
					count: { $sum: 1 }, // Contando o número de procedimentos por parceiro
					total: { $sum: '$price' }, // Somando o valor dos procedimentos por parceiro
				},
			},
			{
				$project: {
					_id: 0, // Não inclui o campo _id no resultado
					value: '$_id.prof', // Renomeia _id para value
					name: '$label',
					procedure: '$procedureLabel',
					count: 1, // Inclui o campo count no resultado
					total: 1, // Inclui o campo total no resultado
				},
			},
		]

		const activities = await Activity.aggregate(pipeline)

		return right(activities)
	}

	async findRevenuesActivitiesByUnityByProf(
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
