import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import Activity from "App/Models/Activity";
import ActivityEntity from "../../entities/activities/activity";
import { MissingParamsError } from "../../errors/missing-params";
import { ActivitiesManagerInterface } from "../interface/activities-manager.interface";
import { ActivityNotFoundError } from "../../errors/activity-not-found";
import { IActivity } from "Types/IActivity";
import { ScheduleEntity } from "../../entities/schedule/schedule";

export class ActivityMongoRepository implements ActivitiesManagerInterface {
	constructor() {}

	async createActivity(
		activity: IActivity
	): PromiseEither<AbstractError, ActivityEntity> {
		const activities = (
			await Activity.find({ prof_id: activity.prof_id })
		).filter((act) => {
			const dateAct = new Date(act.date);
			dateAct.setHours(0,0,0,0);
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
		return right(newActivity);
	}

	async findActivityById(
		id: string
	): PromiseEither<AbstractError, ActivityEntity> {
		if (!id) return left(new MissingParamsError("id"));

		const item = await Activity.findById(id);
		if (!item) return left(new ActivityNotFoundError());

		const activityOrErr = await ActivityEntity.build(item.toObject());
		if (activityOrErr.isLeft())
			return left(new AbstractError("Internal Error", 500));

		return right(activityOrErr.extract());
	}

	async deleteActivityById(
		id: string
	): PromiseEither<AbstractError, ActivityEntity> {
		if (!id) return left(new MissingParamsError("id"));

		const item = await Activity.findByIdAndDelete(id);
		if (!item) return left(new ActivityNotFoundError());

		const activityOrErr = await ActivityEntity.build(item.toObject());
		if (activityOrErr.isLeft())
			return left(new AbstractError("Internal Error", 500));

		return right(activityOrErr.extract());
	}

	async findAllActivities(
		unity_id: string
	): PromiseEither<AbstractError, ActivityEntity[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));

		const data = await Activity.find({ unity_id });
		const activities = await Promise.all(
			data.map(async (item) => {
				const activityOrErr = await ActivityEntity.build(item.toObject());
				if (activityOrErr.isLeft()) {
					return {} as ActivityEntity;
				}
				return activityOrErr.extract();
			})
		);
		return right(activities);
	}

	async findActivitiesByProf(
		unity_id: string,
		prof_id: string
	): PromiseEither<AbstractError, ActivityEntity[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));
		if (!prof_id) return left(new MissingParamsError("prof id"));

		const data = await Activity.find({ unity_id, prof_id });
		const activities = await Promise.all(
			data.map(async (item) => {
				const activityOrErr = await ActivityEntity.build(item.toObject());
				if (activityOrErr.isLeft()) {
					return {} as ActivityEntity;
				}
				return activityOrErr.extract();
			})
		);
		return right(activities);
	}

	async findActivitiesByClient(
		unity_id: string,
		client_id: string
	): PromiseEither<AbstractError, ActivityEntity[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));
		if (!client_id) return left(new MissingParamsError("client id"));

		const data = await Activity.find({ unity_id, client_id });
		const activities = await Promise.all(
			data.map(async (item) => {
				const activityOrErr = await ActivityEntity.build(item.toObject());
				if (activityOrErr.isLeft()) {
					return {} as ActivityEntity;
				}
				return activityOrErr.extract();
			})
		);
		return right(activities);
	}

	async updateActivityById(
		id: string,
		activity: IActivity
	): PromiseEither<AbstractError, ActivityEntity> {
		if (!id) return left(new MissingParamsError("id"));

		const activities = (
			await Activity.find({ prof_id: activity.prof_id })
		).filter((act) => {
			act.date.setHours(0, 0, 0, 0);
			activity.date.setHours(0, 0, 0, 0);

			return (
				act.date.getDate() === activity.date.getDate() && act._id !== id
			);
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
			.updateStatus(oldActivity);

		await Activity.findByIdAndUpdate(id, updatedActivity);
		return right(updatedActivity);
	}
}
