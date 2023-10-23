import { ActivityMongoRepository } from 'App/Core/domain/repositories'
import { ActivitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'

type In = {
	unity_id: string
}

@injectable()
@registry([{ token: FindAllActivitiesUseCase, useClass: FindAllActivitiesUseCase }])
export class FindAllActivitiesUseCase implements UseCase<In, IActivity[]> {

	constructor(
		@inject(ActivityMongoRepository) private readonly manager: ActivitiesManagerInterface
	) { }

	public async execute({
		unity_id
	}: In): PromiseEither<AbstractError, IActivity[]> {
		return await this.manager.findAll(unity_id)
	}
}
