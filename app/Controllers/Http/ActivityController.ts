import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { adaptRoute } from "App/Core/adapters";
import {
	makeCreateActivityComposer,
	makeCreateActivityInAwaitComposer,
	makeDeleteActivityByIdComposer,
	makeFindActivitiesByProfIdComposer,
	makeFindActivityByClientIdComposer,
	makeFindActivityByIdComposer,
	makeFindAllActivitiesComposer,
	makeUpdateActivityByIdComposer,
	makeUpdateActivityFinishedAtComposer,
	makeUpdateActivityStartedAtComposer,
	makeUpdateActivityStatusComposer,
} from "App/Core/composers/activities/activity-composer";

class ActivityController {
	async findAllActivities(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllActivitiesComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		});
	}

	async updateActivityStatusById(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityStatusComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		});
	}

	async updateActivityStartedAt(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityStartedAtComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		});
	}

	async updateActivityFinishedAt(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityFinishedAtComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		});
	}

	async findActivitiesByProfId(ctx: HttpContextContract) {
		return adaptRoute(makeFindActivitiesByProfIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		});
	}

	async findActivitiesByClientId(ctx: HttpContextContract) {
		return adaptRoute(makeFindActivityByClientIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		});
	}
	async findActivityById(ctx: HttpContextContract) {
		return adaptRoute(makeFindActivityByIdComposer(), ctx);
	}

	async createActivity(ctx: HttpContextContract) {
		return adaptRoute(makeCreateActivityComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		});
	}

	async createActivityInAwait(ctx: HttpContextContract) {
		return adaptRoute(makeCreateActivityInAwaitComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		});
	}

	async updateActivityById(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityByIdComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		});
	}

	async deleteActivityById(ctx: HttpContextContract) {
		return adaptRoute(makeDeleteActivityByIdComposer(), ctx);
	}
}

export default ActivityController;
