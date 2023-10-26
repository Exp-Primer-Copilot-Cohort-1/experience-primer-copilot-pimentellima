import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeFindAllProfsComposers } from 'App/Core/composers'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { UserNotFoundError } from 'App/Core/domain/errors'
import { AbstractError } from 'App/Core/errors/error.interface'
import { Cache } from 'App/Core/infra/cache'
import { left, right } from 'App/Core/shared'
import User from 'App/Models/User'
import { ROLES } from 'App/Roles/types'

const fetchUserByType = async (type, unityId, active = true) =>
	await User.where({
		unity_id: unityId,
		active,
		type: {
			$in: type,
		},
	}).select('-payment_participations -password')

class UserControllerV2 {
	async findAllUsersProfs(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllProfsComposers(ctx), ctx)
	}

	async redefinePassword(ctx: HttpContextContract) {
		const params = ctx.request.only(['user_id', 'password'])
		const user_id = params.user_id
		const password = params.password
		console.log(params)
		try {
			if (!user_id) return new UserNotFoundError()
			const cache = new Cache()
			const passwordUrlCache = await cache.get(`${user_id}-redefine-password-url`)
			if (!passwordUrlCache) return new AbstractError('Link expirado', 400)

			const user = await User.findById(user_id).orFail()
			user.password = password
			await user.save()

			return right(user)
		} catch (err) {
			console.log(err)
			return left(new AbstractError('Erro interno', 500))
		}
	}

	async findAllUsersPerformsMedicalAppointments({
		auth,
		request,
	}: HttpContextContract) {
		const userLogged = auth.user
		const opts = OptsQuery.build(request.qs())

		switch (userLogged?.type) {
			case ROLES.PROF:
				return await User.find({
					_id: userLogged?._id,
					unity_id: userLogged?.unity_id,
					active: opts.active,
				}).select('-payment_participations -password')
			default:
				return await User.where({
					unity_id: userLogged?.unity_id,
					active: opts.active,
					$or: [
						{ type: ROLES.ADMIN_PROF },
						{ type: ROLES.PROF },
						{ performs_medical_appointments: true },
					],
				}).select('-payment_participations -password')
		}
	}

	async findAllUsersSecs({ auth, request }: HttpContextContract) {
		const userLogged = auth.user
		const opts = OptsQuery.build(request.qs())
		const secs = await fetchUserByType(['sec'], userLogged?.unity_id, opts.active)

		return secs || []
	}

	async findUserProfsByID({ params }) {
		const { id } = params

		if (!id) {
			return []
		}

		const user = await User.where({
			_id: params.id,
			type: {
				$in: ['prof', 'admin_prof'],
			},
		})
			.select('-payment_participations -password')
			.orFail()

		return user
	}
}
export default UserControllerV2
