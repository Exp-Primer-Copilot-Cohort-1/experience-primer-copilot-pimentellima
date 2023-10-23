import { ReportsUnitiesManagerContract } from 'App/Core/domain/repositories/interface/reports-unities-manager.interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IBilling } from 'App/Types/IBilling'
import { UnityReportsRevenues } from '../../helpers/reports'

export class UpdateCurrentBillingInMonthUseCase
	implements UseCase<UnityReportsRevenues, IBilling>
{
	constructor(private readonly manager: ReportsUnitiesManagerContract) { }

	public async execute({
		unity_id,
		month = new Date().getMonth(),
		year = new Date().getFullYear(),
	}: UnityReportsRevenues): PromiseEither<AbstractError, IBilling> {
		const sumOrErr = await this.manager.findRevenuesByMonth(unity_id, month, year)

		if (sumOrErr.isLeft()) {
			return left(sumOrErr.extract())
		}

		const sum = sumOrErr.extract()

		const updateOrErr = await this.manager.updateAttrBilling(
			unity_id,
			'current',
			sum,
			month,
			year,
		)

		if (updateOrErr.isLeft()) {
			return left(updateOrErr.extract())
		}

		return right(updateOrErr.extract())
	}
}
