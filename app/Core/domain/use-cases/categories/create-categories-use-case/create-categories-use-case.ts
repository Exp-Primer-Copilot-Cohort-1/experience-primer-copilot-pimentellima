import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, right } from 'App/Core/shared'

import LogDecorator from 'App/Core/decorators/log-decorator'
import { ICategory } from 'App/Types/ICategory'
import { CategoriesManagerInterface } from '../../../repositories/interface'

export class CreateCategoriesUseCase implements UseCase<Partial<ICategory>, ICategory> {
	constructor(private readonly categoryManager: CategoriesManagerInterface) { }

	@LogDecorator('categories', 'post')
	public async execute(
		categories: Partial<ICategory>,
	): PromiseEither<AbstractError, ICategory> {
		const categoriesOrErr = await this.categoryManager.createCategory(categories)

		if (categoriesOrErr.isLeft()) {
			return categoriesOrErr
		}

		return right(categoriesOrErr.extract())
	}
}
