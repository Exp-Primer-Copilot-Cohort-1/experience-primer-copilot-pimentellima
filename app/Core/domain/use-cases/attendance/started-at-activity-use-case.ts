import { IdNotProvidedError } from 'App/Core/domain/errors/id-not-provided'
import { ActivitiesManagerAttendanceContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { IActivity } from 'App/Types/IActivity'

type Props = {
	id: string
	started_at: Date
}

export class StartedActivityUseCase implements UseCase<Props, IActivity> {
	constructor(
		private readonly manager: ActivitiesManagerAttendanceContract,
	) { } // eslint-disable-line

	public async execute({ id, started_at }: Props): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new IdNotProvidedError())

		return await this.manager.startActivity(id, started_at)
	}
}
