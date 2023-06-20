import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { CategoriesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { ICategory } from 'Types/ICategory'

type Input = {
	id: string
}

export class DeleteCategoriesByIdUseCase implements UseCase<Input, ICategory> {
	constructor(private readonly categoriesManager: CategoriesManagerInterface) { }

	public async execute(input: Input): PromiseEither<AbstractError, ICategory> {
		if (!input?.id) {
			return left(new MissingParamsError('id'))
		}

		const categoriesOrErr = await this.categoriesManager.deleteCategoriesById(
			input.id,
		)

		return categoriesOrErr
	}
}
