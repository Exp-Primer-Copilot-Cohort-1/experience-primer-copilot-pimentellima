import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import Activity from 'App/Models/Activity'
import Unity from 'App/Models/Unity'
import { IBilling } from 'Types/IBilling'
import { Types } from 'mongoose'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { ReportsUnitiesManagerInterface } from '../interface/reports-unities-manager.interface'

const ObjectId = Types.ObjectId

export class BillingMongooseRepository implements ReportsUnitiesManagerInterface {
	constructor() { }

	async findAllBillingByYear(
		unity_id: string,
		year: number,
	): PromiseEither<AbstractError, IBilling> {
		const unity = await Unity.findById(unity_id).select('revenue_reports')

		if (!unity) {
			return left(new UnitNotFoundError())
		}

		const revenueReports = unity.revenue_reports?.[year]

		if (!revenueReports) {
			return left(new AbstractError('Revenue report not found', 404))
		}

		return right(revenueReports)
	}

	async updateAttrBilling(
		unity_id: string,
		attr: 'desirable' | 'expected' | 'current',
		value: number,
		month: number,
		year = new Date().getFullYear(),
	): PromiseEither<AbstractError, IBilling> {
		const unity = await Unity.findByIdAndUpdate(
			unity_id,
			{
				[`revenue_reports.${year}.${attr}.${month}`]: value,
			},
			{ new: true, useFindAndModify: false },
		).select('revenue_reports')

		if (!unity) {
			return left(new UnitNotFoundError())
		}

		return right(unity.revenue_reports?.[year] as any)
	}

	async addDefaultBilling(
		unity_id: string,
		year: number,
	): PromiseEither<AbstractError, IBilling> {
		const unity = await Unity.findByIdAndUpdate(
			unity_id,
			{
				[`revenue_reports.${year}`]: {
					desirable: Array.from({ length: 12 }, () => 0),
					expected: Array.from({ length: 12 }, () => 0),
					current: Array.from({ length: 12 }, () => 0),
				},
			},
			{ new: true, useFindAndModify: false },
		).select('revenue_reports')

		if (!unity) {
			return left(new UnitNotFoundError())
		}

		return right(unity.revenue_reports?.[year] as any)
	}

	async findRevenuesByMonth(
		unity_id: string,
		month: number,
		year = new Date().getFullYear(),
	): PromiseEither<AbstractError, number> {
		const date_start = new Date(year, month, 1)
		const date_end = new Date(year, month + 1, 0)

		const pipeline = [
			{
				$match: {
					unity_id: new ObjectId(unity_id.toString()),
					scheduled: 'completed',
				},
			},
			{
				$addFields: {
					convertedDate: {
						$dateFromString: {
							dateString: '$payment.date',
						},
					},
					value: {
						$convert: {
							input: {
								$replaceOne: {
									input: '$payment.value',
									find: ',',
									replacement: '.',
								},
							},
							to: 'double',
						},
					},
				},
			},
			{
				$match: {
					convertedDate: {
						$gte: new Date(date_start),
						$lte: new Date(date_end),
					},
				},
			},
			{
				$group: {
					_id: null,
					total: {
						$sum: '$value',
					},
				},
			},
		]

		const [revenue] = await Activity.aggregate(pipeline)

		if (!revenue) return left(new AbstractError('Err to find revenue', 400))

		return right(revenue?.total)
	}
}
