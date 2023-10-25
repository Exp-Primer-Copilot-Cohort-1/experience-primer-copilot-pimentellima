import { ActivityMongoRepository } from 'App/Core/domain/repositories'
import { ActivitiesManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { ActivityValues, IActivity } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'

type Props = ActivityValues & {
	id: string
}

@injectable()
@registry([{ token: UpdateActivityByIdUseCase, useClass: UpdateActivityByIdUseCase }])
export class UpdateActivityByIdUseCase implements UseCase<Props, IActivity> {
	constructor(
		@inject(ActivityMongoRepository) private readonly manager: ActivitiesManagerContract,
	) { } // eslint-disable-line

	public async execute(params: Props): PromiseEither<AbstractError, IActivity> {
		return await this.manager.updateById(
			params.id,
			params,
		)
	}
}
