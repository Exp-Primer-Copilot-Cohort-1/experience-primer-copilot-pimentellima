import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { ScheduleMongoRepository } from 'App/Core/domain/repositories/schedule/schedule-mongo-repository'
import { GetWorkHoursUseCase } from 'App/Core/domain/use-cases/schedule/get-work-hours-use-case'

export const makeGetWorkHoursComposer = (): ControllerGeneric => {
	return new Controller(new GetWorkHoursUseCase(new ScheduleMongoRepository()))
}
