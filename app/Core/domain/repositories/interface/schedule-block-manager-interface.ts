import { AbstractError } from "App/Core/errors/error.interface";
import { PromiseEither } from "App/Core/shared";
import { IScheduleBlock, ScheduleBlockParams } from "App/Types/IScheduleBlock";

export interface ScheduleBlockManagerInterface {
	createScheduleBlock: (
		unity_id: string,
		scheduleBlock: ScheduleBlockParams
	) => PromiseEither<AbstractError, IScheduleBlock>;
	findAllScheduleBlock: (
		unity_id: string
	) => PromiseEither<AbstractError, IScheduleBlock[]>;
	findScheduleBlocksByProfId: (
		unity_id: string,
		prof_id: string
	) => PromiseEither<AbstractError, IScheduleBlock[]>;
	deleteScheduleBlock: (
		id: string
	) => PromiseEither<AbstractError, IScheduleBlock>;
}
