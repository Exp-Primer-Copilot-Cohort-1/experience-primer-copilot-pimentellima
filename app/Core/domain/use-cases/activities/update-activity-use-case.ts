import LogDecorator, { ACTION } from 'App/Core/decorators/log-decorator'
import { ActivitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { COLLECTION_NAME } from 'App/Models/Activity'
import { ActivityValues, IActivity } from 'App/Types/IActivity'

type Props = ActivityValues & {
	id: string
}

export class UpdateActivityByIdUseCase implements UseCase<Props, IActivity> {
	constructor(private readonly activitiesManager: ActivitiesManagerInterface) { } // eslint-disable-line

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	public async execute(params: Props): PromiseEither<AbstractError, IActivity> {
		const updatedActivityOrErr = await this.activitiesManager.updateActivityById(
			params.id,
			params,
		)

		if (updatedActivityOrErr.isLeft()) return left(updatedActivityOrErr.extract())
		return right(updatedActivityOrErr.extract())
	}
}
