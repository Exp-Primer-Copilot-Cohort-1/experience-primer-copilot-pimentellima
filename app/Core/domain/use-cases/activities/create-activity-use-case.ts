import { ActivitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'

type Props = IActivity & {
	unity_id: string
}

export class CreateActivityUseCase implements UseCase<Props, IActivity> {
	constructor(private readonly activitiesManager: ActivitiesManagerInterface) { } // eslint-disable-line

	public async execute(params: Props): PromiseEither<AbstractError, IActivity> {
		const newActivityOrErr = await this.activitiesManager.create(
			params.unity_id,
			params,
		)

		return newActivityOrErr
	}
}
