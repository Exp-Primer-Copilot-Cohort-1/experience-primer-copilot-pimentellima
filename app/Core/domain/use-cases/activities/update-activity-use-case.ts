import LogDecorator, { ACTION } from 'App/Core/decorators/log-decorator'
import { ActivitiesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { ISessionTransaction } from 'App/Core/helpers/session-transaction'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { COLLECTION_NAME } from 'App/Models/Activity'
import { ActivityValues, IActivity } from 'App/Types/IActivity'

type Props = ActivityValues & {
	id: string
}

export class UpdateActivityByIdUseCase implements UseCase<Props, IActivity> {
	constructor(
		private readonly activitiesManager: ActivitiesManagerInterface,
		private readonly session: ISessionTransaction,
	) { } // eslint-disable-line

	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	public async execute(params: Props): PromiseEither<AbstractError, IActivity> {
		try {
			await this.session.startSession()
			const updatedActivityOrErr = await this.activitiesManager.updateActivityById(
				params.id,
				params,
			)
			await this.session.commitTransaction()

			return updatedActivityOrErr
		} catch (error) {
			this.session.abortTransaction()
			return left(error)
		}
	}
}
