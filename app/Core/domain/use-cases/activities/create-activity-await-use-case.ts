import { ActivityAwaitManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { IActivityAwait } from 'App/Types/IActivity'

export class CreateActivityAwaitUseCase
	implements UseCase<IActivityAwait, IActivityAwait>
{
	constructor(private readonly activitiesManager: ActivityAwaitManagerInterface) { } // eslint-disable-line

	public async execute(
		params: IActivityAwait,
	): PromiseEither<AbstractError, IActivityAwait> {
		const newActivityOrErr = await this.activitiesManager.createActivity(
			params.unity_id?.toString(),
			params,
		)

		return newActivityOrErr
	}
}
