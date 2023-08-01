import { UnitNotFoundError } from 'App/Core/domain/errors/unit-not-found'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'

import {
	CensusPaymentsManagerInterface,
	CensusUnitiesManagerInterface,
} from 'App/Core/domain/repositories/interface/census-manager.interface'
import { ICensusPayments } from '../../helpers/census'

type PaymentsCensusByDateProps = {
	unity_id: string
	date_start?: string
	date_end?: string
	prof_id?: string
}

export class PaymentsCensusByDateUseCase
	implements UseCase<PaymentsCensusByDateProps, ICensusPayments>
{
	constructor(
		private readonly manager: CensusPaymentsManagerInterface,
		private readonly count: CensusUnitiesManagerInterface,
	) { }

	public async execute({
		unity_id,
		date_start,
		date_end,
		prof_id,
	}: PaymentsCensusByDateProps): PromiseEither<AbstractError, ICensusPayments> {
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

		const [
			paymentsFormOrErr,
			paymentsHealthInsuranceOrErr,
			paymentsPartnersOrErr,
			paymentsProfOrErr,
			paymentsParticipationProfOrErr,
			count_by_daysOrErr,
			count_by_activity_by_profOrErr,
			revenues_activitiesOrErr,
		] = await Promise.all([
			this.manager.findPaymentsByForm(unity_id, date_start, date_end, prof_id),
			this.manager.findPaymentsByHealthInsurance(
				unity_id,
				date_start,
				date_end,
				prof_id,
			),
			this.manager.findPaymentsByPartners(unity_id, date_start, date_end, prof_id),
			this.manager.findPaymentsByProf(unity_id, date_start, date_end, prof_id),
			this.manager.findPaymentsParticipationByProf(
				unity_id,
				date_start,
				date_end,
				prof_id,
			),
			this.count.findActivitiesByDaysByUnityOrProf(
				unity_id,
				date_start,
				date_end,
				prof_id,
			),
			this.count.findActivitiesByProfByUnity(
				unity_id,
				date_start,
				date_end,
				prof_id,
			),
			this.manager.findRevenuesActivitiesByUnityByProf(
				unity_id,
				date_start,
				date_end,
				prof_id,
			),
		])

		if (
			paymentsFormOrErr.isLeft() ||
			paymentsHealthInsuranceOrErr.isLeft() ||
			paymentsPartnersOrErr.isLeft() ||
			paymentsProfOrErr.isLeft() ||
			paymentsParticipationProfOrErr.isLeft() ||
			count_by_daysOrErr.isLeft() ||
			count_by_activity_by_profOrErr.isLeft() ||
			revenues_activitiesOrErr.isLeft()
		) {
			return left(
				new AbstractError('Error on find census activities by unity', 400),
			)
		}

		const payment_form = paymentsFormOrErr.extract()
		const payments_by_health_insurances = paymentsHealthInsuranceOrErr.extract()
		const payment_by_partners = paymentsPartnersOrErr.extract()
		const payment_by_prof = paymentsProfOrErr.extract()
		const payment_participation_by_prof = paymentsParticipationProfOrErr.extract()
		const count_by_days = count_by_daysOrErr.extract()
		const count_by_activity_by_prof = count_by_activity_by_profOrErr.extract()
		const revenues_activities = revenues_activitiesOrErr.extract()

		return right({
			count_by_activity_by_prof,
			count_by_days,
			payments_by_health_insurances,
			payment_by_prof,
			payment_form,
			payment_participation_by_prof,
			payment_by_partners,
			revenues_activities,
		})
	}
}
