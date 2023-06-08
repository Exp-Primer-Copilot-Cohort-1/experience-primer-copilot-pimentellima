import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ICategory } from 'Types/ICategory'
import { UnitNotFoundError } from '../../errors/unit-not-found'
import { CategoriesManagerInterface } from '../interface'

export class CategoriesInMemoryRepository implements CategoriesManagerInterface {
	private items: ICategory[] = []
	public findByName: (
		name: string,
		unity_id: string,
	) => PromiseEither<AbstractError, ICategory[]>
	public async createCategory(data: any): PromiseEither<AbstractError, ICategory> {
		throw new Error('Method not implemented.')
	}
	public async updateCategoriesById(
		id: string,
		data,
	): PromiseEither<AbstractError, ICategory> {
		const categories = this.items.find((item) => item._id.toString() === id)
		if (!categories) {
			return left(new UnitNotFoundError())
		}

		return right(categories)
	}
	public async findByUnityId(
		unity_id: string,
	): PromiseEither<AbstractError, ICategory[]> {
		const categories = this.items.find(
			(item) => item.unity_id.toString() === unity_id,
		)

		if (!categories) {
			return left(new UnitNotFoundError())
		}

		return right(categories)
	}
	public async findById(id: string): PromiseEither<AbstractError, ICategory> {
		const categories = this.items.find((item) => item._id.toString() === id)

		if (!categories) {
			return left(new UnitNotFoundError())
		}

		return right(categories)
	}
	public async deleteCategoriesById(
		id: string,
	): PromiseEither<AbstractError, ICategory> {
		const categories = this.items.find((item) => item._id.toString() === id)

		if (!categories) {
			return left(new UnitNotFoundError())
		}

		return right(categories)
	}
}
