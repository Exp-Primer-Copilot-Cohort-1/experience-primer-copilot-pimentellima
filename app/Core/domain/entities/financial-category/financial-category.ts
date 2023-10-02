/* eslint-disable @typescript-eslint/naming-convention */
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { FinancialCategoryType, IFinancialCategory } from 'App/Types/IFinancialCategory'
import { Generic } from 'App/Types/ITransaction'
import { InvalidParamsError } from '../../errors/invalid-params-error'
import { Entity } from '../abstract/entity.abstract'

import validationsSchema from './validations'

export class FinancialCategoryEntity extends Entity implements IFinancialCategory {

	name: string
	active: boolean
	unity_id: string
	type: FinancialCategoryType

	private constructor() {
		super()
	}

	defineName(name: string): this {
		this.name = name
		return this
	}

	defineActive(active: boolean): this {
		this.active = active
		return this
	}

	defineUnityId(unity_id: string): this {
		this.unity_id = unity_id
		return this
	}

	defineType(type: FinancialCategoryType | Generic): this {
		this.type = typeof type === 'string' ? type : type.value as FinancialCategoryType
		return this
	}

	public static async build(
		params: IFinancialCategory,
	): PromiseEither<AbstractError, FinancialCategoryEntity> {
		try {
			const category = new FinancialCategoryEntity()
				.defineId(params._id?.toString())
				.defineType(params.type)
				.defineName(params.name)
				.defineActive(params.active)
				.defineUnityId(params.unity_id as string)
				.defineCreatedAt(params.created_at)
				.defineUpdatedAt(params.updated_at)

			validationsSchema().parse(category)

			return right(category)
		} catch (err) {
			return left(new InvalidParamsError(err))
		}
	}
}

export default FinancialCategoryEntity
