import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { HealthInsuranceMongoRepository } from 'App/Core/domain/repositories'
import {
	CreateHealthInsuranceUseCase,
	FindAllHealthInsuranceByNameUseCase,
	FindAllHealthInsuranceByUnityUseCase,
	FindAllHealthInsuranceUseCase,
	FindHealthInsuranceByIdUseCase,
	UpdateHealthInsuranceUseCase,
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

export const makeHealthInsuranceUpdateComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateHealthInsuranceUseCase(new HealthInsuranceMongoRepository()),
	)
}

export const makeHealthInsuranceCreateComposer = (): ControllerGeneric => {
	return new Controller(
		new CreateHealthInsuranceUseCase(new HealthInsuranceMongoRepository()),
	)
}
