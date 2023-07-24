import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transactions'
import { ITransaction } from 'Types/ITransaction'
import { addMonths } from 'date-fns'
import { Types } from 'mongoose'

class TransactionsController {
	async index({ auth, request }: HttpContextContract) {
		const userLogged = auth.user

		let { date_start, date_end } = request.qs()

		if (!date_start) {
			const now = new Date()
			date_start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
		}

		if (!date_end) {
			const now = new Date()
			date_end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString()
		}

		const transactions = await Transaction.find({
			unity_id: userLogged?.unity_id,
			active: true,
			date: {
				$gte: date_start,
				$lte: date_end,
			},
		})

		return transactions
	}

	async store({ request, auth }: HttpContextContract) {
		const userLogged = auth.user
		const data = request.all() as ITransaction
		const paymentForm = data.paymentForm

		const installment = paymentForm === 'credit_card'
		const installments = installment && data.installments ? data.installments : 1

		let date = new Date(data.date)

		const group_id = data.activity_id || new Types.ObjectId()
		const transactions = [] as ITransaction[]

		const value = Number(data.value?.toString().replace(',', '.') || 0) / installments

		for (let i = 0; i < installments; i++) {
			const transaction = await Transaction.create({
				...data,
				group_id: group_id.toString(),
				installment,
				installments,
				date,
				value,
				installmentCurrent: i + 1,
				unity_id: userLogged?.unity_id,
			})

			date = addMonths(date, 1)
			transactions.push(transaction)
		}

		return transactions[0]
	}

	async update({ params, request }: HttpContextContract) {
		const data = request.all() as ITransaction

		const transaction = await Transaction.findByIdAndUpdate(params.id, data, {
			new: true,
		}).orFail()

		return transaction
	}

	async show({ params }: HttpContextContract) {
		const transaction = await Transaction.where({ _id: params.id }).orFail()
		return transaction
	}

	async destroy({ params }: HttpContextContract) {
		const transaction = await Transaction.findByIdAndDelete(params.id).orFail()
		return transaction
	}
}

export default TransactionsController
