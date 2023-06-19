import { AbstractError } from "App/Core/errors/error.interface";
import { UseCase } from "App/Core/interfaces/use-case.interface";
import { PromiseEither, left, right } from "App/Core/shared";
import { IActivityAwait } from "Types/IActivityAwait";
import { ActivityAwaitManagerInterface } from "../../repositories/interface/activity-await-manager-interface";

export class FindActivityAwaitByIdUseCase
	implements UseCase<string, IActivityAwait>
{
	constructor(
		private readonly activitiesManager: ActivityAwaitManagerInterface
	) {}

	public async execute(
		id: string
	): PromiseEither<AbstractError, IActivityAwait> {
		const newActivityOrErr = await this.activitiesManager.findActivityById(
			id
		);

		if (newActivityOrErr.isLeft()) return left(newActivityOrErr.extract());
		const newActivity = newActivityOrErr.extract();
		return right(newActivity);
	}
}
