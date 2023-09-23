import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'

const withControlRoles = async (
	ctx: HttpContextContract,
	fn: () => ControllerGeneric,
) => {
	const authorization = await ctx.bouncer.allows('viewList')
	if (authorization) {
		return adaptRoute(fn(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	return adaptRoute(fn(), ctx, {
		unity_id: ctx.auth.user?.unity_id,
		prof_id: ctx.auth.user?._id,
	})
}

export default withControlRoles
