import { ActivitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'

type ActivityProps = {
	unity_id: string
	client_id: string
}

export class FindActivitiesByClientIdUseCase
	implements UseCase<ActivityProps, IActivity[]>
{
	constructor(private readonly activitiesManager: ActivitiesManagerInterface) { }

	public async execute(
		params: ActivityProps,
	): PromiseEither<AbstractError, IActivity[]> {
		const activityOrErr = await this.activitiesManager.findActivitiesByClient(
			params?.unity_id,
			params?.client_id,
		)

		if (activityOrErr.isLeft()) return left(activityOrErr.extract())
		const activities = activityOrErr.extract()
		return right(activities)
	}
}
