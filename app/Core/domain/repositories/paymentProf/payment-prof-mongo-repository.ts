import { AbstractError } from 'App/Core/errors/error.interface'
import { PromiseEither, left, right } from 'App/Core/shared'
import PaymentProf from 'App/Models/PaymentProf'
import { IPaymentProf } from 'Types/IPaymentProf'
import { PaymentProfEntity } from '../../entities/payment-prof/paymentProf'
import { MissingParamsError } from '../../errors/missing-params'
import { PaymentProfManagerInterface } from '../interface/payment-prof-manager-interface'

export class PaymentProfMongoRepository implements PaymentProfManagerInterface {
	async createPaymentProf(
		paymentProf: IPaymentProf,
	): PromiseEither<AbstractError, PaymentProfEntity> {
		const newPaymentProfOrErr = await PaymentProfEntity.build(paymentProf)
		if (newPaymentProfOrErr.isLeft()) return left(newPaymentProfOrErr.extract())
		const newPaymentProf = newPaymentProfOrErr.extract()

		const { _id } = await PaymentProf.create(newPaymentProf.params())
		newPaymentProf.defineId(_id.toString())
		return right(newPaymentProf)
	}

	async updatePaymentProfById(
		paymentProf: IPaymentProf,
		id: string,
	): PromiseEither<AbstractError, PaymentProfEntity> {
		const oldPaymentProf = await PaymentProf.findById(id)
		if (!oldPaymentProf) return left(new AbstractError('PaymentProf not found', 404))
		const paymentProfOrErr = await PaymentProfEntity.build({
			...oldPaymentProf.toObject(),
			...paymentProf,
		})
		if (paymentProfOrErr.isLeft())
			return left(new AbstractError('Internal Error', 500))

		const updatedPaymentProf = paymentProfOrErr.extract()

		await PaymentProf.findByIdAndUpdate(id, updatedPaymentProf)
		return right(updatedPaymentProf)
	}

	async deletePaymentProfById(
		id: string,
	): PromiseEither<AbstractError, PaymentProfEntity> {
		if (!id) return left(new MissingParamsError('id'))

		const item = await PaymentProf.findByIdAndDelete(id)
		if (!item) return left(new AbstractError('PaymentProf not found', 404))

		const paymentProfOrErr = await PaymentProfEntity.build(item.toObject())
		if (paymentProfOrErr.isLeft())
			return left(new AbstractError('Internal Error', 500))

		return right(paymentProfOrErr.extract())
	}

	async findPaymentProfById(
		id: string,
	): PromiseEither<AbstractError, PaymentProfEntity> {
		if (!id) return left(new MissingParamsError('id'))

		const item = await PaymentProf.findById(id)
		if (!item) return left(new AbstractError('PaymentProf not found', 404))

		const paymentProfOrErr = await PaymentProfEntity.build(item.toObject())
		if (paymentProfOrErr.isLeft())
			return left(new AbstractError('Internal Error', 500))

		return right(paymentProfOrErr.extract())
	}

	async findAllPaymentProfs(
		unity_id: string,
	): PromiseEither<AbstractError, PaymentProfEntity[]> {
		if (!unity_id) return left(new MissingParamsError('unity id'))

		const data = await PaymentProf.find({ unity_id })
		console.log(data)
		const paymentProfs = await Promise.all(
			data.map(async (item) => {
				const paymentProfOrErr = await PaymentProfEntity.build(item.toObject())
				if (paymentProfOrErr.isLeft()) {
					return {} as PaymentProfEntity
				}
				return paymentProfOrErr.extract()
			}),
		)
		return right(paymentProfs)
	}
}
