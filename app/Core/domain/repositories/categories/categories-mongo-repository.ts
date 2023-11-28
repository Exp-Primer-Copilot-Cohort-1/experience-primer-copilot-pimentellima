import { OptsQuery } from 'App/Core/domain/entities/helpers/opts-query'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Category, { COLLECTIONS_REFS } from 'App/Models/Category'
import { ICategory } from 'App/Types/ICategory'
import { inject, injectable, registry } from 'tsyringe'
import { ICount } from '../helpers/count'
import { PROJECTION_DEFAULT } from '../helpers/projections'
import { CategoriesManagerContract } from './categories-manager.interface'
@injectable()
@registry([{ token: CategoriesMongooseRepository, useClass: CategoriesMongooseRepository }])
export class CategoriesMongooseRepository implements CategoriesManagerContract {

	constructor(
		@inject(OptsQuery) private readonly opts: OptsQuery
	) { } // eslint-disable-line

	async getCount(unity_id: string): PromiseEither<AbstractError, ICount> {
		const count = await Category.countDocuments({ unity_id })
			.where({ active: this.opts.active })
			.exec()

		return right({ count })
	}

	async findById(id: string): PromiseEither<AbstractError, ICategory> {
		const categories = await Category
			.findById(id)
			.populate(COLLECTIONS_REFS.PROF, PROJECTION_DEFAULT)

		if (!categories) {
			return left(new AbstractError('Categoria não encontrada', 404))
		}

		return right(categories as unknown as ICategory)
	}
	async findAll(): PromiseEither<AbstractError, ICategory[]> {
		const categories = await Category
			.find({
				unity_id: this.opts.unity_id,
				active: this.opts.active,
			})
			.populate(COLLECTIONS_REFS.PROF, PROJECTION_DEFAULT)

		return right(categories as unknown as ICategory[])
	}
	async delete(id: string): PromiseEither<AbstractError, ICategory> {
		const category = await Category.findByIdAndDelete(id).orFail()

		return right(category as unknown as ICategory)
	}
	async create({
		_id, // eslint-disable-line @typescript-eslint/no-unused-vars
		...data
	}: Partial<ICategory>): PromiseEither<AbstractError, ICategory> {
		const category = await Category.create(data)

		return right(category.toObject())
	}

	async update(
		data: Partial<ICategory>,
		id: string,
	): PromiseEither<AbstractError, ICategory> {
		const categories = await Category.findByIdAndUpdate(id, data, { new: true }).orFail()

		return right(categories.toObject())
	}
}
