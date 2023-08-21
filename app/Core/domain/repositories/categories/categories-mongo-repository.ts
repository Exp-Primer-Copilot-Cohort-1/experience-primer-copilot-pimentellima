import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Category from 'App/Models/Category'
import { ICategory } from 'Types/ICategory'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { CategoriesManagerInterface } from '../interface'

export class CategoriesMongooseRepository implements CategoriesManagerInterface {
	constructor() { }

	async findById(id: string): PromiseEither<AbstractError, ICategory> {
		const categories = await Category.findById(id)
		if (!categories) {
			return left(new UnitNotFoundError())
		}
		return right(categories)
	}
	async findByUnityId(unity_id: string): PromiseEither<AbstractError, ICategory[]> {
		const categories = await Category.find({ unity_id: unity_id, active: true })
		if (!categories) {
			return left(new UnitNotFoundError())
		}
		return right(categories)
	}
	async deleteCategoriesById(id: string): PromiseEither<AbstractError, ICategory> {
		const category = await Category.findByIdAndDelete(id).orFail()

		return right(category)
	}
	public async createCategory({
		_id,
		...data
	}): PromiseEither<AbstractError, ICategory> {
		const categories = await Category.create(data)
		return right(categories.toObject())
	}
	public async updateCategoriesById(
		data: Partial<ICategory>,
		id: string,
	): PromiseEither<AbstractError, ICategory> {
		const categories = await Category.findByIdAndUpdate(id, data)

		if (!categories) {
			return left(new AbstractError('Categoria não encontrada', 404))
		}

		return right(categories.toObject())
	}
}
