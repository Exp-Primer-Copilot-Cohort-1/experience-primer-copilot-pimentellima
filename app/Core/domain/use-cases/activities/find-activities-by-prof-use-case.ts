import { ActivitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'
import { IdNotProvidedError, UnityIdNotProvidedError } from '../../errors'
import { ActivityMongoRepository } from '../../repositories'

type In = {
	unity_id: string
	prof_id: string
}
@injectable()
@registry([{ token: FindActivitiesByProfIdUseCase, useClass: FindActivitiesByProfIdUseCase }])
export class FindActivitiesByProfIdUseCase
	implements UseCase<In, IActivity[]>
{
	constructor(
		@inject(ActivityMongoRepository) private readonly manager: ActivitiesManagerInterface
	) { }

	public async execute(
		{ prof_id, unity_id }: In,
	): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new UnityIdNotProvidedError())
		if (!prof_id) return left(new IdNotProvidedError())

		return await this.manager.findByProf(
			unity_id,
			prof_id,
		)
	}
}
