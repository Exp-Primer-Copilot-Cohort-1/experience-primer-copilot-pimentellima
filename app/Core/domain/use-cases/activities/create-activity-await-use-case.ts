import LogDecorator, { ACTION } from 'App/Core/decorators/log-decorator'
import { ActivityAwaitManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { COLLECTION_NAME } from 'App/Models/Activity'
import { IActivityAwait } from 'App/Types/IActivity'

export class CreateActivityAwaitUseCase
	implements UseCase<IActivityAwait, IActivityAwait>
{
	constructor(private readonly activitiesManager: ActivityAwaitManagerInterface) { } // eslint-disable-line

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	public async execute(
		params: IActivityAwait,
	): PromiseEither<AbstractError, IActivityAwait> {
		const newActivityOrErr = await this.activitiesManager.createActivity(
			params.unity_id?.toString(),
			params,
		)

		if (newActivityOrErr.isLeft()) return left(newActivityOrErr.extract())
		const newActivity = newActivityOrErr.extract()
		return right(newActivity)
	}
}
