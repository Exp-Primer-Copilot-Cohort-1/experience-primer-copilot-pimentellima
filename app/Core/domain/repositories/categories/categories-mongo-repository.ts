import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared/either'
import Category from 'App/Models/Category'
import { ICategory } from 'App/Types/ICategory'
import { CategoriesManagerInterface } from '../interface'

export class CategoriesMongooseRepository implements CategoriesManagerInterface {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
	constructor() { }

	async findByID(id: string): PromiseEither<AbstractError, ICategory> {
		const categories = await Category.findById(id).populate('prof', {
			_id: 0,
			label: '$name',
			value: '$_id',
		})

		if (!categories) {
			return left(new AbstractError('Categoria não encontrada', 404))
		}
		return right(categories as unknown as ICategory)
	}
	async findAll(unity_id: string): PromiseEither<AbstractError, ICategory[]> {
		const categories = await Category.find({
			unity_id: unity_id,
			active: true,
		}).populate('prof', {
			_id: 0,
			label: '$name',
			value: '$_id',
		})

		return right(categories as unknown as ICategory[])
	}
	async delete(id: string): PromiseEither<AbstractError, ICategory> {
		const category = await Category.findByIdAndDelete(id).orFail()

		return right(category as unknown as ICategory)
	}
	// o _id precisa ser removido para que o mongoose possa criar o id automaticamente e o
	// prof precisa ser convertido para o formato que o mongoose espera
	// o _id precisa ser extraído para que o mongoose retorne o id no formato que o decorators de logs espera
	public async create({
		_id, // eslint-disable-line @typescript-eslint/no-unused-vars
		...data
	}: Partial<ICategory>): PromiseEither<AbstractError, ICategory> {
		const category = await (
			await Category.create({
				...data,
				prof: data.prof?.value,
			})
		).populate('prof', {
			_id: 0,
			label: '$name',
			value: '$_id',
		})

		return right(category.toObject() as unknown as ICategory)
	}
	public async update(
		data: Partial<ICategory>,
		id: string,
	): PromiseEither<AbstractError, ICategory> {
		const categories = await Category.findByIdAndUpdate(id, data).populate('prof', {
			_id: 0,
			label: '$name',
			value: '$_id',
		})

		if (!categories) {
			return left(new AbstractError('Categoria não encontrada', 404))
		}

		return right(categories.toObject())
	}
}
