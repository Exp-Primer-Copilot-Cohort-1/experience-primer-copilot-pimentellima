import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared/either'
import { ICategory } from 'App/Types/ICategory'
import { ICount } from '../helpers/count'

export interface CategoriesManagerContract {
	getCount: (unity_id: string) => PromiseEither<AbstractError, ICount>
	findById: (id: string) => PromiseEither<AbstractError, ICategory>
	findAll: () => PromiseEither<AbstractError, ICategory[]>
	delete: (id: string) => PromiseEither<AbstractError, ICategory>
	create: (data: Partial<ICategory>) => PromiseEither<AbstractError, ICategory>
	update: (
		data: Partial<ICategory>,
		id: string,
	) => PromiseEither<AbstractError, ICategory>
}
