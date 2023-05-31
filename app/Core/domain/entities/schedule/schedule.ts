import { PromiseEither, left, right } from "App/Core/shared";
import { Entity } from "../abstract/entity.abstract";
import { AbstractError } from "App/Core/errors/error.interface";
import { InvalidParamsError } from "../../errors/invalid-params-error";
import { z } from "zod";
import { ConflictingScheduleError } from "../../errors/ conflicting-schedule-error";
import { InvalidScheduleError } from "../../errors/invalid-schedule-error";
import { IActivity } from "Types/IActivity";
import { format, isBefore, isWithinInterval, startOfToday, startOfYesterday } from "date-fns";

type appointment = {
	hour_start: Date;
	hour_end: Date;
	date: Date;
};

const appointmentSchema = z.object({
	hour_start: z.date(),
	hour_end: z.date(),
	date: z.date(),
});

type ISchedule = {
	appointments: appointment[];
};

export class ScheduleEntity extends Entity {
	private _appointments: appointment[];

	defineAppointments(appointments: appointment[]): ScheduleEntity {
		this._appointments = appointments;
		return this;
	}

	public get appointments(): appointment[] {
		return this._appointments;
	}

	public async addAppointment(
		activity: IActivity
	): PromiseEither<AbstractError, ScheduleEntity> {
		try {
			const appointment = {
				hour_start: new Date(activity.hour_start),
				hour_end: new Date(activity.hour_end),
				date: new Date(activity.date),
			};
			appointmentSchema.parse(appointment);

			if (
				isBefore(appointment.date, startOfYesterday())||
				format(appointment.hour_start, "HH:mm") >=
					format(appointment.hour_end, "HH:mm")
			) {
				return left(new InvalidScheduleError());
			}

			for (const app of this._appointments) {
				if (
					isWithinInterval(appointment.hour_start, {
						start: app.hour_start,
						end: app.hour_end,
					}) ||
					isWithinInterval(appointment.hour_end, {
						start: app.hour_start,
						end: app.hour_end,
					})
				)
					return left(new ConflictingScheduleError());
			}
			return right(this);
		} catch (err) {
			return left(new InvalidParamsError(err));
		}
	}

	public static async build(
		activities: IActivity[]
	): PromiseEither<AbstractError, ScheduleEntity> {
		try {
			const appointments = activities.map((activity) => ({
				date: activity.date,
				hour_start: new Date(activity.hour_start),
				hour_end: new Date(activity.hour_end),
			}));

			z.array(appointmentSchema).parse(appointments);

			return right(new ScheduleEntity().defineAppointments(appointments));
		} catch (err) {
			return left(new InvalidParamsError(err));
		}
	}
}
