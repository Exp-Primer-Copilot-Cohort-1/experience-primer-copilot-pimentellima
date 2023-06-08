import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makePartnerCreateComposer,
	makePartnerDeleteByIdComposer,
	makePartnerFindByNameComposer,
	makePartnerUpdateComposer,
} from 'App/Core/composers'

class PartnerController {
	async index(ctx: HttpContextContract) {
		return adaptRoute(makePartnerFindByNameComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async store(ctx: HttpContextContract) {
		return adaptRoute(makePartnerCreateComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async update(ctx: HttpContextContract) {
		return adaptRoute(makePartnerUpdateComposer(), ctx)
	}

	async destroy(ctx: HttpContextContract) {
		return adaptRoute(makePartnerDeleteByIdComposer(), ctx)
	}
}

export default PartnerController
