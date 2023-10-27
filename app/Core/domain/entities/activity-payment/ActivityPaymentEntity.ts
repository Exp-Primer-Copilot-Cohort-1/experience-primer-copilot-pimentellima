import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import { PaymentType } from 'App/Helpers'
import { ActivityPayment } from 'App/Types/IActivity'
import { ITransaction } from 'App/Types/ITransaction'
import {
	IsDate,
	IsEnum,
	IsNumber,
	Min,
	validateSync
} from 'class-validator'

export class ActivityPaymentEntity implements ActivityPayment {
	@IsNumber() @Min(0) amount: number
	@IsEnum(PaymentType) paymentForm: string
	@IsDate() date: Date
	@IsNumber() @Min(1) installments: number

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

	defineInstallments(value: number = 1) {
		this.installments = value
		return this
	}


	public static async build(
		values: ITransaction,
	): PromiseEither<AbstractError, ActivityPaymentEntity> {
		try {
			const payments = new ActivityPaymentEntity()
				.defineDate(new Date(values.date))
				.defineAmount(values.amount)
				.definePaymentForm(values.paymentForm)
				.defineInstallments(values.installments)

			const errors = validateSync(payments)

			if (errors.length > 0) throw errors

			return right(payments)
		} catch (err) {
			console.log(err)
			return left(new AbstractError('Error validating payment', 500))
		}
	}
}
