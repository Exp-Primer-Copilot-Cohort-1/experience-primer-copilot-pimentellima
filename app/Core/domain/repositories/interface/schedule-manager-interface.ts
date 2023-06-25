import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither } from "App/Core/shared";
import { ScheduleParams } from "Types/ISchedule";
import * as z from "zod";

export interface ScheduleManagerInterface {
	verifySchedule(
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
	>;
}
