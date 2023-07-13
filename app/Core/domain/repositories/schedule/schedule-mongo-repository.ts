import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import User from "App/Models/User";
import { ScheduleParams } from "Types/ISchedule";
import { IUser } from "Types/IUser";
import { format } from "date-fns";
import * as z from "zod";
import { MissingParamsError } from "../../errors/missing-params";
import { ScheduleManagerInterface } from "../interface/schedule-manager-interface";

export class ScheduleMongoRepository implements ScheduleManagerInterface {
	async verifySchedule(
		prof_id: string,
		schedule: ScheduleParams
	): PromiseEither<
		AbstractError,
		z.SafeParseReturnType<
			{
				hourEnd: string;
				hourStart: string;
			},
			{
				hourEnd: string;
				hourStart: string;
			}
		>
	> {
		if (!prof_id) return left(new MissingParamsError("prof_id"));
		const prof = (await User.findById(prof_id)) as IUser;
		if (!prof)
			return left(new AbstractError("Could not find professional", 404));

		const startLunch = format(new Date(prof.hour_start_lunch), 'HH:mm')
		const endLunch = format(new Date(prof.hour_end_lunch), 'HH:mm')
		const startDay = format(new Date(prof.hour_start), 'HH:mm')
		const endDay = format(new Date(prof.hour_end), 'HH:mm')

		const parsedSchedule = z
			.object({
				hourStart: z
					.string()
					.refine((val) => !(format(new Date(val), 'HH:mm') >= startLunch && format(new Date(val), 'HH:mm') <= endLunch), {
						message:
							"O horário inicial está reservado para o almoço do profissional",
					})
					.refine((val) => !(format(new Date(val), 'HH:mm') < startDay || format(new Date(val), 'HH:mm') > endDay), {
						message:
							"O horário inicial está fora do expediente do profissional",
					}),
				hourEnd: z
					.string()
					.refine((val) => !(format(new Date(val), 'HH:mm') >= startLunch && format(new Date(val), 'HH:mm') <= endLunch), {
						message:
							"O horário final está reservado para o almoço do profissional",
					})
					.refine((val) => !(format(new Date(val), 'HH:mm') < startDay || format(new Date(val), 'HH:mm') > endDay), {
						message:
							"O horário final está fora do expediente do profissional",
					}),
			})
			.safeParse(schedule);
		return right(parsedSchedule);
	}
}
