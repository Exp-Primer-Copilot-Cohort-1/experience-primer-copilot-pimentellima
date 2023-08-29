import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CensusMongooseRepository } from 'App/Core/domain/repositories'
import { FindActivitiesOfProfByProfByUnityUseCase } from 'App/Core/domain/use-cases'

export const makeCensusActivitiesProfByProfComposer = (): ControllerGeneric => {
	return new Controller(
		new FindActivitiesOfProfByProfByUnityUseCase(new CensusMongooseRepository()),
	)
}
