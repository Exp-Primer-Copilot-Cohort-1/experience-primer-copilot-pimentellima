import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { AppointmentStatus } from "App/Helpers";
import Activity from "App/Models/Activity";
import { ActivityParams, IActivity } from "Types/IActivity";
import ActivityEntity from "../../entities/activities/activity";
import { ActivityNotFoundError } from "../../errors/activity-not-found";
import { MissingParamsError } from "../../errors/missing-params";
import { ActivitiesManagerInterface } from "../interface/activity-manager.interface";

export class ActivityMongoRepository implements ActivitiesManagerInterface {
	constructor() {}

	async updateActivityStartedAt(
		id: string,
		started_at: Date
	): PromiseEither<AbstractError, IActivity> {
		const activity = await Activity.findByIdAndUpdate(
			id,
			{
				$set: {
					started_at,
					scheduled: AppointmentStatus.IN_PROGRESS,
				},
			},
			{
				returnDocument: "after",
			}
		);
		if (!activity)
			return left(new AbstractError("Error updating activity", 500));

		return right(activity);
	}

	async updateActivityFinishedAt(
		id: string,
		finished_at: Date
	): PromiseEither<AbstractError, IActivity> {
		const activity = await Activity.findByIdAndUpdate(
			id,
			{
				$set: {
					finished_at,
					scheduled: AppointmentStatus.COMPLETED,
				},
			},
			{
				returnDocument: "after",
			}
		);
		if (!activity)
			return left(new AbstractError("Error updating activity", 500));
		return right(activity);
	}

	async updateActivityStatusById(
		id: string,
		status: AppointmentStatus
	): PromiseEither<AbstractError, IActivity> {
		const activity = await Activity.findByIdAndUpdate(
			id,
			{
				$set: {
					scheduled: status,
				},
			},
			{
				returnDocument: "after",
			}
		);
		if (!activity)
			return left(new AbstractError("Error updating activity", 500));

		return right(activity);
	}

	async createActivity(
		unity_id: string,
		activity: ActivityParams
	): PromiseEither<AbstractError, IActivity> {
		if (!unity_id) return left(new MissingParamsError("unity_id"));
		const activityOrErr = await ActivityEntity.build(activity);
		if (activityOrErr.isLeft()) return left(activityOrErr.extract());

		const newActivity = await Activity.create(
			activityOrErr.extract().defineUnityId(unity_id).params()
		);
		return right(newActivity);
	}

	async findActivityById(
		id: string
	): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new MissingParamsError("id"));

		const activity = await Activity.findById(id);
		if (!activity) return left(new ActivityNotFoundError());

		return right(activity);
	}

	async deleteActivityById(
		id: string
	): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new MissingParamsError("id"));

		const activity = await Activity.findByIdAndDelete(id);
		if (!activity) return left(new ActivityNotFoundError());

		return right(activity);
	}

	async findAllActivities(
		unity_id: string
	): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));

		const activities = await Activity.find({ unity_id });
		return right(activities);
	}

	async findActivitiesByProf(
		unity_id: string,
		prof_id: string
	): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));
		if (!prof_id) return left(new MissingParamsError("prof id"));

		const activities = await Activity.find({ unity_id, prof_id });
		return right(activities);
	}

	async findActivitiesByClient(
		unity_id: string,
		client_id: string
	): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));
		if (!client_id) return left(new MissingParamsError("client id"));

		const activities = await Activity.find({
			unity_id,
			"client.value": client_id,
		});

		return right(activities);
	}

	async updateActivityById(
		id: string,
		activity: ActivityParams
	): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new MissingParamsError("id"));
		const oldActivity = await Activity.findById(id);
		if (!oldActivity) return left(new ActivityNotFoundError());
		const activityOrErr = await ActivityEntity.build(activity);
		if (activityOrErr.isLeft()) return left(activityOrErr.extract());

		const updatedActivity = await Activity.findByIdAndUpdate(
			id,
			activityOrErr.extract().params(),
			{
				returnDocument: "after",
			}
		);
		if (!updatedActivity)
			return left(new AbstractError("Error updating activity", 500));
		return right(updatedActivity);
	}
}
