import { ActivitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'
import { UnityIdNotProvidedError } from '../../errors'
import { ActivityMongoRepository } from '../../repositories'

type Props = IActivity & {
	unity_id: string
}

@injectable()
@registry([{ token: CreateActivityUseCase, useClass: CreateActivityUseCase }])
export class CreateActivityUseCase implements UseCase<Props, IActivity> {

	constructor(
		@inject(ActivityMongoRepository) private readonly manager: ActivitiesManagerInterface
	) { } // eslint-disable-line

	public async execute({ unity_id, ...activity }: Props): PromiseEither<AbstractError, IActivity> {
		if (!unity_id) return left(new UnityIdNotProvidedError())


		return await this.manager.create(
			unity_id,
			activity,
		)
	}
}
