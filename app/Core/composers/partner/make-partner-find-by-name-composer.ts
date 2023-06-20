import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { PartnerMongooseRepository } from 'App/Core/domain/repositories'
import { FindPartnersByNameUseCase } from 'App/Core/domain/use-cases/partner/find-partners-by-name-use-case/find-partners-by-name-use-case'

export const makePartnerFindByNameComposer = (): ControllerGeneric => {
	return new Controller(new FindPartnersByNameUseCase(new PartnerMongooseRepository()))
}
