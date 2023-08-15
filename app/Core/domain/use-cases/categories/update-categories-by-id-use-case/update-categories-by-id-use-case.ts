import LogDecorator from 'App/Core/decorators/log-decorator'
import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { CategoriesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { ICategory } from 'Types/ICategory'

export class UpdateCategoriesByIdUseCase
	implements UseCase<Partial<ICategory>, ICategory>
{
	constructor(private readonly categoriesManager: CategoriesManagerInterface) { }

	@LogDecorator('categories', 'put')
	public async execute(
		category: Partial<ICategory>,
	): PromiseEither<AbstractError, ICategory> {
		if (!category?._id) {
			return left(new MissingParamsError('_id is required'))
		}
		const categoriesOrErr = await this.categoriesManager.updateCategoriesById(
			category._id.toString(),
			category,
		)

		if (categoriesOrErr.isLeft()) {
			return left(categoriesOrErr.extract())
		}

		return categoriesOrErr
	}
}
