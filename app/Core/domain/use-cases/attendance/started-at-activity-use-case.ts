import { IdNotProvidedError } from 'App/Core/domain/errors/id-not-provided'
import { ActivitiesManagerAttendanceContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'
import { ActivityAttendanceMongoRepository } from '../../repositories'

type Props = {
	id: string
	started_at: Date
}

@injectable()
@registry([{ token: StartedActivityUseCase, useClass: StartedActivityUseCase }])
export class StartedActivityUseCase implements UseCase<Props, IActivity> {
	constructor(
		@inject(ActivityAttendanceMongoRepository)
		private readonly attendance: ActivitiesManagerAttendanceContract,
	) { } // eslint-disable-line

	public async execute({ id, started_at }: Props): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new IdNotProvidedError())

		return await this.attendance.startActivity(id, started_at)
	}
}
