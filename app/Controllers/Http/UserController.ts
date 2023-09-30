import { adaptRoute } from 'App/Core/adapters'
import { makeCreateAdminComposer, makeCreateUserComposer } from 'App/Core/composers'
import User, { COLLECTION_NAME } from 'App/Models/User'
// const Mail = use('Mail');
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import { ROLES } from 'App/Roles/types'

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
		return adaptRoute(makeCreateUserComposer(), ctx)
	}

	public async storeAdmin(ctx: HttpContextContract) {
		return adaptRoute(makeCreateAdminComposer(), ctx)
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	public async update({ params, request, auth }: HttpContextContract) {
		const userLogged = auth.user
		const data = request.all()
		const user = await User.findById(params.id).orFail()
		const isEquals = params.id === userLogged?._id.toString()

		switch (userLogged?.type) {
			case ROLES.PROF:
				if (isEquals) {
					await user.updateOne(data)
					await user.save()
				}
				break
			case ROLES.SEC:
				if (isEquals) {
					await user.updateOne(data)
					await user.save()
				}
				break
			default:
				await user.updateOne(data)
				await user.save()
				break
		}

		return user
	}

	public async show({ params }: HttpContextContract) {
		const user = await User.findById(params.id).select('-password').orFail()

		return user
	}
}

export default UserController
