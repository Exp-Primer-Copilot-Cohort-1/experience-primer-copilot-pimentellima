import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, right } from 'App/Core/shared'
import { IBilling } from 'Types/IBilling'
import { ReportsUnitiesManagerInterface } from '../../repositories/interface/reports-unities-manager.interface'
import { UpdateAttrReportsRevenues } from '../helpers/reports'

type UnityReportsRevenues = {
	unity_id: string
	value: number
	month?: number
}

export class UpdateCurrentBillingInMonthUseCase
	implements UseCase<UnityReportsRevenues, IBilling>
{
	constructor(
		private readonly manager: ReportsUnitiesManagerInterface,
		private readonly updateCurrentBilling: UseCase<
			UpdateAttrReportsRevenues,
			IBilling
		>,
	) { }

	public async execute({
		unity_id,
		month = new Date().getMonth(),
	}: UnityReportsRevenues): PromiseEither<AbstractError, IBilling> {
		const billingOrErr = await this.manager.findBillingByUnityId(unity_id, month)
		return right()
	}
}
