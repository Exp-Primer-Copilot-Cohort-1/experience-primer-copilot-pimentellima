import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
	makeCensusActivitiesProfByProfComposer,
	makeCensusByMonthByUnityIdComposer,
	makeCensusIdlenessByProfComposer,
	makeCensusPaymentsByFormComposer,
	makeCensusPaymentsByHealthInsuranceComposer,
	makeCensusPaymentsByMonthByUnityIdComposer,
	makeCensusPaymentsByPartnerComposer,
	makeCensusPaymentsByProfComposer,
	makeCensusRevenuesActivitiesComposer,
} from 'App/Core/composers'
import { makeCensusPaymentsParticipationByProfComposer } from 'App/Core/composers/census/make-census-payments-participation-by-prof-composer'
import withControlRoles from './helpers/with-control-roles'

class CensusController {
	async index(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusByMonthByUnityIdComposer)
	}

	async indexPayments(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusPaymentsByMonthByUnityIdComposer)
	}
	async indexActivitiesByDaysMonth(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusActivitiesProfByProfComposer)
	}

	async indexPaymentsByForm(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusPaymentsByFormComposer)
	}
	async indexActivitiesProfByProf(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusActivitiesProfByProfComposer)
	}
	async indexHealthInsurance(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusPaymentsByHealthInsuranceComposer)
	}
	async indexPaymentsByPartner(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusPaymentsByPartnerComposer)
	}
	async indexPaymentsByProf(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusPaymentsByProfComposer)
	}
	async indexPaymentsParticipation(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusPaymentsParticipationByProfComposer)
	}
	async indexRevenuesActivities(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusRevenuesActivitiesComposer)
	}
	async indexIdlenessByProf(ctx: HttpContextContract) {
		return withControlRoles(ctx, makeCensusIdlenessByProfComposer)
	}
}

export default CensusController
