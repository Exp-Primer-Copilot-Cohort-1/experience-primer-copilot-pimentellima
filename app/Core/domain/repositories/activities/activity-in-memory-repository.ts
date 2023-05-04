import { PromiseEither, left, right } from "App/Core/shared/either";
import { ActivitiesManagerInterface } from "../interface";
import { AbstractError } from "App/Core/errors/error.interface";
import ActivityEntity from "../../entities/activities/activity";
import { MissingParamsError } from "../../errors/missing-params";
import { ScheduleEntity } from "../../entities/schedule/schedule";
import { IActivity } from "Types/IActivity";

export class ActivityInMemoryRepository implements ActivitiesManagerInterface {
	public activities: any[] = [];

	constructor() {}

	findAllActivities: (unity_id: string) => PromiseEither<AbstractError, ActivityEntity[]>;
	updateActivity: (params: IActivity) => PromiseEither<AbstractError, ActivityEntity>;
	findActivityById: (id: string) => PromiseEither<AbstractError, ActivityEntity>;
	deleteActivityById: (id: string) => PromiseEither<AbstractError, ActivityEntity>;

	async createActivity(
		params: IActivity
	): PromiseEither<AbstractError, ActivityEntity> {
		const activities = this.activities.filter(
			(activity) =>
				activity.date.getDay() === new Date(params.date).getDay()
		);

		const scheduleParams = {
			prof_id: params.prof_id.toString(),
			appointments: activities.map((activity) => ({
				date: activity.date,
				hour_start: new Date(activity.hour_start),
				hour_end: new Date(activity.hour_end),
			})),
		};

		const scheduleOrErr = await ScheduleEntity.build(scheduleParams);
		if (scheduleOrErr.isLeft()) return left(scheduleOrErr.extract());

		const newAppointmentOrErr = await scheduleOrErr
			.extract()
			.addAppointment({
				hour_start: new Date(params.hour_start),
				hour_end: new Date(params.hour_end),
				date: new Date(params.date),
			});

		if (newAppointmentOrErr.isLeft())
			return left(newAppointmentOrErr.extract());

		const newActivityOrErr = await ActivityEntity.build({
			...params,
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
				activity.unity_id === unity_id && activity.client_id === client_id
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
