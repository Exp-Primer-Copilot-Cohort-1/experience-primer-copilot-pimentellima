import { ActivitiesManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import ActivityEntity from "../../entities/activities/activity";

type ActivityProps = {
	unity_id: string;
    prof_id: string
};

export class FindActivitiesByProfIdUseCase
	implements UseCase<ActivityProps, ActivityEntity[]>
{
	constructor(
		private readonly activitiesManager: ActivitiesManagerInterface
	) {}

	public async execute(
		params: ActivityProps
	): PromiseEither<AbstractError, ActivityEntity[]> {

		const activityOrErr =
			await this.activitiesManager.findActivitiesByProf(
				params?.unity_id,
                params?.prof_id
			);

		if (activityOrErr.isLeft()) return left(activityOrErr.extract());
		const activities = activityOrErr.extract();
		return right(activities);
	}
}
