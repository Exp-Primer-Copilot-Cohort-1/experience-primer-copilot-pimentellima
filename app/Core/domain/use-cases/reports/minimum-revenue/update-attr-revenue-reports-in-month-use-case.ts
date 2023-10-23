import { ReportsUnitiesManagerContract } from 'App/Core/domain/repositories/interface/reports-unities-manager.interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IBilling } from 'App/Types/IBilling'
import { UpdateAttrReportsRevenues } from '../../helpers/reports'

export class UpdateAttrBillingInMonthUseCase
	implements UseCase<UpdateAttrReportsRevenues, IBilling>
{
	constructor(
		private readonly manager: ReportsUnitiesManagerContract,
		private readonly attr: 'desirable' | 'expected' | 'current',
	) { }

	public async execute({
		value,
		unity_id,
		month = new Date().getMonth(),
	}: UpdateAttrReportsRevenues): PromiseEither<AbstractError, IBilling> {
		const billingOrErr = await this.manager.updateAttrBilling(
			unity_id,
			this.attr,
			parseFloat(value.toString()),
			month,
		)

		if (billingOrErr.isLeft()) {
			return left(billingOrErr.extract())
		}

		return right(billingOrErr.extract())
	}
}
