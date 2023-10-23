import { IdNotProvidedError } from 'App/Core/domain/errors'
import { ActivityMongoRepository } from 'App/Core/domain/repositories'
import { ActivitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'

type In = {
	id: string
}

@injectable()
@registry([{ token: FindActivityByIdUseCase, useClass: FindActivityByIdUseCase }])
export class FindActivityByIdUseCase implements UseCase<In, IActivity> {
	constructor(
		@inject(ActivityMongoRepository) private readonly manager: ActivitiesManagerInterface
	) { }

	public async execute({ id }: In): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new IdNotProvidedError())

		return await this.manager.find(id)
	}
}
