import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { PartnerMongooseRepository } from 'App/Core/domain/repositories'
import { FindPartnersByUnityUseCase } from 'App/Core/domain/use-cases/partner'

export const makePartnerFindByUnityComposer = (opts: OptsQuery): ControllerGeneric => {
	return new Controller(
		new FindPartnersByUnityUseCase(new PartnerMongooseRepository(opts)),
	)
}
