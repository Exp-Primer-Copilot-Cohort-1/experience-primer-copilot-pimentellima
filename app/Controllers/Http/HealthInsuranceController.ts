import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeHealthInsuranceCreateComposer,
	makeHealthInsuranceFindAllByUnityIdComposer,
	makeHealthInsuranceFindByIdComposer,
	makeHealthInsuranceUpdateComposer,
} from 'App/Core/composers'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import HealthInsurance, { COLLECTION_NAME } from 'App/Models/HealthInsurance'
import LogDecorator, { ACTION } from '../Decorators/Log'

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

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async store(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id?.toString()
		return adaptRoute(makeHealthInsuranceCreateComposer(), ctx, {
			unity_id,
		})
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update(ctx: HttpContextContract) {
		return adaptRoute(makeHealthInsuranceUpdateComposer(), ctx)
	}

	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async destroy({ params }: HttpContextContract) {
		const healthInsurances = await HealthInsurance.findByIdAndDelete(params.id)
		return healthInsurances
	}
}

export default HealthInsuranceController
