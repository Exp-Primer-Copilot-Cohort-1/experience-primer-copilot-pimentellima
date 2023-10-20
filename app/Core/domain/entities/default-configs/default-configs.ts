/* eslint-disable @typescript-eslint/naming-convention */
import { InvalidParamsError } from 'App/Core/domain/errors/invalid-params-error'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { IDefaultConfig } from 'App/Types/IDefaultConfig'
import { Generic } from 'App/Types/ITransaction'
import { IsString, validateSync } from 'class-validator'
import { Entity } from '../abstract/entity.abstract'

export class DefaultConfigsEntity extends Entity implements IDefaultConfig {

	@IsString() bank: string
	@IsString() cost_center: string
	payment_form: string

	private constructor() {
		super()
	}

	defineBank(bank: Generic | string): this {
		this.bank = typeof bank === 'string' ? bank : bank.value
		return this
	}

	defineCostCenter(cost_center: Generic | string): this {
		this.cost_center = typeof cost_center === 'string' ? cost_center : cost_center.value
		return this
	}

	definePaymentForm(payment_form: Generic | string): this {
		this.payment_form = typeof payment_form === 'string' ? payment_form : payment_form.value
		return this
	}

	public static async build(
		params: IDefaultConfig,
	): PromiseEither<AbstractError, DefaultConfigsEntity> {
		try {

			const defaultConfigs = new DefaultConfigsEntity()
				.defineId(params._id?.toString())
				.defineBank(params.bank)
				.defineCostCenter(params.cost_center)
				.definePaymentForm(params.payment_form)

			const errors = validateSync(defaultConfigs)

			if (errors.length) throw errors

			return right(defaultConfigs)
		} catch (err) {
			return left(new InvalidParamsError(err))
		}
	}
}

export default DefaultConfigsEntity
