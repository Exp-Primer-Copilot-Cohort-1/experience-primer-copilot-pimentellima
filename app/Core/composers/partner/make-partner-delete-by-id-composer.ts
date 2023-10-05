import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { PartnerMongooseRepository } from 'App/Core/domain/repositories'
import { DeletePartnerByIdUseCase } from 'App/Core/domain/use-cases/partner'

export const makePartnerDeleteByIdComposer = (): ControllerGeneric => {
	return new Controller(new DeletePartnerByIdUseCase(new PartnerMongooseRepository()))
}
