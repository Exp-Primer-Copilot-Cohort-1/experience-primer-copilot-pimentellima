import { Controller } from 'App/Core/adapters/controller'
import { ControllerGeneric } from 'App/Core/adapters/controller/helpers'
import { CategoriesMongooseRepository } from 'App/Core/domain/repositories'
import { CreateCategoriesUseCase } from 'App/Core/domain/use-cases/categories'

export const makeCategoriesCreateComposer = (): ControllerGeneric => {
	return new Controller(new CreateCategoriesUseCase(new CategoriesMongooseRepository()))
}
