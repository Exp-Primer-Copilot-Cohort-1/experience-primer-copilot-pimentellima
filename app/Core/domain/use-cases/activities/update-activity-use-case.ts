import { ActivitiesManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import ActivityEntity from "../../entities/activities/activity";
import { IActivity } from "Types/IActivity";

type ActivityProps = {
	id: string;
	activity: IActivity;
};

export class UpdateActivityUseCase
	implements UseCase<ActivityProps, ActivityEntity>
{
	constructor(
		private readonly activitiesManager: ActivitiesManagerInterface
	) {}

	public async execute(
		params: ActivityProps
	): PromiseEither<AbstractError, ActivityEntity> {
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
