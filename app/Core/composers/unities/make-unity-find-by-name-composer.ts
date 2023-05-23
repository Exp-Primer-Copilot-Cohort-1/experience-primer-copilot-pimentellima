import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { UnitiesMongooseRepository } from 'App/Core/domain/repositories'
import { FindAllUnityByNameUseCase } from 'App/Core/domain/use-cases'

export const makeUnityFindAllByNameComposer = (): ControllerGeneric => {
	return new Controller(new FindAllUnityByNameUseCase(new UnitiesMongooseRepository()))
}
