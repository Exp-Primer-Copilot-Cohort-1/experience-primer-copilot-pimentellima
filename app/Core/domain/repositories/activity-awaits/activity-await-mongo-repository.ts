import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { ActivityAwaitParams, IActivityAwait } from "Types/IActivityAwait";
import { ActivityAwaitManagerInterface } from "../interface/activity-await-manager-interface";
import ActivityAwaitEntity from "../../entities/activity-await/activity-await";
import ActivityAwait from "App/Models/ActivityAwait";
import { MissingParamsError } from "../../errors/missing-params";
import { ActivityNotFoundError } from "../../errors/activity-not-found";

export class ActivityAwaitMongoRepository implements ActivityAwaitManagerInterface {
	constructor() {}

	async createActivity(
		unity_id: string,
		activity: ActivityAwaitParams
	): PromiseEither<AbstractError, IActivityAwait> {
		const activityOrErr = await ActivityAwaitEntity.build(activity);
		if (activityOrErr.isLeft()) return left(activityOrErr.extract());

		const newActivity = await ActivityAwait.create(
			activityOrErr.extract().defineUnityId(unity_id).params()
		);
		return right(newActivity);
	}
	async findAllActivities(
		unity_id: string
	): PromiseEither<AbstractError, IActivityAwait[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));

		const activities = await ActivityAwait.find({ unity_id });
		return right(activities);
	}

	async updateActivityById(
		id: string,
		activity: ActivityAwaitParams
	): PromiseEither<AbstractError, IActivityAwait> {
		const oldActivity = await ActivityAwait.findById(id);
		if (!oldActivity) return left(new ActivityNotFoundError());
		const activityOrErr = await ActivityAwaitEntity.build(activity);
		if (activityOrErr.isLeft()) return left(activityOrErr.extract());

		const updatedActivity = await ActivityAwait.findByIdAndUpdate(id, activityOrErr.extract().params());
		if(!updatedActivity) return left(new AbstractError('Error updating activity', 500))
		return right(updatedActivity);
	}

	async findActivityById(
		id: string
	): PromiseEither<AbstractError, IActivityAwait> {
		if (!id) return left(new MissingParamsError("id"));

		const activity = await ActivityAwait.findById(id);
		if (!activity) return left(new ActivityNotFoundError());

		return right(activity);
	}

	async deleteActivityById(
		id: string
	): PromiseEither<AbstractError, IActivityAwait> {
		if (!id) return left(new MissingParamsError("id"));

		const activity = await ActivityAwait.findByIdAndDelete(id);
		if (!activity) return left(new ActivityNotFoundError());

		return right(activity);
	}
}
