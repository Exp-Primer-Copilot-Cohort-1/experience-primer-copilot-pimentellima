import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared'
import Activity from 'App/Models/Activity'
import {
	ICensusCountPartners,
	ICensusGenrerClient,
	ICensusNewAndOldClients
} from 'Types/ICensus'
import { CensusClientsManagerInterface } from '../interface/census-clients-manager.interface'

import generateMatch from './generate-match-census'

export class CensusClientsMongooseRepository implements CensusClientsManagerInterface {
	async findCesusGenrerClientByUnityOrProf(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	): PromiseEither<AbstractError, ICensusGenrerClient> {
		const match = generateMatch({
			date_start,
			date_end,
			unity_id: unity_id.toString(),
			prof_id,
		})

		const pipeline = [
			{
				$addFields: {
					client_id: { $toObjectId: '$client.value' },
				},
			},
			{
				$match: match,
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
					_id: '$client.genrer',
					count: { $sum: 1 },
				},
			},
			{
				$project: {
					_id: 0, // Não inclui o campo _id no resultado
					label: '$_id', // Renomeia _id para label
					count: 1, // Inclui o campo count no resultado
				},
			},
		]

		const activities = await Activity.aggregate(pipeline)
		return right(
			activities?.reduce((acc, curr) => ({ ...acc, [curr.label]: curr.count }), {
				not_informed: 0,
				male: 0,
				female: 0,
			}) as ICensusGenrerClient,
		)
	}

	async findCensusPartnersByUnityOrProf(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	): PromiseEither<AbstractError, ICensusCountPartners[]> {
		const match = generateMatch({
			date_start,
			date_end,
			unity_id: unity_id.toString(),
			prof_id,
		})

		const pipeline = [
			{
				$match: match,
			},
			{
				$addFields: {
					client_id: { $toObjectId: '$client.value' },
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
				},
			},
			{
				$project: {
					_id: 0, // Não inclui o campo _id no resultado
					label: '$_id', // Renomeia _id para label
					count: 1, // Inclui o campo count no resultado
				},
			},
		]

		const activities = await Activity.aggregate(pipeline)

		return right(activities)
	}

	async findNewAndOldClientsByUnityOrProf(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	): PromiseEither<AbstractError, ICensusNewAndOldClients> {
		const match = generateMatch({
			date_start,
			date_end,
			unity_id: unity_id.toString(),
			prof_id,
		})

		const pipeline = [
			{
				$match: match,
			},
			{
				$addFields: {
					client_id: { $toObjectId: '$client.value' },
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
				$addFields: {
					client_status: {
						$cond: [
							{
								$lt: ['$client.created_at', new Date(date_start)],
							},
							'old',
							'new',
						],
					},
				},
			},
			{
				$group: {
					_id: '$client_status',
					count: { $sum: 1 },
				},
			},
		]

		const activities = await Activity.aggregate(pipeline)

		return right(
			activities?.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.count }), {
				new: 0,
				old: 0,
			}) as ICensusNewAndOldClients,
		)
	}
}
