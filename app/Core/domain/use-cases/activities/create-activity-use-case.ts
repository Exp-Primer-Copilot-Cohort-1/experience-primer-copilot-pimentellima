import { UnityIdNotProvidedError } from 'App/Core/domain/errors'
import { ActivityMongoRepository } from 'App/Core/domain/repositories'
import { ActivitiesManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { EventEmitter } from 'App/Core/infra/event-emitter'
import { IEventEmitter } from 'App/Core/infra/infra'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'

type Props = IActivity & {
	unity_id: string
}

@injectable()
@registry([{ token: CreateActivityUseCase, useClass: CreateActivityUseCase }])
export class CreateActivityUseCase implements UseCase<Props, IActivity> {

	constructor(
		@inject(ActivityMongoRepository) private readonly manager: ActivitiesManagerContract,
		@inject(EventEmitter) private readonly eventEmitter: IEventEmitter,
	) { } // eslint-disable-line

	public async execute({ unity_id, ...activity }: Props): PromiseEither<AbstractError, IActivity> {
		if (!unity_id) return left(new UnityIdNotProvidedError())

		const activityOrErr = await this.manager.create(
			unity_id,
			activity,
		)

		if (activityOrErr.isLeft()) return left(activityOrErr.extract())

		const activityCreated = activityOrErr.extract()

		this.eventEmitter.emit('new:appointment', activityCreated)

		return right(activityCreated)
	}
}
