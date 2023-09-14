import LogDecorator, { ACTION } from 'App/Core/decorators/log-decorator'
import { ActivitiesRecurrentManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { COLLECTION_NAME } from 'App/Models/Activity'
import { IActivity, RecurrentActivityValues } from 'App/Types/IActivity'

type Props = RecurrentActivityValues & {
	unity_id: string
}

export class CreateRecurrentActivityUseCase implements UseCase<Props, IActivity[]> {
	constructor(
		private readonly activitiesManager: ActivitiesRecurrentManagerInterface,
	) { } // eslint-disable-line

	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	public async execute(params: Props): PromiseEither<AbstractError, IActivity[]> {
		const activitiesOrErr = await this.activitiesManager.createRecurrentActivity(
			params.unity_id,
			params,
		)

		if (activitiesOrErr.isLeft()) return left(activitiesOrErr.extract())
		return right(activitiesOrErr.extract())
	}
}
