import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { ROLES } from 'App/Roles/types'

const withControlRoles = (ctx: HttpContextContract, fn: () => ControllerGeneric) => {
	switch (ctx.auth.user?.type) {
		case ROLES.PROF:
			return adaptRoute(fn(), ctx, {
				unity_id: ctx.auth.user?.unity_id,
				prof_id: ctx.auth.user?._id,
			})

		default:
			return adaptRoute(fn(), ctx, {
				unity_id: ctx.auth.user?.unity_id,
			})
	}
}

export default withControlRoles
