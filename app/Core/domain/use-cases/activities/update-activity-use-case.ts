import { ActivitiesManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { ActivityParams, IActivity } from "Types/IActivity";

type Props = ActivityParams & {
	id: string
};

export class UpdateActivityByIdUseCase
	implements UseCase<Props, IActivity>
{
	constructor(
		private readonly activitiesManager: ActivitiesManagerInterface
	) {}

	public async execute(
		params: Props
	): PromiseEither<AbstractError, IActivity> {
		const updatedActivityOrErr =
			await this.activitiesManager.updateActivityById(
				params.id,
				params
			);

		if (updatedActivityOrErr.isLeft())
			return left(updatedActivityOrErr.extract());
		return right(updatedActivityOrErr.extract());
	}
}
