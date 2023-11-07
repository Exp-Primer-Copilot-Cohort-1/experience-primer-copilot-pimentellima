import { ActivityMongoRepository } from 'App/Core/domain/repositories'
import { ActivitiesManagerContract } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { ActivityValues, IActivity, STATUS_ACTIVITY } from 'App/Types/IActivity'
import { inject, injectable, registry } from 'tsyringe'
import ActivityEntity from '../../entities/activities/activity'
import { IdNotProvidedError } from '../../errors'
import { MarkedActivityAwaitUseCase } from '../activities-awaits'
import { IMarkedActivityAwaitUseCase } from '../activities-awaits/use-cases.interface'

type Props = ActivityValues & {
	id: string
}

@injectable()
@registry([{ token: UpdateActivityByIdUseCase, useClass: UpdateActivityByIdUseCase }])
export class UpdateActivityByIdUseCase implements UseCase<Props, IActivity> {
	constructor(
		@inject(ActivityMongoRepository)
		private readonly manager: ActivitiesManagerContract,
		@inject(MarkedActivityAwaitUseCase)
		private readonly marked: IMarkedActivityAwaitUseCase,
	) {} // eslint-disable-line

	public async execute({
		id,
		...values
	}: Props): PromiseEither<AbstractError, IActivity> {
		if (!id) return left(new IdNotProvidedError())

		const activityOrErr = await this.manager.find(id)

		if (activityOrErr.isLeft()) return activityOrErr

		const activity = activityOrErr.extract()

		if (
			activity.type === STATUS_ACTIVITY.AWAIT ||
			activity.type === STATUS_ACTIVITY.PENDING
		) {
			return await this.marked.execute({ ...values, id })
		}

		const entityOrErr = await ActivityEntity.build(activity)

		if (entityOrErr.isLeft()) return left(entityOrErr.extract())

		const entity = entityOrErr.extract().update(values)

		return await this.manager.updateById(id, entity)
	}
}
