import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import {
	ActivityAttendanceMongoRepository,
	ActivityAwaitMongoRepository,
	ActivityMongoRepository,
	ActivityRecurrentMongoRepository,
} from 'App/Core/domain/repositories'
import { FindAllActivitiesUseCase } from 'App/Core/domain/use-cases'
import { CreateActivityAwaitUseCase } from 'App/Core/domain/use-cases/activities/create-activity-await-use-case'
import { CreateActivityUseCase } from 'App/Core/domain/use-cases/activities/create-activity-use-case'
import { CreateRecurrentActivityUseCase } from 'App/Core/domain/use-cases/activities/create-recurrent-activity-use-case'
import { DeleteActivityByIdUseCase } from 'App/Core/domain/use-cases/activities/delete-activity-by-id-use-case'
import { FindActivitiesByClientIdUseCase } from 'App/Core/domain/use-cases/activities/find-activities-by-client-use-case'
import { FindActivitiesByProfIdUseCase } from 'App/Core/domain/use-cases/activities/find-activities-by-prof-use-case'
import { FindActivityByIdUseCase } from 'App/Core/domain/use-cases/activities/find-activity-by-id-use-case'
import { FindAllActivitiesAwaitUseCase } from 'App/Core/domain/use-cases/activities/find-all-activities-await-use-case'
import { FindAllActivitiesPendingUseCase } from 'App/Core/domain/use-cases/activities/find-all-activities-pending-use-case'
import { FindDayActivitiesUseCase } from 'App/Core/domain/use-cases/activities/find-day-activities-use-case'
import { UpdateActivityFinishedAtUseCase } from 'App/Core/domain/use-cases/activities/update-activity-finished-at-use-case'
import { UpdateActivityPaymentUseCase } from 'App/Core/domain/use-cases/activities/update-activity-payment-use-case'
import { UpdateActivityStartedAtUseCase } from 'App/Core/domain/use-cases/activities/update-activity-started-at-use-case'
import { UpdateActivityStatusByIdUseCase } from 'App/Core/domain/use-cases/activities/update-activity-status-by-use-case'
import { UpdateActivityByIdUseCase } from 'App/Core/domain/use-cases/activities/update-activity-use-case'
import { SessionTransaction } from 'App/Core/helpers/session-transaction'

export const makeCreateActivityComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateActivityUseCase(new ActivityMongoRepository(new SessionTransaction())),
	)
}

export const makeCreateActivityAwaitComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateActivityAwaitUseCase(new ActivityAwaitMongoRepository()),
	)
}

export const makeUpdateActivityPaymentComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateActivityPaymentUseCase(new ActivityAttendanceMongoRepository()),
	)
}
export const makeCreateRecurrentActivityComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateRecurrentActivityUseCase(new ActivityRecurrentMongoRepository()),
	)
}
export const makeDeleteActivityByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new DeleteActivityByIdUseCase(
			new ActivityMongoRepository(new SessionTransaction()),
		),
	)
}
export const makeFindActivityByClientIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindActivitiesByClientIdUseCase(
			new ActivityMongoRepository(new SessionTransaction()),
		),
	)
}
export const makeFindActivityByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindActivityByIdUseCase(
			new ActivityMongoRepository(new SessionTransaction()),
		),
	)
}

export const makeFindDayActivitiesComposer = (): ControllerGeneric => {
	return new Controller(
		new FindDayActivitiesUseCase(
			new ActivityMongoRepository(new SessionTransaction()),
		),
	)
}

export const makeFindActivitiesByProfIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindActivitiesByProfIdUseCase(
			new ActivityMongoRepository(new SessionTransaction()),
		),
	)
}
export const makeFindAllActivitiesComposer = (): ControllerGeneric => {
	return new Controller(new FindAllActivitiesUseCase(new ActivityMongoRepository()))
}

export const makeFindAllActivitiesAwaitComposer = (): ControllerGeneric => {
	return new Controller(
		new FindAllActivitiesAwaitUseCase(new ActivityAwaitMongoRepository()),
	)
}

export const makeFindAllActivitiesPendingComposer = (): ControllerGeneric => {
	return new Controller(
		new FindAllActivitiesPendingUseCase(new ActivityRecurrentMongoRepository()),
	)
}

export const makeUpdateActivityByIdComposer = (): ControllerGeneric => {
	const session = new SessionTransaction()
	return new Controller(
		new UpdateActivityByIdUseCase(new ActivityMongoRepository(session), session),
	)
}

export const makeUpdateActivityStatusComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateActivityStatusByIdUseCase(new ActivityAttendanceMongoRepository()),
	)
}

export const makeUpdateActivityStartedAtComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateActivityStartedAtUseCase(new ActivityAttendanceMongoRepository()),
	)
}

export const makeUpdateActivityFinishedAtComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateActivityFinishedAtUseCase(
			new ActivityAttendanceMongoRepository(),
			new ActivityMongoRepository(new SessionTransaction()),
		),
	)
}
