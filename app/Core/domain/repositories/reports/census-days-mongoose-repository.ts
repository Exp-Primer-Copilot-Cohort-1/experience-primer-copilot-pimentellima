import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, right } from 'App/Core/shared'
import Activity from 'App/Models/Activity'
import {
	ICensusActivitiesByDays,
	ICensusActivitiesByDaysOfMonth,
	ICensusWorkedHoursByProf,
} from 'App/Types/ICensus'
import { CensusDaysManagerContract } from '../interface/census-days-manager.interface'

import Prof from 'App/Models/Prof'
import { ROLES } from 'App/Roles/types'
import { inject, injectable, registry } from 'tsyringe'
import { OptsQuery } from '../../entities/helpers/opts-query'
import generateMatch from './generate-match-census'

@injectable()
@registry([{ token: CensusDaysMongooseRepository, useClass: CensusDaysMongooseRepository }])
export class CensusDaysMongooseRepository implements CensusDaysManagerContract {

	constructor(
		@inject(OptsQuery) private readonly opts: OptsQuery,
	) { }

	async findActivitiesByDaysOfWeek(
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

	async findActivitiesByDaysOfMonth(
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

	async findHoursWorked(
		unity_id: string,
		date_start: string,
		date_end: string,
		prof_id?: string,
	): PromiseEither<AbstractError, ICensusWorkedHoursByProf[]> {
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
				$unwind: '$procedures',
			},
			{
				$group: {
					_id: '$prof',
					count: { $sum: '$procedures.minutes' },
				},
			},
			{
				$lookup: {
					from: 'users',
					localField: '_id',
					foreignField: '_id',
					as: 'prof',
				},
			},
			{
				$unwind: '$prof',
			},
			{
				$project: {
					_id: 0,
					value: '$_id',
					count: 1,
					label: '$prof.name',
				},
			},
		]

		const activities: ICensusWorkedHoursByProf[] = await Activity.aggregate(pipeline)

		const profs = await Prof.find({
			unity_id,
			$or: [
				{ type: ROLES.ADMIN_PROF },
				{ type: ROLES.PROF },
				{
					performs_medical_appointments: true,
				},
			],
		})
			.where(this.opts.only_prof)
			.select('_id name')

		const workedHours: ICensusWorkedHoursByProf[] = []

		for (const prof of profs) {
			const found = activities.find((item) => item.value === prof._id.toString())

			if (!found) {
				workedHours.push({
					value: prof._id.toString(),
					label: prof.name,
					count: 0,
				})
			} else {
				workedHours.push(found)
			}
		}

		return right(workedHours)
	}
}
