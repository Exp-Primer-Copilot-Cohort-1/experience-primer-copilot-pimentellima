import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IActivityAwait } from 'Types/IActivityAwait'
import { ActivityAwaitManagerInterface } from '../../repositories/interface/activity-await-manager-interface'

export class CreateActivityAwaitUseCase implements UseCase<IActivityAwait, IActivityAwait> {
	constructor(private readonly activitiesManager: ActivityAwaitManagerInterface) { }

	public async execute(
		activity: IActivityAwait,
	): PromiseEither<AbstractError, IActivityAwait> {
		const newActivityOrErr = await this.activitiesManager.createActivity(activity)

		if (newActivityOrErr.isLeft()) return left(newActivityOrErr.extract())
		const newActivity = newActivityOrErr.extract()
		return right(newActivity)
	}
}
