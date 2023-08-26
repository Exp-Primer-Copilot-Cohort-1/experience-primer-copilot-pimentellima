import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeFindBillingYearByUnityIdComposer,
	makeMinimumBillingByUnityComposer,
	makeUpdateBillingDesirableByUnityComposer,
} from 'App/Core/composers/billing/make'

class RevenuesController {
	async index(ctx: HttpContextContract) {
		return adaptRoute(makeFindBillingYearByUnityIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async updateDesirable(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateBillingDesirableByUnityComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async updateMinimum(ctx: HttpContextContract) {
		return adaptRoute(makeMinimumBillingByUnityComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}
}

export default RevenuesController
