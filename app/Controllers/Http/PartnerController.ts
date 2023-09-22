import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makePartnerCreateComposer,
	makePartnerDeleteByIdComposer,
	makePartnerFindByUnityComposer,
	makePartnerUpdateComposer,
} from 'App/Core/composers'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { COLLECTION_NAME } from 'App/Models/Partner'
import LogDecorator, { ACTION } from '../Decorators/Log'

class PartnerController {
	async index(ctx: HttpContextContract) {
		const opts = OptsQuery.build(ctx.request.qs())

		return adaptRoute(makePartnerFindByUnityComposer(opts), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async store(ctx: HttpContextContract) {
		return adaptRoute(makePartnerCreateComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update(ctx: HttpContextContract) {
		return adaptRoute(makePartnerUpdateComposer(), ctx)
	}

	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async destroy(ctx: HttpContextContract) {
		return adaptRoute(makePartnerDeleteByIdComposer(), ctx)
	}
}

export default PartnerController
