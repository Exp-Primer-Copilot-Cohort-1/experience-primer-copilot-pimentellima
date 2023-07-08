import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import Unity from 'App/Models/Unity'
import { IBilling } from 'Types/IBilling'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { ReportsUnitiesManagerInterface } from '../interface/reports-unities-manager.interface'

export class BillingMongooseRepository implements ReportsUnitiesManagerInterface {
	constructor() { }
	async findByDesirableBillingByMonth(
		unity_id: string,
		month: string,
		year: number = new Date().getFullYear(),
	): PromiseEither<AbstractError, IBilling> {
		const unity = await Unity.findById(unity_id)

		if (!unity) {
			return left(new UnitNotFoundError())
		}

		return right({} as IBilling)
	}
	async findAllBillingByYear(
		unity_id: string,
		year: number,
	): PromiseEither<AbstractError, IBilling[]> {
		const unity = await Unity.findById(unity_id)

		if (!unity) {
			return left(new UnitNotFoundError())
		}

		const revenueReports = unity.findRevenueReportByYear?.(year) || []

		return right(revenueReports)
	}

	async updateAttrBilling(
		unity_id: string,
		attr: 'desirable' | 'expected' | 'current',
		value: number,
		month: number,
	): PromiseEither<AbstractError, IBilling> {
		const year = new Date().getFullYear()
		const unity = await Unity.findById(unity_id)

		if (!unity) {
			return left(new UnitNotFoundError())
		}

		const revenueReports = unity.findRevenueReportByYear?.(year) ?? []

		const revenueMonthIndex = revenueReports.findIndex(
			(revenueReport) => revenueReport.month === month,
		)

		if (!revenueMonthIndex) {
			return left(new AbstractError('Revenue report not found', 404))
		}

		const newRevenueReport = { ...revenueReports[revenueMonthIndex], [attr]: value }

		await unity.update({
			[`revenue_report.${year}.${revenueMonthIndex}`]: newRevenueReport,
		})

		await unity.save()

		return right(newRevenueReport)
	}

	async updateBillingByMonth(
		unity_id: string,
		billing: IBilling,
		month: number,
	): PromiseEither<AbstractError, IBilling> {
		const year = new Date().getFullYear()
		const unity = await Unity.findById(unity_id)

		if (!unity) {
			return left(new UnitNotFoundError())
		}

		const revenueReports = unity.findRevenueReportByYear?.(year) ?? []

		const revenueMonthIndex = revenueReports.findIndex(
			(revenueReport) => revenueReport.month === month,
		)

		if (!revenueMonthIndex) {
			return left(new AbstractError('Revenue report not found', 404))
		}

		const newRevenueReport = { ...revenueReports[revenueMonthIndex], ...billing }

		await unity.update({
			[`revenue_report.${year}.${revenueMonthIndex}`]: newRevenueReport,
		})

		await unity.save()

		return right(newRevenueReport)
	}
}
