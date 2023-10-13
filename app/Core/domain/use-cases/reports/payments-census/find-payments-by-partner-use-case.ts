import { UnityNotFoundError } from 'App/Core/domain/errors/unity-not-found'
import { CensusPaymentsManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ICensusPaymentByProf } from 'App/Types/ICensus'

type FindPaymentsByPartnersProps = {
	unity_id: string
	date_start?: string
	date_end?: string
	prof_id?: string
}

export class FindPaymentsByPartnersUseCase
	implements UseCase<FindPaymentsByPartnersProps, ICensusPaymentByProf[]>
{
	constructor(private readonly manager: CensusPaymentsManagerInterface) { }

	public async execute({
		unity_id,
		date_start,
		date_end,
		prof_id,
	}: FindPaymentsByPartnersProps): PromiseEither<
		AbstractError,
		ICensusPaymentByProf[]
	> {
		if (!unity_id) {
			return left(new UnityNotFoundError())
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

		const paymentsPartnersOrErr = await this.manager.findPaymentsByPartners(
			unity_id,
			date_start,
			date_end,
			prof_id,
		)

		if (paymentsPartnersOrErr.isLeft()) {
			return left(new AbstractError('Error on find payments by partners', 400))
		}

		const payment_by_partners = paymentsPartnersOrErr.extract()

		return right(payment_by_partners)
	}
}
