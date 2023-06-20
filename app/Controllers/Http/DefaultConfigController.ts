import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeDefaultConfigsCreateComposer,
	makeDefaultConfigsDeleteByIdComposer,
	makeDefaultConfigsFindByUnityComposer,
	makeDefaultConfigsShowByUnityComposer,
	makeDefaultConfigsUpdateByIdComposer,
} from 'App/Core/composers'

class DefaultConfigController {
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeDefaultConfigsFindByUnityComposer(), ctx, { unity_id })
	}

	async store(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeDefaultConfigsCreateComposer(), ctx, { unity_id })
	}

	async update(ctx: HttpContextContract) {
		return adaptRoute(makeDefaultConfigsUpdateByIdComposer(), ctx)
	}

	async show(ctx: HttpContextContract) {
		return adaptRoute(makeDefaultConfigsShowByUnityComposer(), ctx)
	}

	async destroy(ctx: HttpContextContract) {
		return adaptRoute(makeDefaultConfigsDeleteByIdComposer(), ctx)
	}
}

export default DefaultConfigController
