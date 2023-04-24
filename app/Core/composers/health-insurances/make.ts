import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { HealthInsuranceMongoRepository } from 'App/Core/domain/repositories'
import {
	FindAllHealthInsuranceByNameUseCase,
	FindAllHealthInsuranceByUnityUseCase,
	FindAllHealthInsuranceUseCase,
	FindHealthInsuranceByIdUseCase,
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

export const makeHealthInsuranceFindByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new FindHealthInsuranceByIdUseCase(new HealthInsuranceMongoRepository()),
	)
}
