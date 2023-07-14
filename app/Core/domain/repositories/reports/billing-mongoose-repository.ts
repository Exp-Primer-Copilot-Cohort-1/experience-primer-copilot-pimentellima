import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import Unity from 'App/Models/Unity'
import { IBilling } from 'Types/IBilling'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { ReportsUnitiesManagerInterface } from '../interface/reports-unities-manager.interface'

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

	async updateCurrentBillingInMonth(
		unity_id: string,
		value: number,
		month: number,
		year = new Date().getFullYear(),
	): PromiseEither<AbstractError, IBilling> {
		return right()
	}
}
