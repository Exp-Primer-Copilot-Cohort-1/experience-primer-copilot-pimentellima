import LogDecorator from 'App/Core/decorators/log-decorator'
import { ActivitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ActivityValues, IActivity } from 'Types/IActivity'

type Props = ActivityValues & {
	unity_id: string
}

export class CreateActivityUseCase implements UseCase<Props, IActivity> {
	constructor(private readonly activitiesManager: ActivitiesManagerInterface) { }

	@LogDecorator('activities', 'post')
	public async execute(params: Props): PromiseEither<AbstractError, IActivity> {
		const newActivityOrErr = await this.activitiesManager.createActivity(
			params.unity_id,
			params,
		)

		if (newActivityOrErr.isLeft()) return left(newActivityOrErr.extract())
		const newActivity = newActivityOrErr.extract()
		return right(newActivity)
	}
}
