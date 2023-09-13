import { ActivityAwaitManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IActivityAwait } from 'App/Types/IActivity'

type ActivityAwaitParams = {
	unity_id: string
}

export class FindAllActivitiesAwaitUseCase
	implements UseCase<ActivityAwaitParams, IActivityAwait[]>
{
	constructor(private readonly activitiesManager: ActivityAwaitManagerInterface) { }

	public async execute({
		unity_id,
		...rest
	}: ActivityAwaitParams): PromiseEither<AbstractError, IActivityAwait[]> {
		const newActivityOrErr = await this.activitiesManager.findAllActivities(
			unity_id,
			rest,
		)

		if (newActivityOrErr.isLeft()) return left(newActivityOrErr.extract())
		const newActivity = newActivityOrErr.extract()
		return right(newActivity)
	}
}
