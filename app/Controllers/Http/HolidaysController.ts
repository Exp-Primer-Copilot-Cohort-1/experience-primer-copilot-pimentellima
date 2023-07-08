import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeHolidaysFindAllByUnityIdComposer } from 'App/Core/composers/holidays/make'

class HolidaysController {
	async index(ctx: HttpContextContract) {
		return adaptRoute(makeHolidaysFindAllByUnityIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}
}

export default HolidaysController
