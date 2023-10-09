import { CategoriesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { ICategory } from 'App/Types/ICategory'
import { inject, injectable, registry } from 'tsyringe'
import { UnitNotFoundError } from '../../errors'
import { CategoriesMongooseRepository } from '../../repositories'

type FindAllProps = {
	unity_id: string
}
@injectable()
@registry([{ token: FindCategoriesByUnityUseCase, useClass: FindCategoriesByUnityUseCase }])
export class FindCategoriesByUnityUseCase implements UseCase<FindAllProps, ICategory[]> {
	constructor(@inject(CategoriesMongooseRepository) private readonly manager: CategoriesManagerInterface) { }

	public async execute({ unity_id }: FindAllProps): PromiseEither<AbstractError, ICategory[]> {
		if (!unity_id) {
			return left(new UnitNotFoundError())
		}

		return await this.manager.findAll(unity_id)
	}
}
