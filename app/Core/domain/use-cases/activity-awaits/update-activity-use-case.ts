import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { IActivityAwait } from "Types/IActivityAwait";
import { ActivityAwaitManagerInterface } from "../../repositories/interface/activity-await-manager-interface";

type Props = {
	id: string;
	activity: IActivityAwait;
};

export class UpdateActivityAwaitUseCase implements UseCase<Props, IActivityAwait> {
	constructor(
		private readonly activitiesManager: ActivityAwaitManagerInterface
	) {}

	public async execute(
		params: Props
	): PromiseEither<AbstractError, IActivityAwait> {
		const newActivityOrErr =
			await this.activitiesManager.updateActivityById(
				params.id,
				params.activity
			);

		if (newActivityOrErr.isLeft()) return left(newActivityOrErr.extract());
		const newActivity = newActivityOrErr.extract();
		return right(newActivity);
	}
}
