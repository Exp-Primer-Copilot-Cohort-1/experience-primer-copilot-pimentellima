import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeCensusByMonthByUnityIdComposer,
	makeCensusPaymentsByMonthByUnityIdComposer,
} from 'App/Core/composers'

class CensusController {
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeCensusByMonthByUnityIdComposer(), ctx, { unity_id })
	}

	async indexPayments(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeCensusPaymentsByMonthByUnityIdComposer(), ctx, { unity_id })
	}
}

export default CensusController
