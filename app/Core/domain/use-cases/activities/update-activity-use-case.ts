import { ActivitiesManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import Activity from "../../entities/activities/activity";
import { IActivity } from "Types/IActivities";

export class UpdateActivityUseCase
	implements UseCase<IActivity, Activity>
{
	constructor(
		private readonly activitiesManager: ActivitiesManagerInterface
	) {}

	public async execute(
		activity: IActivity
	): PromiseEither<AbstractError, Activity> {

		const updatedActivityOrErr =
			await this.activitiesManager.updateActivity(activity);

		if (updatedActivityOrErr.isLeft()) return left(updatedActivityOrErr.extract());
		const updatedActivity = updatedActivityOrErr.extract();
		return right(updatedActivity);
	}
}
