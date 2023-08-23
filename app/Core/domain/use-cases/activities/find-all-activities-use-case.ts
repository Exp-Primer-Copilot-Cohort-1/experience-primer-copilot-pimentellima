import { ActivitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IActivity } from 'Types/IActivity'

type ActivityProps = {
	unity_id: string
}

export class FindAllActivitiesUseCase implements UseCase<ActivityProps, IActivity[]> {
	constructor(private readonly activitiesManager: ActivitiesManagerInterface) { }

	public async execute({
		unity_id,
		...rest
	}: ActivityProps): PromiseEither<AbstractError, IActivity[]> {
		const activitiesOrErr = await this.activitiesManager.findAllActivities(
			unity_id,
			rest,
		)

		if (activitiesOrErr.isLeft()) return left(activitiesOrErr.extract())
		const activities = activitiesOrErr.extract()
		return right(activities)
	}
}
