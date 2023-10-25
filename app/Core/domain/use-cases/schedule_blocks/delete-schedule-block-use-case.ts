import { ScheduleBlockManagerContract } from "App/Core/domain/repositories/interface/schedule-block-manager-interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { IScheduleBlock } from "App/Types/IScheduleBlock";

type Props = {
	id: string;
};

export class DeleteScheduleBlockUseCase
	implements UseCase<Props, IScheduleBlock>
{
	constructor(
		private readonly scheduleBlockManager: ScheduleBlockManagerContract
	) { }

	public async execute(
		params: Props
	): PromiseEither<AbstractError, IScheduleBlock> {
		const scheduleBlockOrErr =
			await this.scheduleBlockManager.deleteScheduleBlock(params.id);

		if (scheduleBlockOrErr.isLeft())
			return left(scheduleBlockOrErr.extract());
		return right(scheduleBlockOrErr.extract());
	}
}
