import { ActivityAwaitManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { IActivityAwait } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'
import { ActivityAwaitMongoRepository } from '../../repositories'

@injectable()
@registry([{ token: CreateActivityAwaitUseCase, useClass: CreateActivityAwaitUseCase }])
export class CreateActivityAwaitUseCase
	implements UseCase<IActivityAwait, IActivityAwait>
{
	constructor(
		@inject(ActivityAwaitMongoRepository)
		private readonly manager: ActivityAwaitManagerInterface
	) { } // eslint-disable-line

	public async execute(
		params: IActivityAwait,
	): PromiseEither<AbstractError, IActivityAwait> {
		const newActivityOrErr = await this.manager.create(
			params.unity_id?.toString(),
			params,
		)

		return newActivityOrErr
	}
}
