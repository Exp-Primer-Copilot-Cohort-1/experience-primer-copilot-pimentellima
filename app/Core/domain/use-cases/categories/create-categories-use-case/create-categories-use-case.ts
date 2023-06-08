import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

import { ICategory } from 'Types/ICategory'
import { CategoriesManagerInterface } from '../../../repositories/interface'

export class CreateCategoriesUseCase implements UseCase<Partial<ICategory>, ICategory> {
	constructor(private readonly categoryManager: CategoriesManagerInterface) { }

	public async execute(
		categories: Partial<ICategory>,
	): PromiseEither<AbstractError, ICategory> {
		const categoriesOrErr = await this.categoryManager.createCategory(categories)

		return categoriesOrErr
	}
}
