import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither } from 'App/Core/shared'
import { IPaymentProf, ParticipationPrice } from 'Types/IPaymentProf'

export interface PaymentProfManagerInterface {
	createPaymentProf: (
		paymentProf: IPaymentProf,
	) => PromiseEither<AbstractError, IPaymentProf>
	updatePaymentProfById: (
		paymentProf: IPaymentProf,
		id: string,
		prof_id: string,
	) => PromiseEither<AbstractError, IPaymentProf>
	deletePaymentProfById: (id: string) => PromiseEither<AbstractError, IPaymentProf>
	findPaymentProfById: (id: string) => PromiseEither<AbstractError, IPaymentProf[]>
	findAllPaymentProfs: (
		unity_id: string,
	) => PromiseEither<AbstractError, IPaymentProf[]>
	findCurrentPaymentParticipation(
		unity_id: string,
		prof_id: string,
		health_insurance_id: string,
		procedure_id: string,
	): PromiseEither<AbstractError, ParticipationPrice>
}
