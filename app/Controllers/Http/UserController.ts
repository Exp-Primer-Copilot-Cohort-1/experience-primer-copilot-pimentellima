import { adaptRoute } from 'App/Core/adapters'
import { makeCreateAdminUserComposer } from 'App/Core/composers'
import User from 'App/Models/User'
// const Mail = use('Mail');
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ROLES } from 'App/Roles/types'

class UserController {
	public async index({ auth }) {
		const userLogged = auth.user
		try {
			const users = await User.where({
				unity_id: userLogged.unity_id,
			})
				.select('-password')
				.exec()

			return users
		} catch (err) {
			console.log(err)
			return false
		}
	}

	public async store(ctx) {
		return adaptRoute(makeCreateAdminUserComposer(), ctx)
	}

	public async update({ params, request, auth }: HttpContextContract) {
		const userLogged = auth.user
		const data = request.all()
		const user = await User.findById(params.id).orFail()
		const isEquals = params.id === userLogged?._id.toString()

		switch (userLogged?.type) {
			case ROLES.PROF:
				if (isEquals) {
					await user.update(data)
					await user.save()
				}
				break
			case ROLES.SEC:
				if (isEquals) {
					await user.update(data)
					await user.save()
				}
				break
			default:
				await user.update(data)
				await user.save()
				break
		}

		return user
	}

	public async show({ params }) {
		const user = await User.findById(params.id).select('-password').orFail()

		return user
	}

	// public async destroy({ params }) {
	// 	const user = await User.where({ _id: params.id }).orFail()
	// 	await user.delete()
	// }
}

export default UserController
