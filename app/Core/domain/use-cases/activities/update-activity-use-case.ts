import { ActivitiesManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { IActivity } from "Types/IActivity";

type ActivityProps = {
	id: string;
	activity: IActivity;
};

export class UpdateActivityByIdUseCase
	implements UseCase<ActivityProps, IActivity>
{
	constructor(
		private readonly activitiesManager: ActivitiesManagerInterface
	) {}

	public async execute(
		params: ActivityProps
	): PromiseEither<AbstractError, IActivity> {
		const updatedActivityOrErr =
			await this.activitiesManager.updateActivityById(
				params.id,
				params.activity
			);

		if (updatedActivityOrErr.isLeft())
			return left(updatedActivityOrErr.extract());
		const activity = updatedActivityOrErr.extract();
		return right(activity);
	}
}
