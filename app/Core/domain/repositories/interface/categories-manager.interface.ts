import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { ICategory } from 'App/Types/ICategory'

export interface CategoriesManagerInterface {
	findById: (id: string) => PromiseEither<AbstractError, ICategory>
	findByUnityId: (unity_id: string) => PromiseEither<AbstractError, ICategory[]>
	deleteCategoriesById: (id: string) => PromiseEither<AbstractError, ICategory>
	createCategory: (data: Partial<ICategory>) => PromiseEither<AbstractError, ICategory>
	updateCategoriesById: (
		data: Partial<ICategory>,
		id: string,
	) => PromiseEither<AbstractError, ICategory>
}
