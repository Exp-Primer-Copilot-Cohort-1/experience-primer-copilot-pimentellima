import { ActivitiesManagerInterface } from "App/Core/domain/repositories/interface";
import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { ActivityValues, IActivityAwait } from "Types/IActivity";

type Props = ActivityValues & {
	unity_id: string;
};

export class CreateActivityAwaitUseCase implements UseCase<Props, IActivityAwait> {
	constructor(
		private readonly activitiesManager: ActivitiesManagerInterface
	) {}

	public async execute(
		params: Props
	): PromiseEither<AbstractError, IActivityAwait> {
		const newActivityOrErr =
			await this.activitiesManager.createActivityAwait(
				params.unity_id,
				params
			);

		if (newActivityOrErr.isLeft()) return left(newActivityOrErr.extract());
		const newActivity = newActivityOrErr.extract();
		return right(newActivity);
	}
}
