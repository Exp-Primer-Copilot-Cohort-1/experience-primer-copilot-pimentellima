import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transactions'

class TransactionsController {
	async index({ auth, params }: HttpContextContract) {
		const userLogged = auth.user

		const transactions = await Transaction.find({
			unity_id: userLogged?.unity_id,
			active: true,
			type: params.type ?? 'income',
		})

		return transactions
	}

	async store({ request, auth }: HttpContextContract) {
		const userLogged = auth.user
		const data = request.all()

		const transaction = await Transaction.create({
			...data,
			unity_id: userLogged?.unity_id,
		})

		return transaction
	}

	async update({ params, request }: HttpContextContract) {
		const data = request.only(['name', 'type', 'sub_categories', 'active'])

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
