import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CategoriesMongooseRepository } from 'App/Core/domain/repositories'
import { ShowCategoriesByIdUseCase } from 'App/Core/domain/use-cases/categories'

export const makeCategoriesShowByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new ShowCategoriesByIdUseCase(new CategoriesMongooseRepository()),
	)
}
