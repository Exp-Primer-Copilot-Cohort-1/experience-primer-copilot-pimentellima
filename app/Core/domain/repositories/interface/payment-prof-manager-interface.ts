import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import { IPaymentProf } from 'Types/IPaymentProf'
import { PaymentProfEntity } from '../../entities/payment-prof/paymentProf'

export interface PaymentProfManagerInterface {
	createPaymentProf: (
		paymentProf: IPaymentProf,
	) => PromiseEither<AbstractError, PaymentProfEntity>
	updatePaymentProfById: (
		paymentProf: IPaymentProf,
		id: string,
		prof_id: string,
	) => PromiseEither<AbstractError, IPaymentProf>
	deletePaymentProfById: (id: string) => PromiseEither<AbstractError, PaymentProfEntity>
	findPaymentProfById: (id: string) => PromiseEither<AbstractError, IPaymentProf[]>
	findAllPaymentProfs: (
		unity_id: string,
	) => PromiseEither<AbstractError, IPaymentProf[]>
}
