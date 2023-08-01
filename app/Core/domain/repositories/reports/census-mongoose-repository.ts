import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared'
import Activity from 'App/Models/Activity'
import {
	ICensusActivitiesByProf,
	ICensusCountHealthInsurances,
	ICensusCountProcedure,
	ICensusMediaTimeAttendance,
	ICensusScheduledEvent
} from 'Types/ICensus'
import { CensusUnitiesManagerInterface } from '../interface/census-manager.interface'

import generateMatch from './generate-match-census'

export class CensusMongooseRepository implements CensusUnitiesManagerInterface {
	async findCensusActivitiesOfScheduledByUnityOrProf(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	): PromiseEither<AbstractError, ICensusScheduledEvent> {
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

		return right(
			activities?.reduce((acc, curr) => ({ ...acc, [curr.label]: curr.count }), {
				rescheduled: 0,
				canceled: 0,
				awaiting: 0,
				completed: 0,
				confirmed: 0,
				scheduled: 0,
				in_progress: 0,
				canceled_client: 0,
			}) as ICensusScheduledEvent,
		)
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

	async findMediaTimeAttendanceByUnityOrProf(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	): PromiseEither<AbstractError, ICensusMediaTimeAttendance> {
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
					scheduled: 'completed',
					finished_at: { $exists: true },
					started_at: { $exists: true },
				},
			},
			{
				$addFields: {
					time_diff: {
						$subtract: [
							{ $toLong: '$finished_at' },
							{ $toLong: '$started_at' },
						],
					},
				},
			},
			{
				$group: {
					_id: null,
					average_activity_duration: {
						$avg: '$time_diff',
					},
				},
			},
		]

		const [avg] = await Activity.aggregate(pipeline)

		return right(avg?.average_activity_duration || 0)
	}

	async findActivitiesOfProfByProfByUnity(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id: string | undefined,
	): PromiseEither<AbstractError, ICensusActivitiesByProf[]> {
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
					_id: '$prof.value',
					label: { $first: '$prof.label' },
					count: { $sum: 1 },
				},
			},
			{
				$project: {
					_id: 0,
					label: 1,
					value: '$_id',
					count: 1,
				},
			},
		]

		const activities = await Activity.aggregate(pipeline)

		return right(activities)
	}
}
