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
} from 'App/Core/composers/activities/make'
import { COLLECTION_NAME } from 'App/Models/Activity'
import { ROLES } from 'App/Roles/types'
import LogDecorator, { ACTION } from '../Decorators/Log'

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

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async updateActivityStatusById(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityStatusComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async updateActivityStartedAt(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityStartedAtComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
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

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async createActivity(ctx: HttpContextContract) {
		return adaptRoute(makeCreateActivityComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async createActivityAwait(ctx: HttpContextContract) {
		return adaptRoute(makeCreateActivityAwaitComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async createRecurrentActivity(ctx: HttpContextContract) {
		return adaptRoute(makeCreateRecurrentActivityComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async updateActivityById(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityByIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async deleteActivityById(ctx: HttpContextContract) {
		return adaptRoute(makeDeleteActivityByIdComposer(), ctx)
	}
}

export default ActivityController
