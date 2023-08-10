import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeDirectmailsCreateComposer,
	makeDirectmailsDeleteByIdComposer,
	makeDirectmailsFindByNameComposer,
	makeDirectmailsShowByIdComposer,
	makeDirectmailsUpdateByIdComposer,
} from 'App/Core/composers'
import Directmail from 'App/Models/Directmail'

class DirectmailController {
	async index(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeDirectmailsFindByNameComposer(), ctx, { unity_id })
	}

	async findAllInatives(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		const directmails = await Directmail.find({
			active: false,
			unity_id,
		})

		return directmails
	}

	async store(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeDirectmailsCreateComposer(), ctx, { unity_id })
	}

	async update(ctx: HttpContextContract) {
		return adaptRoute(makeDirectmailsUpdateByIdComposer(), ctx)
	}

	async updateStatus({ params, request }) {
		const data = request.only(['status'])

		const prescription = await Directmail.findByIdAndUpdate(
			params.id,
			{
				$set: { active: data.status },
			},
			{ new: true },
		)

		return prescription
	}

	async show(ctx: HttpContextContract) {
		return adaptRoute(makeDirectmailsShowByIdComposer(), ctx)
	}

	async destroy(ctx: HttpContextContract) {
		return adaptRoute(makeDirectmailsDeleteByIdComposer(), ctx)
	}
}

export default DirectmailController
