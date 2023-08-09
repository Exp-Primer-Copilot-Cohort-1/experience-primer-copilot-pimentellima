import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import { CensusPaymentsManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ICensusPayments } from '../../helpers/census'

type FindPaymentsByFormProps = {
	unity_id: string
	date_start?: string
	date_end?: string
	prof_id?: string
}

export class FindPaymentsByFormUseCase
	implements UseCase<FindPaymentsByFormProps, ICensusPayments>
{
	constructor(private readonly manager: CensusPaymentsManagerInterface) { }

	public async execute({
		unity_id,
		date_start,
		date_end,
		prof_id,
	}: FindPaymentsByFormProps): PromiseEither<AbstractError, ICensusPayments> {
		if (!unity_id) {
			return left(new UnitNotFoundError())
		}

		if (!date_start) {
			// Set date_start as the first day of the current month
			const now = new Date()
			date_start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
		}

		if (!date_end) {
			// Set date_end as the last day of the current month
			const now = new Date()
			date_end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString()
		}

		const paymentsFormOrErr = await this.manager.findPaymentsByForm(
			unity_id,
			date_start,
			date_end,
			prof_id,
		)

		if (paymentsFormOrErr.isLeft()) {
			return left(new AbstractError('Error on find payments by form', 400))
		}

		const payment_form = paymentsFormOrErr.extract()

		return right({ payment_form })
	}
}
