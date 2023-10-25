import { ActivityRecurrentMongoRepository } from 'App/Core/domain/repositories'
import { ActivitiesRecurrentManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { IActivityPending } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'

type In = {
	unity_id: string
}

@injectable()
@registry([{ token: FindAllActivitiesPendingUseCase, useClass: FindAllActivitiesPendingUseCase }])
export class FindAllActivitiesPendingUseCase
	implements UseCase<In, IActivityPending[]>
{
	constructor(
		@inject(ActivityRecurrentMongoRepository) private readonly manager: ActivitiesRecurrentManagerContract,
	) { } // eslint-disable-line

	public async execute({
		unity_id,
	}: In): PromiseEither<AbstractError, IActivityPending[]> {

		return await this.manager.findAll(unity_id)
	}
}
