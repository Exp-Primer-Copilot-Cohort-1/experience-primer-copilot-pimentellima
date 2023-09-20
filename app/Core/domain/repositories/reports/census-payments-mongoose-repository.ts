import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared'
import Activity from 'App/Models/Activity'
import {
	ICensusActivitiesByHealthInsurance,
	ICensusPaymentByProf,
	ICensusPaymentForm,
} from 'App/Types/ICensus'
import { CensusPaymentsManagerInterface } from '../interface/census-payments.interface'
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
				$lookup: {
					from: 'health_insurances',
					localField: 'procedures.health_insurance',
					foreignField: '_id',
					as: 'procedures.health_insurance',
				},
			},
			{
				$unwind: '$procedures.health_insurance',
			},
			{
				$group: {
					_id: '$procedures.health_insurance._id',
					total: { $sum: '$procedures.price' },
					count: { $sum: 1 },
					label: { $first: '$procedures.health_insurance.name' },
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
				$lookup: {
					from: 'procedures',
					localField: 'procedures._id',
					foreignField: '_id',
					as: 'procedures._id',
					pipeline: [
						{
							$project: {
								_id: 1,
								name: 1,
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
					from: 'users',
					localField: 'prof',
					foreignField: '_id',
					as: 'prof',
				},
			},
			{
				$unwind: '$prof',
			},
			{
				$group: {
					_id: {
						prof: '$prof._id',
						procedure: '$procedures._id._id',
					},
					procedureLabel: { $first: '$procedures._id.name' },
					label: { $first: '$prof.name' },
					count: { $sum: 1 }, // Contando o número de procedimentos por parceiro
					total: { $sum: '$procedures.price' }, // Somando o valor dos procedimentos por parceiro
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
}
