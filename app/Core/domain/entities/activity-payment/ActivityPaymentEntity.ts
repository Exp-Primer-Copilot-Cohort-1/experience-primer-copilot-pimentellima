import { ObjectId } from '@ioc:Mongoose'
import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ActivityPayment } from 'App/Types/IActivity'
import { ITransaction } from 'App/Types/ITransaction'
import * as z from 'zod'

const validation = z.object({
	cost_center: z.string(),
	financial_category: z.string(),
	account: z.string(),
	total: z.number(),
	date: z.date(),
	description: z.string().optional(),
	paymentForm: z.string(),
	installment: z.boolean(),
	installments: z.number().optional(),
})
export class ActivityPaymentEntity implements ActivityPayment {
	amount: number
	total: number
	account: ObjectId | string
	cost_center: ObjectId | string
	financial_category: ObjectId | string
	paymentForm: string
	date: Date
	description?: string | undefined
	installment: boolean
	installments?: number

	defineAccount(values: ObjectId | string) {
		this.account = values
		return this
	}

	defineFinancialCategory(values: ObjectId | string) {
		this.financial_category = values
		return this
	}

	defineTotal(total: number) {
		this.total = total
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

	defineCostCenter(value: ObjectId | string) {
		this.cost_center = value
		return this
	}

	public static async build(
		values: ITransaction,
	): PromiseEither<AbstractError, ActivityPaymentEntity> {
		try {
			validation.parse(values)

			return right(
				new ActivityPaymentEntity()
					.defineAccount(values.account as string)
					.defineCostCenter(values.cost_center as string)
					.defineFinancialCategory(values.financial_category as string)
					.defineDate(new Date(values.date))
					.defineTotal(values.amount)
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
