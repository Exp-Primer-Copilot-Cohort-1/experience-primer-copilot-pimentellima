import { ActivitiesRecurrentManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IActivity, RecurrentActivityValues } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'
import { UnityIdNotProvidedError } from '../../errors/unit-not-id-provider'
import { ActivityRecurrentMongoRepository } from '../../repositories'

type Props = RecurrentActivityValues & {
	unity_id: string
}

@injectable()
@registry([{ token: CreateRecurrentActivityUseCase, useClass: CreateRecurrentActivityUseCase }])
export class CreateRecurrentActivityUseCase implements UseCase<Props, IActivity[]> {
	constructor(
		@inject(ActivityRecurrentMongoRepository) private readonly manager: ActivitiesRecurrentManagerInterface,
	) { } // eslint-disable-line

	public async execute({ unity_id, ...activity }: Props): PromiseEither<AbstractError, IActivity[]> {
		if (!unity_id) return left(new UnityIdNotProvidedError())


		return await this.manager.create(
			unity_id,
			activity,
		)
	}
}
