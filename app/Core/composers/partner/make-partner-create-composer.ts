import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { PartnerMongooseRepository } from 'App/Core/domain/repositories'
import { CreatePartnersUseCase } from 'App/Core/domain/use-cases/partner/create-partners-use-case'

export const makePartnerCreateComposer = (): ControllerGeneric => {
	return new Controller(new CreatePartnersUseCase(new PartnerMongooseRepository()))
}
