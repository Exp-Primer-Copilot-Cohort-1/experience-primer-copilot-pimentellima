import { MissingParamsError } from 'App/Core/domain/errors/missing-params'
import { CategoriesMongooseRepository } from 'App/Core/domain/repositories'
import { CategoriesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { inject, injectable, registry } from 'tsyringe'

type Input = {
	id: string
}
@injectable()
@registry([{ token: ShowCategoriesByIdUseCase, useClass: ShowCategoriesByIdUseCase }])
export class ShowCategoriesByIdUseCase implements UseCase<Input, any> {
	constructor(@inject(CategoriesMongooseRepository) private readonly manager: CategoriesManagerInterface) { }

	public async execute(input: Input): PromiseEither<AbstractError, any> {
		if (!input?.id) {
			return left(new MissingParamsError('id'))
		}

		return await this.manager.findByID(input.id)

	}
}
