import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
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
	public async findAllUsersProfs({ auth, request }: HttpContextContract) {
		const userLogged = auth.user
		const opts = OptsQuery.build(request.qs())
		switch (userLogged?.type) {
			case ROLES.PROF:
				return await User.find({
					_id: userLogged?._id,
					unity_id: userLogged?.unity_id,
					active: opts.active,
					type: {
						$in: ['prof', 'admin_prof'],
					},
				}).select('-payment_participations -password')
			default:
				return await User.find({
					unity_id: userLogged?.unity_id,
					active: opts.active,
					type: {
						$in: [ROLES.ADMIN_PROF, ROLES.PROF],
					},
				}).select('-payment_participations -password')
		}
	}
	public async findAllUsersSecs({ auth, request }: HttpContextContract) {
		const userLogged = auth.user
		const opts = OptsQuery.build(request.qs())
		const secs = await fetchUserByType(['sec'], userLogged?.unity_id, opts.active)

		return secs || []
	}

	public async findUserProfsByID({ params }) {
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
