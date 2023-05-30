import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ROLES from '../Roles/permissions'

export default class Role {
	public async handle(
		{ auth, response, route }: HttpContextContract,
		next: () => Promise<void>,
	) {
		const type = auth.user?.type
		const permissions = auth.user?.permissions

		if (!type) {
			return response
				.status(401)
				.send({ message: 'Você precisa estar logado para acessar esta página.' })
		}

		const routeName = route?.name

		if (!routeName) {
			return await next()
		}

		const routePermissions = ROLES[routeName]

		const hasRole = routePermissions.roles.includes(type)
		const hasPermission = routePermissions.permissions.some((permission) =>
			permissions?.includes(permission),
		)

		if (!hasRole && !hasPermission) {
			return response
				.status(403)
				.send({ message: 'Você não tem permissão para acessar este recurso.' })
		}

		await next()
	}
}
