'use strict'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

import { ROLES } from 'App/Roles/types'
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
	public async findAllUsersProfs({ auth }: HttpContextContract) {
		const userLogged = auth.user
		switch (userLogged?.type) {
			case ROLES.PROF:
				return await User.find({
					_id: userLogged?._id,
					unity_id: userLogged?.unity_id,
					active: true,
					type: {
						$in: ['prof', 'admin_prof'],
					},
				}).select('-payment_participations -password')
			default:
				return await User.find({
					unity_id: userLogged?.unity_id,
					active: true,
					type: {
						$in: [ROLES.ADMIN_PROF, ROLES.PROF],
					},
				}).select('-payment_participations -password')
		}
	}

	public async findAllUsersProfsInative({ auth }) {
		const userLogged = auth.user

		switch (userLogged?.type) {
			case ROLES.PROF:
				return await User.find({
					_id: userLogged?._id,
					unity_id: userLogged?.unity_id,
					active: false,
					type: {
						$in: ['prof', 'admin_prof'],
					},
				}).select('-payment_participations -password')
			default:
				return await User.find({
					unity_id: userLogged?.unity_id,
					active: false,
					type: {
						$in: ['prof', 'admin_prof'],
					},
				}).select('-payment_participations -password')
		}
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
