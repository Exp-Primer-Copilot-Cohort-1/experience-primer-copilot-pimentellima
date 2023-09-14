import LogDecorator, { ACTION } from 'App/Core/decorators/log-decorator'
import { ActivitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { COLLECTION_NAME } from 'App/Models/Activity'
import { IActivity } from 'App/Types/IActivity'

type Props = IActivity & {
	unity_id: string
}

export class CreateActivityUseCase implements UseCase<Props, IActivity> {
	constructor(private readonly activitiesManager: ActivitiesManagerInterface) { } // eslint-disable-line

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
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
