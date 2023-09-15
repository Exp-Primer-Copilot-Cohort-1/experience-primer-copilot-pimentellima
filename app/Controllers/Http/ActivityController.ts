import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeCreateActivityAwaitComposer,
	makeCreateActivityComposer,
	makeCreateRecurrentActivityComposer,
	makeDeleteActivityByIdComposer,
	makeFindActivitiesByProfIdComposer,
	makeFindActivityByClientIdComposer,
	makeFindActivityByIdComposer,
	makeFindAllActivitiesAwaitComposer,
	makeFindAllActivitiesComposer,
	makeFindAllActivitiesPendingComposer,
	makeUpdateActivityByIdComposer,
	makeUpdateActivityFinishedAtComposer,
	makeUpdateActivityStartedAtComposer,
	makeUpdateActivityStatusComposer,
} from 'App/Core/composers/activities/activity-composer'
import { ROLES } from 'App/Roles/types'

class ActivityController {
	async findAllActivities(ctx: HttpContextContract) {
		switch (ctx.auth.user?.type) {
			case ROLES.PROF:
				return adaptRoute(makeFindActivitiesByProfIdComposer(), ctx, {
					unity_id: ctx.auth.user?.unity_id,
					prof_id: ctx.auth.user?._id,
				})

			default:
				return adaptRoute(makeFindAllActivitiesComposer(), ctx, {
					unity_id: ctx.auth.user?.unity_id,
				})
		}
	}

	async findAllActivitiesAwait(ctx: HttpContextContract) {
		switch (ctx.auth.user?.type) {
			case ROLES.PROF:
				return adaptRoute(makeFindAllActivitiesAwaitComposer(), ctx, {
					unity_id: ctx.auth.user?.unity_id,
					prof: ctx.auth.user?._id,
				})

			default:
				return adaptRoute(makeFindAllActivitiesAwaitComposer(), ctx, {
					unity_id: ctx.auth.user?.unity_id,
				})
		}
	}

	async findAllActivitiesPending(ctx: HttpContextContract) {
		switch (ctx.auth.user?.type) {
			case ROLES.PROF:
				return adaptRoute(makeFindAllActivitiesPendingComposer(), ctx, {
					unity_id: ctx.auth.user?.unity_id,
					prof: ctx.auth.user?._id,
				})

			default:
				return adaptRoute(makeFindAllActivitiesPendingComposer(), ctx, {
					unity_id: ctx.auth.user?.unity_id,
				})
		}
	}

	async updateActivityStatusById(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityStatusComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async updateActivityStartedAt(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityStartedAtComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async updateActivityFinishedAt(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityFinishedAtComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async findActivitiesByProfId(ctx: HttpContextContract) {
		return adaptRoute(makeFindActivitiesByProfIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async findActivitiesByClientId(ctx: HttpContextContract) {
		return adaptRoute(makeFindActivityByClientIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}
	async findActivityById(ctx: HttpContextContract) {
		return adaptRoute(makeFindActivityByIdComposer(), ctx)
	}

	async createActivity(ctx: HttpContextContract) {
		return adaptRoute(makeCreateActivityComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async createActivityAwait(ctx: HttpContextContract) {
		return adaptRoute(makeCreateActivityAwaitComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async createRecurrentActivity(ctx: HttpContextContract) {
		return adaptRoute(makeCreateRecurrentActivityComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async updateActivityById(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityByIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async deleteActivityById(ctx: HttpContextContract) {
		return adaptRoute(makeDeleteActivityByIdComposer(), ctx)
	}
}

export default ActivityController
