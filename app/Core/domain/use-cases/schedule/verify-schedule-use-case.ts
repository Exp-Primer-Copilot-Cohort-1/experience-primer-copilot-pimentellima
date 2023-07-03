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
						hourEnd: string;
						hourStart: string;
					},
					{
						hourEnd: string;
						hourStart: string;
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
				hourEnd: string;
				hourStart: string;
			},
			{
				hourEnd: string;
				hourStart: string;
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
