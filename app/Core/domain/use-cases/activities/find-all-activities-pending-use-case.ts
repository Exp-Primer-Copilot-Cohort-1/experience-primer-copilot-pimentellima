import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IActivityPending } from 'App/Types/IActivity'
import { ActivitiesRecurrentManagerInterface } from '../../repositories/interface'

type Params = {
	unity_id: string
}

export class FindAllActivitiesPendingUseCase
	implements UseCase<Params, IActivityPending[]>
{
	constructor(
		private readonly activitiesManager: ActivitiesRecurrentManagerInterface,
	) { } // eslint-disable-line

	public async execute({
		unity_id,
		...rest
	}: Params): PromiseEither<AbstractError, IActivityPending[]> {
		const activitiesOrErr = await this.activitiesManager.findAllActivitiesPending(
			unity_id,
			rest,
		)

		if (activitiesOrErr.isLeft()) return left(activitiesOrErr.extract())
		const newActivity = activitiesOrErr.extract()
		return right(newActivity)
	}
}
