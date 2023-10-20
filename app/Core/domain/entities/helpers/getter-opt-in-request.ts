import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ROLES } from 'App/Roles/types';
import { IOptsQuery } from 'App/Types/IOptsQuery';

function getterOptInRequest(ctx: HttpContextContract): IOptsQuery {
	return {
		sort: ctx.request.qs().sort as string || '--created_at',
		limit: Number(ctx.request.qs().limit),
		skip: Number(ctx.request.qs().skip),
		active: ctx.request.qs().active,
		role: ctx.auth.user?.type as ROLES,
		prof: ctx.auth.user?._id?.toString() as string,
		unity_id: ctx.auth.user?.unity_id as string,
	}
}

export default getterOptInRequest