import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CategoriesMongooseRepository } from 'App/Core/domain/repositories'
import { UpdateCategoriesByIdUseCase } from 'App/Core/domain/use-cases/categories'

export const makeCategoriesUpdateByIdComposer = (): ControllerGeneric => {
	return new Controller(
		new UpdateCategoriesByIdUseCase(new CategoriesMongooseRepository()),
	)
}
