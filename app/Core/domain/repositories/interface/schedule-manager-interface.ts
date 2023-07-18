import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither } from "App/Core/shared";

export interface ScheduleManagerInterface {
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
