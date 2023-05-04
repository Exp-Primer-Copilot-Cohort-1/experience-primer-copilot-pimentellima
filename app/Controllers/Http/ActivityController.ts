"use strict";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { adaptRoute } from "App/Core/adapters";
import { makeFindAllActivitiesComposer } from "App/Core/composers/activities/make-find-all-activities-composer";
import { makeUpdateActivityComposer } from "App/Core/composers/activities/make-update-activity-composer";
import { makeFindActivitiesByProfComposer } from "App/Core/composers/activities/make-find-activity-by-prof-composer";
import { makeFindActivityByClientComposer } from "App/Core/composers/activities/make-find-activity-by-client-composer";
import { makeFindActivityByIdComposer } from "App/Core/composers/activities/make-find-activity-by-id-composer";
import { makeDeleteActivityByIdComposer } from "App/Core/composers/activities/make-delete-activity-by-id-composer";
import { makeCreateActivityComposer } from "App/Core/composers/activities/make-create-activity-composer";

class ActivityController {
	async findAllActivities(ctx: HttpContextContract) {
		return adaptRoute(makeFindAllActivitiesComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		});
	}

	async findActivitiesByProf(ctx: HttpContextContract) {
		return adaptRoute(makeFindActivitiesByProfComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id,
		});
	}

	async findActivitiesByClient(ctx: HttpContextContract) {
		return adaptRoute(makeFindActivityByClientComposer(), ctx, {
			unity_id: ctx.auth.user?.unity_id
		});
	}

	async findActivityById(ctx: HttpContextContract) {
		return adaptRoute(makeFindActivityByIdComposer(), ctx);
	}

	async createActivity(ctx: HttpContextContract) {
		return adaptRoute(makeCreateActivityComposer(), ctx)
	}

	async updateActivity(ctx: HttpContextContract) {
		return adaptRoute(makeUpdateActivityComposer(), ctx);
	}

	async deleteActivityById(ctx: HttpContextContract) {
		return adaptRoute(makeDeleteActivityByIdComposer(), ctx)
	}
}

module.exports = ActivityController;
