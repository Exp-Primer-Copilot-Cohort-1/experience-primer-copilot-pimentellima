import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeProfileShowComposer, makeProfileUpdateComposer } from 'App/Core/composers'

class ProfileController {
	async show(ctx: HttpContextContract) {
		return adaptRoute(makeProfileShowComposer(), ctx, { _id: ctx.auth.user?._id, })
	}

	async update(ctx: HttpContextContract) {
		return adaptRoute(makeProfileUpdateComposer(), ctx, { _id: ctx.auth.user?._id, unity_id: ctx.auth.user?.unity_id, type: ctx.auth.user?.type })
	}
}
export default ProfileController
