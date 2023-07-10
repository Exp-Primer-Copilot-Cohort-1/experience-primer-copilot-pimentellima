import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import {
	makeCreateActivityAwaitComposer,
	makeDeleteActivityAwaitByIdComposer,
	makeFindActivityAwaitByIdComposer,
	makeFindAllActivitiesAwaitComposer,
	makeUpdateActivityAwaitByIdComposer,
} from 'App/Core/composers/activity-awaits/activity-awaits-composer'

class ActivityAwaitController {
	async findAllActivitiesAwait(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllActivitiesAwaitComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async findActivityAwaitById(ctx: HttpContextContract) {
		return adaptRoute(makeFindActivityAwaitByIdComposer(), ctx)
	}

	async createActivityAwait(ctx: HttpContextContract) {
		return adaptRoute(makeCreateActivityAwaitComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async updateActivityAwaitById(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityAwaitByIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		})
	}

	async deleteActivityAwaitById(ctx: HttpContextContract) {
		return adaptRoute(makeDeleteActivityAwaitByIdComposer(), ctx)
	}
}

export default ActivityAwaitController
