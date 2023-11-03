import { ActivityAwaitMongoRepository } from 'App/Core/domain/repositories'
import { ActivityAwaitManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'
import { IActivityExt, IMarkedActivityAwaitUseCase } from './use-cases.interface'



@injectable()
@registry([{ token: MarkedActivityAwaitUseCase, useClass: MarkedActivityAwaitUseCase }])
export class MarkedActivityAwaitUseCase implements IMarkedActivityAwaitUseCase {
	constructor(
		@inject(ActivityAwaitMongoRepository) private readonly manager: ActivityAwaitManagerContract,
	) { } // eslint-disable-line

	public async execute(params: IActivityExt): PromiseEither<AbstractError, IActivity> {
		return await this.manager.marked(
			params.id,
			params,
		)
	}
}
