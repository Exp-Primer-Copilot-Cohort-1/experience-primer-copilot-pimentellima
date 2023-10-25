import { IdNotProvidedError, UnityIdNotProvidedError } from 'App/Core/domain/errors'
import { ActivityMongoRepository } from 'App/Core/domain/repositories'
import { ActivitiesManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'

type In = {
	unity_id: string
	client_id: string
}

@injectable()
@registry([{ token: FindActivitiesByClientIdUseCase, useClass: FindActivitiesByClientIdUseCase }])
export class FindActivitiesByClientIdUseCase
	implements UseCase<In, IActivity[]>
{
	constructor(
		@inject(ActivityMongoRepository) private readonly manager: ActivitiesManagerContract
	) { }

	public async execute(
		{ client_id, unity_id }: In,
	): PromiseEither<AbstractError, IActivity[]> {

		if (!unity_id) return left(new UnityIdNotProvidedError())
		if (!client_id) return left(new IdNotProvidedError())

		return await this.manager.findByClient(
			unity_id,
			client_id,
		)
	}
}
