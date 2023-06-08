import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { CategoriesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'

type Input = {
	id: string
}

export class ShowCategoriesByIdUseCase implements UseCase<Input, any> {
	constructor(private readonly categoryManager: CategoriesManagerInterface) { }

	public async execute(input: Input): PromiseEither<AbstractError, any> {
		if (!input?.id) {
			return left(new MissingParamsError('id'))
		}

		const categoriesOrErr = await this.categoryManager.findById(input.id)

		if (categoriesOrErr.isLeft()) {
			return left(categoriesOrErr.extract())
		}

		return categoriesOrErr
	}
}
