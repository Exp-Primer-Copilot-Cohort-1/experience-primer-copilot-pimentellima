import { Controller, ControllerInjection } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	ActivityAttendanceMongoRepository,
	ActivityMongoRepository
} from 'App/Core/domain/repositories'
import { FindAllActivitiesUseCase } from 'App/Core/domain/use-cases'
import { CreateActivityUseCase } from 'App/Core/domain/use-cases/activities/create-activity-use-case'
import { DeleteActivityByIdUseCase } from 'App/Core/domain/use-cases/activities/delete-activity-by-id-use-case'
import { FindActivitiesByClientIdUseCase } from 'App/Core/domain/use-cases/activities/find-activities-by-client-use-case'
import { FindActivitiesByProfIdUseCase } from 'App/Core/domain/use-cases/activities/find-activities-by-prof-use-case'
import { FindActivityByIdUseCase } from 'App/Core/domain/use-cases/activities/find-activity-by-id-use-case'
import { FindAllActivitiesPendingUseCase } from 'App/Core/domain/use-cases/activities/find-all-activities-pending-use-case'
import { FindDayActivitiesUseCase } from 'App/Core/domain/use-cases/activities/find-day-activities-use-case'
import { CreateRecurrentActivityUseCase } from 'App/Core/domain/use-cases/activities/recurrents'
import { UpdateActivityPaymentUseCase } from 'App/Core/domain/use-cases/activities/update-activity-payment-use-case'
import { UpdateActivityStatusByIdUseCase } from 'App/Core/domain/use-cases/activities/update-activity-status-by-use-case'
import { UpdateActivityByIdUseCase } from 'App/Core/domain/use-cases/activities/update-activity-use-case'
import { IOptsQuery } from 'App/Types/IOptsQuery'

export const makeCreateActivityComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateActivityUseCase(new ActivityMongoRepository()),
	)
}

export const makeUpdateActivityPaymentComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateActivityPaymentUseCase(new ActivityAttendanceMongoRepository()),
	)
}
export const makeCreateRecurrentActivityComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(CreateRecurrentActivityUseCase)
}

export const makeDeleteActivityByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new DeleteActivityByIdUseCase(
			new ActivityMongoRepository(),
		),
	)
}
export const makeFindActivityByClientIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindActivitiesByClientIdUseCase(
			new ActivityMongoRepository(),
		),
	)
}
export const makeFindActivityByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindActivityByIdUseCase(
			new ActivityMongoRepository(),
		),
	)
}

export const makeFindDayActivitiesComposer = (): ControllerGeneric => {
	return new Controller(
		new FindDayActivitiesUseCase(
			new ActivityMongoRepository(),
		),
	)
}

export const makeFindActivitiesByProfIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindActivitiesByProfIdUseCase(
			new ActivityMongoRepository(),
		),
	)
}
export const makeFindAllActivitiesComposer = (opts: IOptsQuery): ControllerGeneric => {
	return ControllerInjection.resolve(FindAllActivitiesUseCase, opts)
}

export const makeFindAllActivitiesPendingComposer = (opts: IOptsQuery): ControllerGeneric => {
	return ControllerInjection.resolve(FindAllActivitiesPendingUseCase, opts)
}

export const makeUpdateActivityByIdComposer = (): ControllerGeneric => {
	return ControllerInjection.resolve(UpdateActivityByIdUseCase)
}

export const makeUpdateActivityStatusComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateActivityStatusByIdUseCase(new ActivityAttendanceMongoRepository()),
	)
}
