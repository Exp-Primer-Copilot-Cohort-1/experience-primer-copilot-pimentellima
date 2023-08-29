import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CensusRevenuesMongooseRepository } from 'App/Core/domain/repositories'
import { FindRevenuesActivitiesUseCase } from 'App/Core/domain/use-cases'

export const makeCensusRevenuesActivitiesComposer = (): ControllerGeneric => {
	return new Controller(
		new FindRevenuesActivitiesUseCase(new CensusRevenuesMongooseRepository()),
	)
}
