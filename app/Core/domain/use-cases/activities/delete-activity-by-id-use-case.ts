import { IdNotProvidedError } from 'App/Core/domain/errors/id-not-provided'
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
@registry([{ token: DeleteActivityByIdUseCase, useClass: DeleteActivityByIdUseCase }])
export class DeleteActivityByIdUseCase implements UseCase<In, IActivity> {
	constructor(
		@inject(ActivityMongoRepository) private readonly manager: ActivitiesManagerInterface
	) { } // eslint-disable-line

	public async execute({ id }: In): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new IdNotProvidedError())

		return await this.manager.deleteById(id)
	}
}
