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
	makeUpdateActivityStatusComposer
} from 'App/Core/composers/activities/activity-composer'

class ActivityController {
	async findAllActivities(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllActivitiesComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async findAllActivitiesAwait(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllActivitiesAwaitComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async findAllActivitiesPending(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllActivitiesPendingComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
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
