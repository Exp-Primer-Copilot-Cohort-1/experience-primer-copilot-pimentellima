import { AbstractError } from "App/Core/errors/error.interface"
import { PromiseEither, right } from "App/Core/shared"
import FinancialCategory from "App/Models/FinancialCategory"
import { IFinancialCategory } from "App/Types/IFinancialCategory"
import { FinancialCategoryManagerContract } from "../interface/financial-category-manager.interface"


export class FinancialCategoryMongooseRepository implements FinancialCategoryManagerContract {
	constructor() { }

	async findAllByUnityId(
		unity_id: string,
	): PromiseEither<AbstractError, IFinancialCategory[]> {
		const data = await FinancialCategory.find({ unity_id })
		return right(data)
	}
}