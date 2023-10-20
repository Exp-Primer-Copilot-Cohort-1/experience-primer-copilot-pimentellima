import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeCountsSecsComposers, makeFindAllSecsComposers } from 'App/Core/composers'

class SecsController {
	async index(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllSecsComposers(ctx), ctx)
	}


	async counts(ctx: HttpContextContract) {
		return adaptRoute(makeCountsSecsComposers(ctx), ctx)
	}

}
export default SecsController
