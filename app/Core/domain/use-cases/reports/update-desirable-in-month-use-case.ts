import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, right } from 'App/Core/shared'
import { ReportsUnitiesManagerInterface } from '../../repositories/interface/reports-unities-manager.interface'

type workedDays = number

type UnityBillingDesirable = {
	unity_id: string
	desirable: number
	month: number
}

export class UpdateDesirableInMonthUseCase
	implements UseCase<UnityBillingDesirable, workedDays>
{
	constructor(private readonly reportsUnitiesManager: ReportsUnitiesManagerInterface) { }

	public async execute(
		props: UnityBillingDesirable,
	): PromiseEither<AbstractError, number> {
		const billingOrErr = await this.reportsUnitiesManager.updateAttrBilling(
			props.unity_id,
			'desirable',
			props.desirable,
			props.month,
		)

		console.log(billingOrErr)

		return right(0)
	}
}
