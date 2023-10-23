import ActivityAwaitEntity from 'App/Core/domain/entities/activity-await/activity-await'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { ActivityAwaitMongoRepository } from 'App/Core/domain/repositories'
import { ActivityAwaitManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IActivityAwait } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'

@injectable()
@registry([{ token: CreateActivityAwaitUseCase, useClass: CreateActivityAwaitUseCase }])
export class CreateActivityAwaitUseCase
	implements UseCase<IActivityAwait, IActivityAwait>
{
	constructor(
		@inject(ActivityAwaitMongoRepository)
		private readonly manager: ActivityAwaitManagerContract,
		@inject(OptsQuery) private readonly opts: OptsQuery
	) { } // eslint-disable-line

	public async execute(
		data: IActivityAwait,
	): PromiseEither<AbstractError, IActivityAwait> {
		const activityOrErr = await ActivityAwaitEntity.build({
			...data,
			unity_id: this.opts.unity_id.toString(),
		})

		if (activityOrErr.isLeft()) return left(activityOrErr.extract())

		const activity = activityOrErr.extract()

		const activityAwaitOrErr = await this.manager.create(activity)

		return activityAwaitOrErr
	}
}
