import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeCreateActivityComposer } from 'App/Core/composers/activities/make-create-activity-composer'
import { makeDeleteActivityByIdComposer } from 'App/Core/composers/activities/make-delete-activity-by-id-composer'
import { makeFindActivityByClientIdComposer } from 'App/Core/composers/activities/make-find-activity-by-client-id-composer'
import { makeFindActivityByIdComposer } from 'App/Core/composers/activities/make-find-activity-by-id-composer'
import { makeFindActivitiesByProfIdComposer } from 'App/Core/composers/activities/make-find-activity-by-prof-id-composer'
import { makeFindAllActivitiesComposer } from 'App/Core/composers/activities/make-find-all-activities-composer'
import { makeUpdateActivityByIdComposer } from 'App/Core/composers/activities/make-update-activity-by-id-composer'

class ActivityController {
	async findAllActivities(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllActivitiesComposer(), ctx, {
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
