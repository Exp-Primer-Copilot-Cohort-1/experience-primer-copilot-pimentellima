import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { createPermission } from 'App/Roles/helpers'
import { ROLES } from 'App/Roles/types'
import PERMISSIONS from '../Roles/permissions'

export default class Role {
	public async handle(
		{ auth, response, route }: HttpContextContract,
		next: () => Promise<void>
	) {
		if (process.env.NODE_ENV === 'test') {
			next()
		}

		const type = auth.user?.type

		if (type === ROLES.SUPERADMIN) {
			return await next()
		}

		const permissions = auth.user?.permissions || []
		const blackListPermissions = auth.user?.blacklist || []

		if (!type) {
			return response.status(401).send({
				message: 'Você precisa estar logado para acessar esta página.'
			})
		}

		const routeName = route?.name
		const name = routeName?.split('.')[0]

		if (!routeName || !name) {
			return await next()
		}

		const routePermissions = PERMISSIONS[name]?.permissions?.[routeName]

		if (!routePermissions) {
			return await next()
		}

		const hasRole = routePermissions.roles?.includes(type as ROLES)
		const hasPermission = routePermissions.permissions?.some((permission) => {
			const p = createPermission(name, permission)
			return permissions?.includes(p)
		})

		const hasBlackListPermission = routePermissions.permissions?.some(
			(permission) => {
				const p = createPermission(name, permission)
				return blackListPermissions?.includes(p)
			}
		)

		if (hasBlackListPermission || (!hasRole && !hasPermission)) {
			return response.status(403).send({
				message: 'Você não tem permissão para acessar este recurso.'
			})
		}

		await next()
	}
}
