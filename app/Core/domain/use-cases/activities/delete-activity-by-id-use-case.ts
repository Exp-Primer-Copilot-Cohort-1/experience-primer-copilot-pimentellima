import LogDecorator from 'App/Core/decorators/log-decorator'
import { ActivitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'

type ActivityProps = {
	id: string
}

export class DeleteActivityByIdUseCase implements UseCase<ActivityProps, IActivity> {
	constructor(private readonly activitiesManager: ActivitiesManagerInterface) { }

	@LogDecorator('activities', 'delete')
	public async execute(params: ActivityProps): PromiseEither<AbstractError, IActivity> {
		const activityOrErr = await this.activitiesManager.deleteActivityById(params?.id)

		if (activityOrErr.isLeft()) return left(activityOrErr.extract())
		const activity = activityOrErr.extract()
		return right(activity)
	}
}
