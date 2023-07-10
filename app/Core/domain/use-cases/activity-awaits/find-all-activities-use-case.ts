import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IActivityAwait } from 'Types/IActivityAwait'
import { ActivityAwaitManagerInterface } from '../../repositories/interface/activity-await-manager-interface'

type ActivityAwaitParams = {
	unity_id: string
}

export class FindAllActivityAwaitUseCase
	implements UseCase<ActivityAwaitParams, IActivityAwait[]>
{
	constructor(private readonly activitiesManager: ActivityAwaitManagerInterface) { }

	public async execute({
		unity_id,
	}: ActivityAwaitParams): PromiseEither<AbstractError, IActivityAwait[]> {
		const newActivityOrErr = await this.activitiesManager.findAllActivities(unity_id)

		if (newActivityOrErr.isLeft()) return left(newActivityOrErr.extract())
		const newActivity = newActivityOrErr.extract()
		return right(newActivity)
	}
}
