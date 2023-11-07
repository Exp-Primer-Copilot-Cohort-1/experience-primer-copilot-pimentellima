import { AbstractError } from "App/Core/errors/error.interface"
import { PromiseEither, right } from "App/Core/shared"
import FinancialCategory from "App/Models/FinancialCategory"
import { IFinancialCategory } from "App/Types/IFinancialCategory"
import { UnityNotFoundError } from "../../errors"
import { FinancialCategoryManagerContract } from "../interface/financial-category-manager.interface"


export class FinancialCategoryMongooseRepository implements FinancialCategoryManagerContract {
	constructor() { }
	async create(data: IFinancialCategory): PromiseEither<AbstractError, IFinancialCategory> {
		const financialCategory = await FinancialCategory.create(data)

		return right(financialCategory.toObject())
	}

	async findAll(
		unity_id: string,
	): PromiseEither<AbstractError, IFinancialCategory[]> {
		const data = await FinancialCategory.find({ unity_id }).orFail(new UnityNotFoundError())
		return right(data)
	}
	async findById(id: string): PromiseEither<AbstractError, IFinancialCategory> {
		const financialCategory = await FinancialCategory.findById(id).orFail(new AbstractError('Categoria Financeira não encontrada', 404))

		return right(financialCategory)
	}
	async update(id: string, data: IFinancialCategory): PromiseEither<AbstractError, IFinancialCategory> {
		const category = await FinancialCategory.findByIdAndUpdate(
			id,
			data,
			{ new: true }
		).orFail()

		return right(category)
	}
}