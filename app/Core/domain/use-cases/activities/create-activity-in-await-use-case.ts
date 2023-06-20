import { ActivitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IActivity } from 'Types/IActivity'

export class CreateActivityInAwaitUseCase implements UseCase<IActivity, IActivity> {
	constructor(private readonly activitiesManager: ActivitiesManagerInterface) { }

	public async execute(
		activity: IActivity,
	): PromiseEither<AbstractError, IActivity> {
		const newActivityOrErr = await this.activitiesManager.createActivityInAwait(activity)

		if (newActivityOrErr.isLeft()) return left(newActivityOrErr.extract())
		const newActivity = newActivityOrErr.extract()
		return right(newActivity)
	}
}
