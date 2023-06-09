import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeDirectmailsCreateComposer,
	makeDirectmailsDeleteByIdComposer,
	makeDirectmailsFindByNameComposer,
	makeDirectmailsShowByIdComposer,
	makeDirectmailsUpdateByIdComposer
} from 'App/Core/composers'

class DirectmailController {
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeDirectmailsFindByNameComposer(), ctx, { unity_id })
	}

	async store(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeDirectmailsCreateComposer(), ctx, { unity_id })
	}

	async update(ctx: HttpContextContract) {
		return adaptRoute(makeDirectmailsUpdateByIdComposer(), ctx)
	}

	async show(ctx: HttpContextContract) {
		return adaptRoute(makeDirectmailsShowByIdComposer(), ctx)
	}

	async destroy(ctx: HttpContextContract) {
		return adaptRoute(makeDirectmailsDeleteByIdComposer(), ctx)
	}
}

export default DirectmailController
