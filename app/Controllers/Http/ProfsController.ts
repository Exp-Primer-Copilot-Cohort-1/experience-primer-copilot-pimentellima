import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeCountsProfsComposers, makeFindAllProfsComposers } from 'App/Core/composers'

class ProfsController {
	async index(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllProfsComposers(ctx), ctx)
	}


	async counts(ctx: HttpContextContract) {
		return adaptRoute(makeCountsProfsComposers(ctx), ctx)
	}

}
export default ProfsController
