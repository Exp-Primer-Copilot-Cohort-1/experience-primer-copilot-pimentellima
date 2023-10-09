import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { IActivityPending } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'
import { ActivityRecurrentMongoRepository } from '../../repositories'
import { ActivitiesRecurrentManagerInterface } from '../../repositories/interface'

type Params = {
	unity_id: string
}

@injectable()
@registry([{ token: FindAllActivitiesPendingUseCase, useClass: FindAllActivitiesPendingUseCase }])
export class FindAllActivitiesPendingUseCase
	implements UseCase<Params, IActivityPending[]>
{
	constructor(
		@inject(ActivityRecurrentMongoRepository) private readonly manager: ActivitiesRecurrentManagerInterface,
	) { } // eslint-disable-line

	public async execute({
		unity_id,
	}: Params): PromiseEither<AbstractError, IActivityPending[]> {

		return await this.manager.findAll(unity_id)
	}
}
