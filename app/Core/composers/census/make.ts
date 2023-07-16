import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CensusMongooseRepository } from 'App/Core/domain/repositories'
import { PopulationCensusByDateUseCase } from 'App/Core/domain/use-cases'

export const makeCensusByMonthByUnityIdComposer = (): ControllerGeneric => {
	return new Controller(
		new PopulationCensusByDateUseCase(new CensusMongooseRepository()),
	)
}
