import { CategoriesManagerInterface } from 'App/Core/domain/repositories/interface'
import { AbstractError } from 'App/Core/errors/error.interface'
import { UseCase } from 'App/Core/interfaces/use-case.interface'
import { PromiseEither, left } from 'App/Core/shared'
import { ICategory } from 'App/Types/ICategory'
import { MissingParamsError } from '../../../errors/missing-params'

type FindAllProps = {
	unity_id: string
}

export class FindCategoriesByUnityUseCase implements UseCase<FindAllProps, ICategory[]> {
	constructor(private readonly categoriesManager: CategoriesManagerInterface) { }

	public async execute(input: FindAllProps): PromiseEither<AbstractError, ICategory[]> {
		if (!input?.unity_id) {
			return left(new MissingParamsError('unity_id'))
		}
		const categoriesOrErr = await this.categoriesManager.findByUnityId(input.unity_id)
		if (categoriesOrErr.isLeft()) {
			return left(categoriesOrErr.extract())
		}
		return categoriesOrErr
	}
}
