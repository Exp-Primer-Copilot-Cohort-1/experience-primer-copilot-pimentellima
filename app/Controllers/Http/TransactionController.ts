import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeCreateTransactionComposer } from 'App/Core/composers'
import { TransactionEntity } from 'App/Core/domain/entities/transaction/TransactionEntity'
import Transaction from 'App/Models/Transactions'
import { ITransaction } from 'Types/ITransaction'

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

	async store(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeCreateTransactionComposer(), ctx, { unity_id })
	}

	async update({ params, request, auth }: HttpContextContract) {
		const userLogged = auth.user
		if (!userLogged) throw Error()
		const data = request.all() as Omit<ITransaction, 'value'> & {
			value: string
		}

		const transactionOrErr = await TransactionEntity.build({
			...data,
			unity_id: userLogged.unity_id.toString(),
			value: parseFloat(data.value?.toString()?.replace(',', '.')),
		})

		const transaction = await Transaction.findOneAndUpdate(
			{ group_by: params.id },
			transactionOrErr.extract(),
			{
				new: true,
			},
		).orFail()

		return transaction
	}

	async show({ params }: HttpContextContract) {
		const transaction = await Transaction.where({
			_id: params.id,
		}).orFail()
		return transaction
	}

	async destroy({ params }: HttpContextContract) {
		const transaction = await Transaction.findByIdAndDelete(params.id).orFail()
		return transaction
	}
}

export default TransactionsController
