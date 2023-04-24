import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { HealthInsuranceMongoRepository } from 'App/Core/domain/repositories/health-insurance/health-insurance-mongo-repository'
import {
	FindAllHealthInsuranceByNameUseCase,
	FindAllHealthInsuranceByUnityUseCase,
	FindAllHealthInsuranceUseCase,
} from 'App/Core/domain/use-cases'

export const makeHealthInsuranceFindAllByUnityIdComposer = (
	opts: OptsQuery,
): ControllerGeneric => {
	const manager = new HealthInsuranceMongoRepository(opts)

	const findAllByNameUseCase = new FindAllHealthInsuranceByNameUseCase(manager)

	const findAllByUnityUseCase = new FindAllHealthInsuranceByUnityUseCase(manager)

	return new Controller(
		new FindAllHealthInsuranceUseCase(findAllByNameUseCase, findAllByUnityUseCase),
	)
}
