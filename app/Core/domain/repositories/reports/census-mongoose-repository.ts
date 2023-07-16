import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared'
import Activity from 'App/Models/Activity'
import {
	ICensusCountHealthInsurances,
	ICensusCountPartners,
	ICensusCountProcedure,
	ICensusGenrerClient,
	ICensusScheduledEvent,
} from 'Types/ICensus'
import { Types } from 'mongoose'
import { CensusUnitiesManagerInterface } from '../interface/census-manager.interface'

const ObjectId = Types.ObjectId

const generateMatch = ({ date_start, date_end, unity_id, prof_id }) => {
	const match = {
		date: {
			$gte: new Date(date_start),
			$lte: new Date(date_end),
		},
		unity_id: new ObjectId(unity_id),
	}

	if (prof_id) match['prof_id'] = new ObjectId(prof_id)

	return match
}

export class CensusMongooseRepository implements CensusUnitiesManagerInterface {
	async findCensusActivitiesByUnityOrProf(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	): PromiseEither<AbstractError, ICensusScheduledEvent[]> {
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
				$group: {
					_id: '$scheduled',
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

		return right(activities)
	}

	async findCesusGenrerClientByUnityOrProf(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	): PromiseEither<AbstractError, ICensusGenrerClient[]> {
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
		return right(activities)
	}

	async findCensusProcedureByUnityOrProf(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	): PromiseEither<AbstractError, ICensusCountProcedure[]> {
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
				$unwind: '$procedures', // Desempacotando o array de procedimentos
			},
			{
				$group: {
					_id: '$procedures.label',
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

		return right(activities)
	}

	async findCensusHealthInsurancesByUnityOrProf(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	): PromiseEither<AbstractError, ICensusCountHealthInsurances[]> {
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
				$unwind: '$procedures', // Desempacotando o array de procedimentos
			},
			{
				$group: {
					_id: '$procedures.health_insurance.label', // Agrupando por plano de saúde
					count: { $sum: 1 }, // Contando o número de procedimentos por plano de saúde
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
				$group: {
					_id: '$client.partner', // Agrupando por parceiro
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
}
