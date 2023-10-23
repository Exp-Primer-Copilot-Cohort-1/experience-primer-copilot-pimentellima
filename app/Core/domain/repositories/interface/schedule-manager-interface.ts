import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither } from "App/Core/shared";

export interface ScheduleManagerContract {
	getWorkHours(prof_id: string): PromiseEither<
		AbstractError,
		{
			hourStartDay: string;
			hourEndDay: string;
			hourStartLunch: string;
			hourEndLunch: string;
		}
	>;
}
