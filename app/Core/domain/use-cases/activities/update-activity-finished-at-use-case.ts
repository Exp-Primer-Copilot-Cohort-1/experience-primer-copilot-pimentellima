import { ActivitiesManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { IActivity } from "Types/IActivity";

type Props = {
	id: string;
	finished_at: Date;
};

export class UpdateActivityFinishedAtUseCase
	implements UseCase<Props, IActivity>
{
	constructor(
		private readonly activitiesManager: ActivitiesManagerInterface
	) {}

	public async execute(
		params: Props
	): PromiseEither<AbstractError, IActivity> {
		const updatedActivityOrErr =
			await this.activitiesManager.updateActivityFinishedAt(
				params.id,
				params.finished_at,
			);

		if (updatedActivityOrErr.isLeft())
			return left(updatedActivityOrErr.extract());
		return right(updatedActivityOrErr.extract());
	}
}
