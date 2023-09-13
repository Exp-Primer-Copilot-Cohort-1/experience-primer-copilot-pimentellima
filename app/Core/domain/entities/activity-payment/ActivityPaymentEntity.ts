import { ObjectId } from '@ioc:Mongoose'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ActivityPayment } from 'App/Types/IActivity'
import { Schema } from 'mongoose'
import * as z from 'zod'

export class ActivityPaymentEntity implements ActivityPayment {
	bank: { value: string | Schema.Types.ObjectId; label: string }
	cost_center: { value: string | ObjectId; label: string }
	category: { value: string | ObjectId; label: string }
	value: string
	paymentForm: string
	date: Date
	description?: string | undefined
	installment: boolean
	installments?: number

	defineBank(values: { value: string | Schema.Types.ObjectId; label: string }) {
		this.bank = values
		return this
	}

	defineCategory(values: { value: string | Schema.Types.ObjectId; label: string }) {
		this.category = values
		return this
	}

	defineValue(value: string) {
		this.value = value
		return this
	}

	definePaymentForm(value: string) {
		this.paymentForm = value
		return this
	}

	defineDate(value: Date) {
		this.date = value
		return this
	}

	defineDescription(value?: string) {
		this.description = value
		return this
	}

	defineInstallment(value: boolean) {
		this.installment = value
		return this
	}

	defineInstallments(value?: number) {
		this.installments = value
		return this
	}

	defineCostCenter(value: { value: string | Schema.Types.ObjectId; label: string }) {
		this.cost_center = value
		return this
	}

	public static async build(
		values: ActivityPayment,
	): PromiseEither<AbstractError, ActivityPaymentEntity> {
		try {
			z.object({
				cost_center: z.object({
					value: z.string(),
					label: z.string(),
				}),
				category: z.object({
					value: z.string(),
					label: z.string(),
				}),
				bank: z.object({
					value: z.string(),
					label: z.string(),
				}),
				value: z.string(),
				date: z.date(),
				description: z.string().optional(),
				paymentForm: z.string(),
				installment: z.boolean(),
				installments: z.number().optional(),
			}).parse(values)

			return right(
				new ActivityPaymentEntity()
					.defineBank(values.bank)
					.defineCostCenter(values.cost_center)
					.defineCategory(values.category)
					.defineDate(new Date(values.date))
					.defineValue(values.value)
					.definePaymentForm(values.paymentForm)
					.defineInstallment(values.installment)
					.defineInstallments(values.installments)
					.defineDescription(values.description),
			)
		} catch (err) {
			console.log(err)
			return left(new AbstractError('Error validating payment', 500))
		}
	}
}
