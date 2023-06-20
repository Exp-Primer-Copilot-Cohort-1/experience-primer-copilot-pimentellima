import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { PartnerMongooseRepository } from 'App/Core/domain/repositories'
import { UpdatePartnersByIdUseCase } from 'App/Core/domain/use-cases/partner/partner-update-by-id-use-case/partner-update-by-id-use-case'

export const makePartnerUpdateComposer = (): ControllerGeneric => {
	return new Controller(new UpdatePartnersByIdUseCase(new PartnerMongooseRepository()))
}
