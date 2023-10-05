import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { ICategory } from 'App/Types/ICategory'

export interface CategoriesManagerInterface {
	findByID: (id: string) => PromiseEither<AbstractError, ICategory>
	findAll: (unity_id: string) => PromiseEither<AbstractError, ICategory[]>
	delete: (id: string) => PromiseEither<AbstractError, ICategory>
	create: (data: Partial<ICategory>) => PromiseEither<AbstractError, ICategory>
	update: (
		data: Partial<ICategory>,
		id: string,
	) => PromiseEither<AbstractError, ICategory>
}
