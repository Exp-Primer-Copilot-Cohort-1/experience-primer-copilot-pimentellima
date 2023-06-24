import { AbstractError } from "App/Core/errors/error.interface";
import * as z from "zod";
import { PromiseEither, left, right } from "App/Core/shared";
import { ScheduleManagerInterface } from "../interface/schedule-manager-interface";
import { MissingParamsError } from "../../errors/missing-params";
import { format } from "date-fns";
import User from "App/Models/User";
import { IUser } from "Types/IUser";
import { ScheduleParams } from "Types/ISchedule";

export class ScheduleMongoRepository implements ScheduleManagerInterface {
	async verifySchedule(
		prof_id: string,
		schedule: ScheduleParams
	): PromiseEither<
		AbstractError,
		z.SafeParseReturnType<
			{
				hour_end: string;
				hour_start: string;
			},
			{
				hour_end: string;
				hour_start: string;
			}
		>
	> {
		if (!prof_id) return left(new MissingParamsError("prof_id"));
		const prof = (await User.findById(prof_id)) as IUser;
		if (!prof)
			return left(new AbstractError("Could not find professional", 404));
		const startLunch = format(new Date(prof.hour_start_lunch), "HH:mm");
		const endLunch = format(new Date(prof.hour_end_lunch), "HH:mm");
		const startDay = format(new Date(prof.hour_start), "HH:mm");
		const endDay = format(new Date(prof.hour_end), "HH:mm");

		const parsedSchedule = z
			.object({
				hour_start: z
					.string()
					.refine(
						(val) => {
							const formattedVal = format(new Date(val), "HH:mm");
							return !(
								formattedVal >= startLunch &&
								formattedVal <= endLunch
							);
						},
						{
							message:
								"O horário inicial está reservado para o almoço do profissional",
						}
					)
					.refine(
						(val) => {
							const formattedVal = format(new Date(val), "HH:mm");
							return !(
								formattedVal < startDay || formattedVal > endDay
							);
						},
						{
							message:
								"O horário inicial está fora do expediente do profissional",
						}
					),
				hour_end: z
					.string()
					.refine(
						(val) => {
							const formattedVal = format(new Date(val), "HH:mm");
							return !(
								formattedVal >= startLunch &&
								formattedVal <= endLunch
							);
						},
						{
							message:
								"O horário final está reservado para o almoço do profissional",
						}
					)
					.refine(
						(val) => {
							const formattedVal = format(new Date(val), "HH:mm");
							return !(
								formattedVal < startDay || formattedVal > endDay
							);
						},
						{
							message:
								"O horário final está fora do expediente do profissional",
						}
					),
			})
			.safeParse(schedule);
		return right(parsedSchedule);
	}
}
