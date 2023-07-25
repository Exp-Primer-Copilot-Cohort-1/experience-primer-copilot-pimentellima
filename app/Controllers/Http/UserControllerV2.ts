'use strict'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

import SELECTS from '../user-select'

const fetchUserByType = async (type, unityId, active = true) =>
	await User.where({
		unity_id: unityId,
		active,
		type: {
			$in: type,
		},
	}).select('-payment_participations -password')

class UserControllerV2 {
	public async findAllUsersProfs({ auth }) {
		const userLogged = auth.user

		const professionals = await fetchUserByType(
			['prof', 'admin_prof'],
			userLogged.unity_id,
		)

		return professionals || []
	}

	public async findAllUsersProfsInative({ auth }) {
		const userLogged = auth.user

		const professionals = await fetchUserByType(
			['prof', 'admin_prof'],
			userLogged.unity_id,
			false,
		)

		return professionals || []
	}

	public async findAllUsersSecs({ auth }: HttpContextContract) {
		const userLogged = auth.user

		const secs = await fetchUserByType(['sec'], userLogged?.unity_id)

		return secs || []
	}

	public async findAllUsersSecsInative({ auth }) {
		const userLogged = auth.user

		const secs = await fetchUserByType(['sec'], userLogged.unity_id, false)

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
			.select(SELECTS)
			.populate('unities')
			.populate('answer')
			.populate('activity')
			.populate('userLog')
			.orFail()

		return user
	}
}
export default UserControllerV2
