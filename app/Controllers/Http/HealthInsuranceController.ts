import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeHealthInsuranceFindAllByUnityIdComposer,
	makeHealthInsuranceFindByIdComposer,
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

	async store({ request, auth }) {
		const userLogged = auth.user
		const data = request.only(['name', 'register_code', 'carence', 'profs'])
		const healthInsurances = await HealthInsurance.create({
			...data,
			active: true,
			unity_id: userLogged.unity_id,
		})
		return healthInsurances
	}

	async update({ params, request, auth }) {
		const userLogged = auth.user
		const healthInsurances = await HealthInsurance.where({
			_id: params.id,
		}).firstOrFail()
		const data = request.only(['name', 'register_code', 'carence', 'active', 'profs'])
		healthInsurances.merge({ ...data, unity_id: userLogged.unity_id })
		await healthInsurances.save()
		return healthInsurances
	}

	async destroy({ params }) {
		const healthInsurances = await HealthInsurance.where({
			_id: params.id,
		}).firstOrFail()
		await healthInsurances.delete()
	}
}

export default HealthInsuranceController
