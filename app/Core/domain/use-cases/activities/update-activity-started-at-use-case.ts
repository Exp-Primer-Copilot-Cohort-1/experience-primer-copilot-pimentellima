import { ActivitiesManagerAttendanceInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'

type Props = {
	id: string
	started_at: Date
}

export class UpdateActivityStartedAtUseCase implements UseCase<Props, IActivity> {
	constructor(
		private readonly activitiesManager: ActivitiesManagerAttendanceInterface,
	) { } // eslint-disable-line

	public async execute(params: Props): PromiseEither<AbstractError, IActivity> {
		const updatedActivityOrErr = await this.activitiesManager.updateActivityStartedAt(
			params.id,
			params.started_at,
		)

		if (updatedActivityOrErr.isLeft()) return left(updatedActivityOrErr.extract())
		return right(updatedActivityOrErr.extract())
	}
}
