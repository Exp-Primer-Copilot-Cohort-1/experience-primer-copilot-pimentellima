import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ActivitiesManagerInterface } from '../../repositories/interface'
import { IActivityPending } from 'Types/IActivity'

type Params = {
	unity_id: string
}

export class FindAllActivitiesPendingUseCase
	implements UseCase<Params, IActivityPending[]>
{
	constructor(private readonly activitiesManager: ActivitiesManagerInterface) { }

	public async execute({
		unity_id,
	}: Params): PromiseEither<AbstractError, IActivityPending[]> {
		const activitiesOrErr = await this.activitiesManager.findAllActivitiesPending(unity_id)

		if (activitiesOrErr.isLeft()) return left(activitiesOrErr.extract())
		const newActivity = activitiesOrErr.extract()
		return right(newActivity)
	}
}
