import { adaptRoute } from 'App/Core/adapters'
import { makeCreateAdminComposer, makeCreateUserComposer, makeUpdateUserComposer } from 'App/Core/composers'
import User, { COLLECTION_NAME } from 'App/Models/User'
// const Mail = use('Mail');
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LogDecorator, { ACTION } from 'App/Decorators/Log'

class UserController {
	public async index({ auth }: HttpContextContract) {
		const userLogged = auth.user
		try {
			const users = await User.where({
				unity_id: userLogged?.unity_id,
			})
				.select('-password')
				.exec()

			return users
		} catch (err) {
			console.log(err)
			return false
		}
	}

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	public async store(ctx: HttpContextContract) {
		return adaptRoute(makeCreateUserComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id.toString(),
		})
	}

	public async storeAdmin(ctx: HttpContextContract) {
		return adaptRoute(makeCreateAdminComposer(), ctx)
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	public async update(ctx: HttpContextContract) {
		const userLogged = ctx.auth.user

		return adaptRoute(makeUpdateUserComposer(), ctx, {
			id: ctx.params.id,
			userLogged,
		})
	}

	public async show({ params }: HttpContextContract) {
		const user = await User.findById(params.id).select('-password').orFail()

		return user
	}
}

export default UserController
