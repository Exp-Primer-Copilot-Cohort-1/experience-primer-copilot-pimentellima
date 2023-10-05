import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { CategoriesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { ICategory } from 'App/Types/ICategory'

type Input = {
	_id: string
}

export class DeleteCategoriesByIdUseCase implements UseCase<Input, ICategory> {
	constructor(private readonly manager: CategoriesManagerInterface) { } // eslint-disable-line

	public async execute({ _id }: Input): PromiseEither<AbstractError, ICategory> {
		if (!_id) {
			return left(new MissingParamsError('id'))
		}

		return await this.manager.delete(_id)
	}
}
