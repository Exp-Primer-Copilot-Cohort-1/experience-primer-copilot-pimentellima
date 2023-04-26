import { ActivitiesManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import Activity from "../../entities/activities/activity";
import { IActivity } from "Types/IActivities";

export class CreateActivityUseCase
	implements UseCase<IActivity, Activity>
{
	constructor(
		private readonly activitiesManager: ActivitiesManagerInterface
	) {}

	public async execute(
		params: IActivity
	): PromiseEither<AbstractError, Activity> {

		const newActivityOrErr =
			await this.activitiesManager.createActivity(params);

		if (newActivityOrErr.isLeft()) return left(newActivityOrErr.extract());
		const newActivity = newActivityOrErr.extract();
		return right(newActivity);
	}
}
