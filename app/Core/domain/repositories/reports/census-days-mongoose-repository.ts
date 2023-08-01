import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared'
import Activity from 'App/Models/Activity'
import { ICensusActivitiesByDays, ICensusActivitiesByDaysOfMonth } from 'Types/ICensus'
import { CensusDaysManagerInterface } from '../interface/census-days-manager.interface'

import generateMatch from './generate-match-census'

export class CensusDaysMongooseRepository implements CensusDaysManagerInterface {
	async findActivitiesByDaysOfWeekByUnityOrProf(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string | undefined,
	): PromiseEither<AbstractError, ICensusActivitiesByDays[]> {
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
					_id: {
						dayOfWeek: { $dayOfWeek: '$date' },
						scheduled: '$scheduled',
					},
					count: { $sum: 1 },
				},
			},
			{
				$group: {
					_id: '$_id.dayOfWeek',
					scheduledCounts: {
						$push: {
							scheduled: '$_id.scheduled',
							count: '$count',
						},
					},
				},
			},
			{
				$project: {
					_id: 0,
					dayOfWeek: '$_id',
					scheduledCounts: 1,
				},
			},
		]

		const activities = await Activity.aggregate(pipeline)

		return right(activities)
	}

	async findActivitiesByDaysOfMonthByUnityOrProf(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string | undefined,
	): PromiseEither<AbstractError, ICensusActivitiesByDaysOfMonth[]> {
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
					_id: {
						date: {
							$dateToString: {
								format: '%Y-%m-%d',
								date: '$date',
							},
						},
						scheduled: '$scheduled',
					},
					count: { $sum: 1 },
				},
			},
			{
				$project: {
					_id: 0,
					date: '$_id.date',
					scheduled: '$_id.scheduled',
					count: 1,
				},
			},
			{
				$sort: { date: 1 },
			},
		]

		const activities = await Activity.aggregate(pipeline)

		return right(activities)
	}
}
