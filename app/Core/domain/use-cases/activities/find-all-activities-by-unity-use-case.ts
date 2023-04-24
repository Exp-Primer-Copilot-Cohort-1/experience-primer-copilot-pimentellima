import { ActivitiesManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import Activity from "../../entities/activities/activity";

type ActivityProps = {
	unity_id: string;
};

export class FindAllActivitiesByUnityUseCase
	implements UseCase<ActivityProps, Activity[]>
{
	constructor(
		private readonly activitiesManager: ActivitiesManagerInterface
	) {}

	public async execute(
		params: ActivityProps
	): PromiseEither<AbstractError, Activity[]> {

		const activitiesOrErr =
			await this.activitiesManager.findAllActivitiesByUnityId(
				params?.unity_id
			);

		if (activitiesOrErr.isLeft()) return left(activitiesOrErr.extract());
		const activities = activitiesOrErr.extract();
		return right(activities);
	}
}
