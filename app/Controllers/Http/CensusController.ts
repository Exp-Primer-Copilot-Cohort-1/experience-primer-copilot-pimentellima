import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeCensusActivitiesByDaysMonthByUnityOrProfComposer,
	makeCensusActivitiesProfByProfComposer,
	makeCensusByMonthByUnityIdComposer,
	makeCensusPaymentsByFormComposer,
	makeCensusPaymentsByHealthInsuranceComposer,
	makeCensusPaymentsByMonthByUnityIdComposer,
	makeCensusPaymentsByPartnerComposer,
	makeCensusPaymentsByProfComposer,
	makeCensusRevenuesActivitiesComposer
} from 'App/Core/composers'
import { makeCensusPaymentsParticipationByProfComposer } from 'App/Core/composers/census/make-census-payments-participation-by-prof-composer'

class CensusController {
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeCensusByMonthByUnityIdComposer(), ctx, {
			unity_id
		})
	}

	async indexPayments(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeCensusPaymentsByMonthByUnityIdComposer(), ctx, {
			unity_id
		})
	}
	async indexActivitiesByDaysMonth(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(
			makeCensusActivitiesByDaysMonthByUnityOrProfComposer(),
			ctx,
			{
				unity_id
			}
		)
	}
	async indexPaymentsByForm(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeCensusPaymentsByFormComposer(), ctx, {
			unity_id
		})
	}
	async indexActivitiesProfByProf(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeCensusActivitiesProfByProfComposer(), ctx, {
			unity_id
		})
	}
	async indexHealthInsurance(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeCensusPaymentsByHealthInsuranceComposer(), ctx, {
			unity_id
		})
	}
	async indexPaymentsByPartner(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeCensusPaymentsByPartnerComposer(), ctx, {
			unity_id
		})
	}
	async indexPaymentsByProf(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeCensusPaymentsByProfComposer(), ctx, { unity_id })
	}
	async indexPaymentsParticipation(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(
			makeCensusPaymentsParticipationByProfComposer(),
			ctx,
			{
				unity_id
			}
		)
	}
	async indexRevenuesActivities(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeCensusRevenuesActivitiesComposer(), ctx, {
			unity_id
		})
	}
}

export default CensusController
