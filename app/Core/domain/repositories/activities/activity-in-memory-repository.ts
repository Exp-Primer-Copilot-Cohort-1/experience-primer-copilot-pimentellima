import { PromiseEither, left, right } from "App/Core/shared/either";
import { ActivitiesManagerInterface } from "../interface";
import { AbstractError } from "App/Core/errors/error.interface";
import ActivityEntity from "../../entities/activities/activity";
import { MissingParamsError } from "../../errors/missing-params";
import { ScheduleEntity } from "../../entities/schedule/schedule";
import { IActivity } from "Types/IActivity";
import { ActivityNotFoundError } from "../../errors/activity-not-found";

export class ActivityInMemoryRepository implements ActivitiesManagerInterface {
	public activities: any[] = [];

	constructor() {}

	findAllActivities: (
		unity_id: string
	) => PromiseEither<AbstractError, ActivityEntity[]>;

	async updateActivityById(
		id: string,
		activity: IActivity
	): PromiseEither<AbstractError, ActivityEntity> {
		const activities = this.activities.filter((act) => {
			act.date.setHours(0, 0, 0, 0);
			activity.date.setHours(0, 0, 0, 0);

			return (
				act.prof_id === activity.prof_id &&
				act.date.getDate() === activity.date.getDate() &&
				act._id !== id
			);
		});

		const scheduleOrErr = await ScheduleEntity.build(activities);
		if (scheduleOrErr.isLeft()) return left(scheduleOrErr.extract());

		const newAppointmentOrErr = await scheduleOrErr
			.extract()
			.addAppointment(activity);

		if (newAppointmentOrErr.isLeft())
			return left(newAppointmentOrErr.extract());

		if (!id) return left(new MissingParamsError("id"));
		const oldActivity = await this.activities.find(
			(activity) => activity._id === activity._id
		);
		if (!oldActivity) return left(new ActivityNotFoundError());
		const activityOrErr = await ActivityEntity.build({
			...oldActivity,
			...activity,
		});
		if (activityOrErr.isLeft())
			return left(new AbstractError("Internal Error", 500));

		const updatedActivity = activityOrErr.extract().updateStatus({
			date: oldActivity.date,
			hour_start: oldActivity.hour_start,
			hour_end: oldActivity.hour_end,
		});
		return right(updatedActivity);
	}

	async findActivityById(
		id: string
	): PromiseEither<AbstractError, ActivityEntity> {
		if (!id) return left(new MissingParamsError("id"));

		const item = await this.activities.find(
			(activity) => activity._id === id
		);
		if (!item) return left(new ActivityNotFoundError());

		const activityOrErr = await ActivityEntity.build(item);
		if (activityOrErr.isLeft())
			return left(new AbstractError("Internal Error", 500));

		return right(activityOrErr.extract());
	}

	deleteActivityById: (
		id: string
	) => PromiseEither<AbstractError, ActivityEntity>;

	async createActivity(
		activity: IActivity
	): PromiseEither<AbstractError, ActivityEntity> {
		const activities = this.activities.filter((act) => {
			act.date.setHours(0, 0, 0, 0);
			activity.date.setHours(0, 0, 0, 0);

			return (
				act.date.getDate() === activity.date.getDate() &&
				act.prof_id === activity.prof_id
			);
		})

		const scheduleOrErr = await ScheduleEntity.build(activities);
		if (scheduleOrErr.isLeft()) return left(scheduleOrErr.extract());

		const newAppointmentOrErr = await scheduleOrErr
			.extract()
			.addAppointment(activity);

		if (newAppointmentOrErr.isLeft())
			return left(newAppointmentOrErr.extract());

		const newActivityOrErr = await ActivityEntity.build({
			...activity,
		});
		if (newActivityOrErr.isLeft()) return left(newActivityOrErr.extract());
		const newActivity = newActivityOrErr.extract();

		return right(newActivity);
	}

	async findActivitiesByProf(
		unity_id: string,
		prof_id: string
	): PromiseEither<AbstractError, ActivityEntity[]> {
		if (!unity_id) return left(new MissingParamsError("unity id"));
		if (!prof_id) return left(new MissingParamsError("prof id"));

		const data = this.activities.filter(
			(activity) =>
				activity.unity_id === unity_id && activity.prof_id === prof_id
		);
		const activities = await Promise.all(
			data.map(async (item) => {
				const activityOrErr = await ActivityEntity.build(item);
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

		const data = this.activities.filter(
			(activity) =>
				activity.unity_id === unity_id &&
				activity.client_id === client_id
		);
		const activities = await Promise.all(
			data.map(async (item) => {
				const activityOrErr = await ActivityEntity.build(item);
				if (activityOrErr.isLeft()) {
					return {} as ActivityEntity;
				}
				return activityOrErr.extract();
			})
		);
		return right(activities);
	}
}
