import ENV from '@ioc:Adonis/Core/Env'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ROLES } from 'App/Roles/types'

const hasNotPermission = [
	ROLES.CLIENT,
	ROLES.PROF,
	ROLES.SEC
]

export default class PermissionStatusMiddleware {
	public async handle({ request, auth }: HttpContextContract, next) {

		if (request.method() !== 'PUT' || ENV.get('NODE_ENV') === 'test') {
			return await next()
		}

		const user = auth.user
		// usuário tem permissão para alterar o status
		if (user && !hasNotPermission.includes(user.type)) {
			return next()
		}

		const body = request.body()

		const { active, ...rest } = body

		request.updateBody(rest)

		return await next()
	}
}
