import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CategoriesMongooseRepository } from 'App/Core/domain/repositories/categories/categories-mongo-repository'
import { FindCategoriesByUnityUseCase } from 'App/Core/domain/use-cases/categories'

export const makeCategoriesFindByUnityComposer = (): ControllerGeneric => {
	return new Controller(
		new FindCategoriesByUnityUseCase(new CategoriesMongooseRepository()),
	)
}
