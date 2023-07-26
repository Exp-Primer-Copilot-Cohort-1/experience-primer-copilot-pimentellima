import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TransactionEntity } from "App/Core/domain/entities/transaction/TransactionEntity"
import Transaction from 'App/Models/Transactions'
import divideCurrencyByInteger from "App/utils/divide-currency"
import { ITransaction } from 'Types/ITransaction'
import { addMonths } from 'date-fns'

class TransactionsController {
	async index({ auth, request }: HttpContextContract) {
		const userLogged = auth.user;

		let { date_start, date_end } = request.qs();

		if (!date_start) {
			const now = new Date();
			date_start = new Date(
				now.getFullYear(),
				now.getMonth(),
				1
			).toISOString();
		}

		if (!date_end) {
			const now = new Date();
			date_end = new Date(
				now.getFullYear(),
				now.getMonth() + 1,
				0
			).toISOString();
		}

		const transactions = await Transaction.find({
			unity_id: userLogged?.unity_id,
			active: true,
			date: {
				$gte: date_start,
				$lte: date_end,
			},
		});

		return transactions;
	}

	async store({ request, auth }: HttpContextContract) {
		const userLogged = auth.user;
		const data = request.all() as ITransaction;

		const numberOfIncomes = data.installments ? data.installments : 1;
		let validatedTransactions: ITransaction[] = [];
		for (let i = 0; i < numberOfIncomes; i++) {
			const date = addMonths(new Date(data.date), i);
			const transactionOrErr = await TransactionEntity.build({
				...data,
				unity_id: userLogged?.unity_id.toString(),
				value: divideCurrencyByInteger(data.value, numberOfIncomes),
				installments: numberOfIncomes,
				installmentCurrent: i + 1,
				date,
			});
			if (transactionOrErr.isLeft()) return transactionOrErr.extract();
			else validatedTransactions.push(transactionOrErr.extract());
		}

		const transactions = await Promise.all(
			validatedTransactions.map(async (transaction) =>
				Transaction.create(transaction)
			)
		);
		return transactions[0]
	}

	async update({ params, request }: HttpContextContract) {
		const data = request.all() as ITransaction;

		const transaction = await Transaction.findByIdAndUpdate(
			params.id,
			data,
			{
				new: true,
			}
		).orFail();

		return transaction;
	}

	async show({ params }: HttpContextContract) {
		const transaction = await Transaction.where({
			_id: params.id,
		}).orFail();
		return transaction;
	}

	async destroy({ params }: HttpContextContract) {
		const transaction = await Transaction.findByIdAndDelete(
			params.id
		).orFail();
		return transaction;
	}
}

export default TransactionsController;
