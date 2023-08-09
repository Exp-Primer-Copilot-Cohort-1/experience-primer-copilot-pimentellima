import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import { CensusPaymentsManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ICensusPayments } from '../../helpers/census'

type FindPaymentsByHealthInsuranceProps = {
	unity_id: string
	date_start?: string
	date_end?: string
	prof_id?: string
}

export class FindPaymentsByHealthInsuranceUseCase
	implements UseCase<FindPaymentsByHealthInsuranceProps, ICensusPayments>
{
	constructor(private readonly manager: CensusPaymentsManagerInterface) { }

	public async execute({
		unity_id,
		date_start,
		date_end,
		prof_id,
	}: FindPaymentsByHealthInsuranceProps): PromiseEither<
		AbstractError,
		ICensusPayments
	> {
		if (!unity_id) {
			return left(new UnitNotFoundError())
		}

		if (!date_start) {
			const now = new Date()
			date_start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
		}

		if (!date_end) {
			const now = new Date()
			date_end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString()
		}

		const paymentsHealthInsuranceOrErr =
			await this.manager.findPaymentsByHealthInsurance(
				unity_id,
				date_start,
				date_end,
				prof_id,
			)

		if (paymentsHealthInsuranceOrErr.isLeft()) {
			return left(
				new AbstractError('Error on find payments by health insurance', 400),
			)
		}

		const payments_by_health_insurances = paymentsHealthInsuranceOrErr.extract()

		return right({ payments_by_health_insurances })
	}
}
