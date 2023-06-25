import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { ScheduleParams } from "Types/ISchedule";
import { SafeParseReturnType } from "zod";
import { ScheduleManagerInterface } from "../../repositories/interface/schedule-manager-interface";

type Props = ScheduleParams & {
	prof_id: string;
};

export class VerifyScheduleUseCase
	implements
		UseCase<
			Props,
			PromiseEither<
				AbstractError,
				SafeParseReturnType<
					{
						hour_end: string;
						hour_start: string;
					},
					{
						hour_end: string;
						hour_start: string;
					}
				>
			>
		>
{
	constructor(private readonly scheduleManager: ScheduleManagerInterface) {}

	public async execute(params: Props): PromiseEither<
		AbstractError,
		SafeParseReturnType<
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
		const scheduleOrErr = await this.scheduleManager.verifySchedule(
			params.prof_id,
			params
		);

		if (scheduleOrErr.isLeft()) return left(scheduleOrErr.extract());
		return right(scheduleOrErr.extract());
	}
}
