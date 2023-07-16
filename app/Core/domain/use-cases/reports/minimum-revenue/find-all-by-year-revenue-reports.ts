import { ReportsUnitiesManagerInterface } from 'App/Core/domain/repositories/interface/reports-unities-manager.interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, right } from 'App/Core/shared'
import { IBilling } from 'Types/IBilling'

type RevenueReportsByYear = {
	unity_id: string
	year?: number
}

export class FindAllByYearRevenueReportsUseCase
	implements UseCase<RevenueReportsByYear, IBilling>
{
	constructor(private readonly manager: ReportsUnitiesManagerInterface) { }

	public async execute({
		unity_id,
		year = new Date().getFullYear(),
	}: RevenueReportsByYear): PromiseEither<AbstractError, IBilling> {
		const revenueReports = await this.manager.findAllBillingByYear(unity_id, year)

		if (revenueReports.isRight()) {
			return right(revenueReports.extract())
		}

		const defaultRevenue = await this.manager.addDefaultBilling(unity_id, year)

		if (defaultRevenue.isLeft()) {
			return defaultRevenue
		}

		return right(defaultRevenue.extract())
	}
}
