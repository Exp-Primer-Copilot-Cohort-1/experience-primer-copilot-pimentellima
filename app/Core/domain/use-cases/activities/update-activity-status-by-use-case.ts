import { ActivityAttendanceMongoRepository } from 'App/Core/domain/repositories'
import { ActivitiesManagerAttendanceInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'
import { AppointmentStatus } from 'App/Helpers'
import { IActivity } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'

type Props = {
	id: string
	status: AppointmentStatus
}
@injectable()
@registry([{ token: UpdateActivityStatusByIdUseCase, useClass: UpdateActivityStatusByIdUseCase }])
export class UpdateActivityStatusByIdUseCase implements UseCase<Props, IActivity> {

	constructor(
		@inject(ActivityAttendanceMongoRepository)
		private readonly manager: ActivitiesManagerAttendanceInterface,
	) { } // eslint-disable-line

	public async execute({ id, status }: Props): PromiseEither<AbstractError, IActivity> {
		return await this.manager.updateStatusById(
			id,
			status,
		)
	}
}
