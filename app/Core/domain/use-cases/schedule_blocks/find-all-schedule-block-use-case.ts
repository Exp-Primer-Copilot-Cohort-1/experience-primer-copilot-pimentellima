import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { IScheduleBlock } from "Types/IScheduleBlock";
import { ScheduleBlockManagerInterface } from "../../repositories/interface/schedule-block-manager-interface";

type Props = {
	unity_id: string;
};

export class FindAllScheduleBlockUseCase
	implements UseCase<Props, IScheduleBlock[]>
{
	constructor(
		private readonly scheduleBlockManager: ScheduleBlockManagerInterface
	) {}

	public async execute(
		params: Props
	): PromiseEither<AbstractError, IScheduleBlock[]> {
		const scheduleBlocksOrErr =
			await this.scheduleBlockManager.findAllScheduleBlock(
				params.unity_id
			);

		if (scheduleBlocksOrErr.isLeft())
			return left(scheduleBlocksOrErr.extract());
		return right(scheduleBlocksOrErr.extract());
	}
}
