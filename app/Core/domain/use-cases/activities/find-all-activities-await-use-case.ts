import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ActivitiesManagerInterface } from '../../repositories/interface'
import { IActivityAwait } from 'Types/IActivity'

type ActivityAwaitParams = {
	unity_id: string
}

export class FindAllActivitiesAwaitUseCase
	implements UseCase<ActivityAwaitParams, IActivityAwait[]>
{
	constructor(private readonly activitiesManager: ActivitiesManagerInterface) { }

	public async execute({
		unity_id,
	}: ActivityAwaitParams): PromiseEither<AbstractError, IActivityAwait[]> {
		const newActivityOrErr = await this.activitiesManager.findAllActivitiesAwait(unity_id)

		if (newActivityOrErr.isLeft()) return left(newActivityOrErr.extract())
		const newActivity = newActivityOrErr.extract()
		return right(newActivity)
	}
}
