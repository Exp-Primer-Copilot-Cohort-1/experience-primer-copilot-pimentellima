import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither } from 'App/Core/shared'

import { CategoriesMongooseRepository } from 'App/Core/domain/repositories'
import { CategoriesManagerInterface } from 'App/Core/domain/repositories/interface'
import { ICategory } from 'App/Types/ICategory'
import { inject, injectable, registry } from 'tsyringe'
@injectable()
@registry([{ token: CreateCategoriesUseCase, useClass: CreateCategoriesUseCase }])

export class CreateCategoriesUseCase implements UseCase<Partial<ICategory>, ICategory> {
	constructor(@inject(CategoriesMongooseRepository) private readonly manager: CategoriesManagerInterface) { } // eslint-disable-line

	public async execute(
		categories: Partial<ICategory>,
	): PromiseEither<AbstractError, ICategory> {


		return await this.manager.create(categories)
	}
}
