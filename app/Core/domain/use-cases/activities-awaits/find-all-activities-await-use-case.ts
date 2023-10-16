import { ActivityAwaitManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { IActivityAwait } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'
import { ActivityAwaitMongoRepository } from '../../repositories'

type In = never

@injectable()
@registry([{ token: FindAllActivitiesAwaitUseCase, useClass: FindAllActivitiesAwaitUseCase }])
export class FindAllActivitiesAwaitUseCase
	implements UseCase<In, IActivityAwait[]>
{
	constructor(
		@inject(ActivityAwaitMongoRepository)
		private readonly manager: ActivityAwaitManagerInterface
	) { }

	public async execute(): PromiseEither<AbstractError, IActivityAwait[]> {

		return await this.manager.findAll()
	}
}
