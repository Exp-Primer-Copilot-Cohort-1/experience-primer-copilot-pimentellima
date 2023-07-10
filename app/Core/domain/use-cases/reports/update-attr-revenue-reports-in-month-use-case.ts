import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IBilling } from 'Types/IBilling'
import { ReportsUnitiesManagerInterface } from '../../repositories/interface/reports-unities-manager.interface'

type UnityReportsRevenues = {
	unity_id: string
	value: number
	month?: number
}

export class UpdateAttrBillingInMonthUseCase
	implements UseCase<UnityReportsRevenues, IBilling>
{
	constructor(
		private readonly manager: ReportsUnitiesManagerInterface,
		private readonly attr: 'desirable' | 'expected' | 'current',
	) { }

	public async execute({
		value,
		unity_id,
		month = new Date().getMonth(),
	}: UnityReportsRevenues): PromiseEither<AbstractError, IBilling> {
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
