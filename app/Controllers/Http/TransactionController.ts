import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { adaptRoute } from 'App/Core/adapters'
import { makeCreateTransactionComposer } from 'App/Core/composers'
import { TransactionEntity } from 'App/Core/domain/entities/transaction/TransactionEntity'
import LogDecorator, { ACTION } from 'App/Decorators/Log'
import Transaction, { COLLECTION_NAME } from 'App/Models/Transactions'
import { ITransaction } from 'App/Types/ITransaction'

/**
 * Controller responsável por gerenciar as transações.
 * @swagger
 * tags:
 *   name: Transações
 *   description: Endpoints para gerenciamento de transações
 */
class TransactionsController {
	/**
	 * Retorna uma lista de transações de acordo com os filtros informados.
	 * @swagger
	 * /transactions:
	 *   get:
	 *     summary: Retorna uma lista de transações de acordo com os filtros informados.
	 *     tags:
	 *       - Transações
	 *     parameters:
	 *       - name: date_start
	 *         in: query
	 *         description: Data de início do período de busca.
	 *         required: false
	 *         schema:
	 *           type: string
	 *           format: date-time
	 *       - name: date_end
	 *         in: query
	 *         description: Data de fim do período de busca.
	 *         required: false
	 *         schema:
	 *           type: string
	 *           format: date-time
	 *     responses:
	 *       200:
	 *         description: Lista de transações.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/Transaction'
	 */
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
		}).populate('prof client financial_category cost_center account', {
			label: '$name',
			value: '$_id',
			_id: 0,
		})

		return transactions
	}

	/**
	 * Cria uma nova transação.
	 * @swagger
	 * /transactions:
	 *   post:
	 *     summary: Cria uma nova transação.
	 *     tags:
	 *       - Transações
	 *     requestBody:
	 *       description: Dados da transação a ser criada.
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Transaction'
	 *     responses:
	 *       200:
	 *         description: Transação criada com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Transaction'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.POST)
	async store(ctx: HttpContextContract) {
		const unity_id = ctx.auth.user?.unity_id
		return adaptRoute(makeCreateTransactionComposer(), ctx, { unity_id })
	}

	/**
	 * Atualiza uma transação existente.
	 * @swagger
	 * /transactions/{id}:
	 *   put:
	 *     summary: Atualiza uma transação existente.
	 *     tags:
	 *       - Transações
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         description: Group ID da transação a ser atualizada.
	 *         required: true
	 *         schema:
	 *           type: string
	 *     requestBody:
	 *       description: Dados da transação a ser atualizada.
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Transaction'
	 *     responses:
	 *       200:
	 *         description: Transação atualizada com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Transaction'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.PUT)
	async update({ params, request, auth }: HttpContextContract) {
		const userLogged = auth.user
		if (!userLogged) throw Error()
		const data = request.all() as ITransaction

		const transactionOrErr = await TransactionEntity.build({
			...data,
			unity_id: userLogged.unity_id.toString(),
			amount: data.amount,
		})

		const transaction = await Transaction.updateMany(
			{ group_by: params.id },
			transactionOrErr.extract(),
			{
				new: true,
			},
		).orFail()

		return transaction
	}

	/**
	 * Retorna uma transação pelo ID.
	 * @swagger
	 * /transactions/{id}:
	 *   get:
	 *     summary: Retorna uma transação pelo ID.
	 *     tags:
	 *       - Transações
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         description: ID da transação a ser retornada.
	 *         required: true
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Transação encontrada.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Transaction'
	 */
	async show({ params }: HttpContextContract) {
		const transaction = await Transaction.where({
			_id: params.id,
		}).orFail()
		return transaction
	}

	/**
	 * Exclui uma transação pelo ID.
	 * @swagger
	 * /transactions/{id}:
	 *   delete:
	 *     summary: Exclui uma transação pelo ID.
	 *     tags:
	 *       - Transações
	 *     parameters:
	 *       - name: id
	 *         in: path
	 *         description: ID da transação a ser excluída.
	 *         required: true
	 *         schema:
	 *           type: string
	 *     responses:
	 *       200:
	 *         description: Transação excluída com sucesso.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Transaction'
	 */
	@LogDecorator(COLLECTION_NAME, ACTION.DELETE)
	async destroy({ params }: HttpContextContract) {
		const transaction = await Transaction.findByIdAndDelete(params.id).orFail()
		return transaction
	}
}

export default TransactionsController
