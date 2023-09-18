import LogDecorator, { ACTION } from 'App/Core/decorators/log-decorator'
import { ActivitiesManagerAttendanceInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { AppointmentStatus } from 'App/Helpers'
import { COLLECTION_NAME } from 'App/Models/Activity'
import { IActivity } from 'App/Types/IActivity'

type Props = {
	id: string
	status: AppointmentStatus
}

export class UpdateActivityStatusByIdUseCase implements UseCase<Props, IActivity> {
	constructor(
		private readonly activitiesManager: ActivitiesManagerAttendanceInterface,
	) { } // eslint-disable-line

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	public async execute(params: Props): PromiseEither<AbstractError, IActivity> {
		const updatedActivityOrErr =
			await this.activitiesManager.updateActivityStatusById(
				params.id,
				params.status,
			)

		return updatedActivityOrErr
	}
}
