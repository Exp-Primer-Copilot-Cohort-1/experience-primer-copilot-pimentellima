import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeFindAllProfsComposers, makeSendIndicationComposer } from 'App/Core/composers'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { UserNotFoundError } from 'App/Core/domain/errors'
import { AbstractError } from 'App/Core/errors/error.interface'
import { Cache } from 'App/Core/infra/cache'
import { left, right } from 'App/Core/shared'
import { decrypt, encrypt } from 'App/Helpers/encrypt'
import User from 'App/Models/User'
import { ROLES } from 'App/Roles/types'

async function uriComponentToData(uriComponent: string) {
	const hash = decodeURIComponent(uriComponent.replace('-', '.'))
	return decrypt(hash)
}

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

	async sendIndication(ctx: HttpContextContract) {
		return adaptRoute(makeSendIndicationComposer(ctx), ctx)
	}

	async redefinePassword(ctx: HttpContextContract) {
		const params = ctx.request.only(['password', 'encoded_uri'])
		const encodedUri = params.encoded_uri
		const password = params.password
		try {
			const hash = await uriComponentToData(encodedUri)

			const recoveryKey = await decrypt(hash)
			if (!recoveryKey) return new AbstractError('Chave inválida', 401)
			const recoveryKeyObj = JSON.parse(recoveryKey)
			const userId = recoveryKeyObj.userId
			if (!userId) return new UserNotFoundError()

			const cache = new Cache()

			const identifierString = await cache.get(`${userId}-redefine-password-key`)
			if (!identifierString)
				return new AbstractError('Link expirado ou inexistente', 400)

			if (identifierString !== recoveryKeyObj.identifierString) {
				return new AbstractError('Chave inválida', 401)
			}

			await cache.delete(`${userId}-redefine-password-key`)

			const user = await User.findById(userId).orFail()
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
