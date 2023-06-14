import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import Activity from "App/Models/Activity";
import { IActivity } from "Types/IActivity";
import ActivityEntity from "../../entities/activities/activity";
import { ScheduleEntity } from "../../entities/schedule/schedule";
import { ActivityNotFoundError } from "../../errors/activity-not-found";
import { MissingParamsError } from "../../errors/missing-params";
import { ActivitiesManagerInterface } from "../interface/activity-manager.interface";
import { AppointmentStatus } from "App/Helpers";

export class ActivityMongoRepository implements ActivitiesManagerInterface {
	constructor() {}

	async updateActivityStartedAt(
		id: string,
		started_at: Date
	): PromiseEither<AbstractError, IActivity> {
		const activity = await Activity.findOneAndUpdate(
			{ _id: id },
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

		const activityOrErr = await ActivityEntity.build(activity.toObject());
		if (activityOrErr.isLeft())
			return left(new AbstractError("Internal Error", 500));
		return right(activityOrErr.extract().params());
	}

	async updateActivityFinishedAt(
		id: string,
		finished_at: Date
	): PromiseEither<AbstractError, IActivity> {
		const activity = await Activity.findOneAndUpdate(
			{ _id: id },
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

		const activityOrErr = await ActivityEntity.build(activity.toObject());
		if (activityOrErr.isLeft())
			return left(new AbstractError("Internal Error", 500));
		return right(activityOrErr.extract().params());
	}

	async updateActivityStatusById(
		id: string,
		status: AppointmentStatus
	): PromiseEither<AbstractError, IActivity> {
		const activity = await Activity.findOneAndUpdate(
			{ _id: id },
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

		const activityOrErr = await ActivityEntity.build(activity.toObject());
		if (activityOrErr.isLeft())
			return left(new AbstractError("Internal Error", 500));

		return right(activityOrErr.extract().params());
	}

	async createActivityInAwait(
		activity: IActivity
	): PromiseEither<AbstractError, IActivity> {
		const newActivityOrErr = await ActivityEntity.build(activity);
		if (newActivityOrErr.isLeft()) return left(newActivityOrErr.extract());
		const newActivity = newActivityOrErr.extract();

		const { _id } = await Activity.create(newActivity.params());
		newActivity.defineId(_id.toString());
		return right(newActivity.params());
	}

	async createActivity(
		activity: IActivity
	): PromiseEither<AbstractError, IActivity> {
		const activities = (
			await Activity.find({ prof_id: activity.prof_id })
		).filter((act) => {
			const dateAct = new Date(act.date);
			dateAct.setHours(0, 0, 0, 0);
			const dateActivity = new Date(activity.date);
			dateActivity.setHours(0, 0, 0, 0);

			return dateAct === dateActivity;
		});

		const scheduleOrErr = await ScheduleEntity.build(activities);
		if (scheduleOrErr.isLeft()) return left(scheduleOrErr.extract());

		const newAppointmentOrErr = await scheduleOrErr
			.extract()
			.addAppointment(activity);

		if (newAppointmentOrErr.isLeft())
			return left(newAppointmentOrErr.extract());

		const newActivityOrErr = await ActivityEntity.build(activity);
		if (newActivityOrErr.isLeft()) return left(newActivityOrErr.extract());
		const newActivity = newActivityOrErr.extract();

		const { _id } = await Activity.create(newActivity.params());
		newActivity.defineId(_id.toString());
		return right(newActivity.params());
	}

	async findActivityById(
		id: string
	): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new MissingParamsError("id"));

		const item = await Activity.findById(id);
		if (!item) return left(new ActivityNotFoundError());

		const activityOrErr = await ActivityEntity.build(item.toObject());
		if (activityOrErr.isLeft())
			return left(new AbstractError("Internal Error", 500));

		return right(activityOrErr.extract().params());
	}

	async deleteActivityById(
		id: string
	): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new MissingParamsError("id"));

		const item = await Activity.findByIdAndDelete(id);
		if (!item) return left(new ActivityNotFoundError());

		const activityOrErr = await ActivityEntity.build(item.toObject());
		if (activityOrErr.isLeft())
			return left(new AbstractError("Internal Error", 500));

		return right(activityOrErr.extract().params());
	}

	async findAllActivities(
		unity_id: string
	): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));

		const data = await Activity.find({ unity_id });
		const activities = await Promise.all(
			data.map(async (item) => {
				const activityOrErr = await ActivityEntity.build(
					item.toObject()
				);

				if (activityOrErr.isLeft()) {
					return {} as ActivityEntity;
				}
				return activityOrErr.extract().params() as IActivity;
			})
		);
		return right(activities);
	}

	async findActivitiesByProf(
		unity_id: string,
		prof_id: string
	): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));
		if (!prof_id) return left(new MissingParamsError("prof id"));

		const data = await Activity.find({ unity_id, prof_id });
		const activities = await Promise.all(
			data.map(async (item) => {
				const activityOrErr = await ActivityEntity.build(
					item.toObject()
				);
				if (activityOrErr.isLeft()) {
					return {} as ActivityEntity;
				}
				return activityOrErr.extract().params();
			})
		);
		return right(activities);
	}

	async findActivitiesByClient(
		unity_id: string,
		client_id: string
	): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));
		if (!client_id) return left(new MissingParamsError("client id"));

		const data = await Activity.find({
			unity_id,
			'client.value': client_id
		});

		const activities = await Promise.all(
			data.map(async (item) => {
				const activityOrErr = await ActivityEntity.build(
					item.toObject()
				);
				if (activityOrErr.isLeft()) {
					return {} as ActivityEntity;
				}
				return activityOrErr.extract().params();
			})
		);
		return right(activities);
	}

	async updateActivityById(
		id: string,
		activity: IActivity
	): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new MissingParamsError("id"));

		const activities = (
			await Activity.find({ prof_id: activity.prof_id })
		).filter((act) => {
			const dateAct = new Date(act.date);
			dateAct.setHours(0, 0, 0, 0);
			const dateActivity = new Date(activity.date);
			dateActivity.setHours(0, 0, 0, 0);

			return dateAct === dateActivity && act._id !== id;
		});

		const scheduleOrErr = await ScheduleEntity.build(activities);
		if (scheduleOrErr.isLeft()) return left(scheduleOrErr.extract());

		const newAppointmentOrErr = await scheduleOrErr
			.extract()
			.addAppointment(activity);

		if (newAppointmentOrErr.isLeft())
			return left(newAppointmentOrErr.extract());

		const oldActivity = await Activity.findById(id);
		if (!oldActivity) return left(new ActivityNotFoundError());
		const activityOrErr = await ActivityEntity.build({
			...oldActivity.toObject(),
			...activity,
		});
		if (activityOrErr.isLeft())
			return left(new AbstractError("Internal Error", 500));

		const updatedActivity = activityOrErr
			.extract()
			.updateStatus(oldActivity)
			.params();

		await Activity.findByIdAndUpdate(id, updatedActivity);
		return right(updatedActivity);
	}
}
