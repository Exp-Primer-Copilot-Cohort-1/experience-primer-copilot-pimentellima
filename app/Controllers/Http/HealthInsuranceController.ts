import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeHealthInsuranceCreateComposer,
	makeHealthInsuranceFindAllByUnityIdComposer,
	makeHealthInsuranceFindByIdComposer,
	makeHealthInsuranceUpdateComposer,
} from 'App/Core/composers'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import HealthInsurance from 'App/Models/HealthInsurance'

class HealthInsuranceController {
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		const opts = OptsQuery.build(ctx.request.qs())

		return adaptRoute(makeHealthInsuranceFindAllByUnityIdComposer(opts), ctx, {
			unity_id,
		})
	}

	async show(ctx: HttpContextContract) {
		return adaptRoute(makeHealthInsuranceFindByIdComposer(), ctx)
	}

	async store(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id?.toString()
		return adaptRoute(makeHealthInsuranceCreateComposer(), ctx, {
			unity_id,
		})
	}

	async update(ctx: HttpContextContract) {
		return adaptRoute(makeHealthInsuranceUpdateComposer(), ctx)
	}

	async destroy({ params }: HttpContextContract) {
		const healthInsurances = await HealthInsurance.findByIdAndDelete(params.id)

		return healthInsurances
	}
}

export default HealthInsuranceController
