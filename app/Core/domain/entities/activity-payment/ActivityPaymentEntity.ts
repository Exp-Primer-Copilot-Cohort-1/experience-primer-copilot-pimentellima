import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { ActivityPayment } from 'App/Types/IActivity'
import { Generic, ITransaction } from 'App/Types/ITransaction'
import * as z from 'zod'

const validation = z.object({
	cost_center: z.string(),
	financial_category: z.string(),
	account: z.string(),
	amount: z.number(),
	date: z.date(),
	description: z.string().optional(),
	paymentForm: z.string(),
	installment: z.boolean(),
	installments: z.number().optional(),
})
export class ActivityPaymentEntity implements ActivityPayment {
	amount: number
	account: string
	cost_center: string
	financial_category: string
	paymentForm: string
	date: Date
	description?: string | undefined
	installment: boolean
	installments?: number

	defineAccount(values: Generic | string) {
		if (typeof values === 'object') {
			this.account = values.value
			return this
		}
		this.account = values
		return this
	}

	defineFinancialCategory(values: Generic | string) {
		if (typeof values === 'object') {
			this.financial_category = values.value
			return this
		}
		this.financial_category = values
		return this
	}

	defineAmount(amount: number) {
		this.amount = amount
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

	defineCostCenter(value: Generic | string) {
		if (typeof value === 'object') {
			this.cost_center = value.value
			return this
		}
		this.cost_center = value
		return this
	}

	public static async build(
		values: ITransaction,
	): PromiseEither<AbstractError, ActivityPaymentEntity> {
		try {
			const payments = new ActivityPaymentEntity()
				.defineAccount(values.account as string)
				.defineCostCenter(values.cost_center as string)
				.defineFinancialCategory(values.financial_category as string)
				.defineDate(new Date(values.date))
				.defineAmount(values.amount)
				.definePaymentForm(values.paymentForm)
				.defineInstallment(values.installment)
				.defineInstallments(values.installments)
				.defineDescription(values.description)
			validation.parse(payments)

			return right(payments)
		} catch (err) {
			console.log(err)
			return left(new AbstractError('Error validating payment', 500))
		}
	}
}
