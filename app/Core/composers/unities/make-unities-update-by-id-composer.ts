import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { UnitiesMongooseRepository } from 'App/Core/domain/repositories'
import { UpdateUnitiesByIdUseCase } from 'App/Core/domain/use-cases/unities/update-unities-by-id-use-case'

export const makeUnityUpdateByIdComposer = (): ControllerGeneric => {
    return new Controller(new UpdateUnitiesByIdUseCase(new UnitiesMongooseRepository()))
}
